import cron from "node-cron";
import Event from "./models/eventsModel.js";
import Act from "./models/activityModel.js";
import { transporter } from "./config/mailer.js";
import juice from "juice";
import { DateTime } from "luxon";
import { getNow } from "./timemachine.js";

// Funzione helper per parsing sicuro di event.time
const parseEventTime = (timeStr) => {
  if (!timeStr || typeof timeStr !== "string") return { hours: 0, minutes: 0 };

  const parts = timeStr.split(":").map(Number);
  if (parts.length !== 2 || parts.some(isNaN)) return { hours: 0, minutes: 0 };

  const [hours, minutes] = parts;
  return {
    hours: Math.min(Math.max(hours, 0), 23),
    minutes: Math.min(Math.max(minutes, 0), 59),
  };
};

export const NOTIFICATION_STEPS = {
  oneDay: [
    { ms: 24 * 60 * 60 * 1000, label: "un giorno" },
    { ms: 12 * 60 * 60 * 1000, label: "12 ore" },
    { ms: 6 * 60 * 60 * 1000, label: "6 ore" },
    { ms: 3 * 60 * 60 * 1000, label: "3 ore" },
  ],
  oneHour: [
    { ms: 60 * 60 * 1000, label: "un'ora" },
    { ms: 30 * 60 * 1000, label: "30 minuti" },
    { ms: 15 * 60 * 1000, label: "15 minuti" },
  ],
  "30min": [
    { ms: 30 * 60 * 1000, label: "30 minuti" },
    { ms: 15 * 60 * 1000, label: "15 minuti" },
  ],
  "15min": [
    { ms: 15 * 60 * 1000, label: "15 minuti" },
    { ms: 5 * 60 * 1000, label: "5 minuti" },
  ],
  "5min": [
    { ms: 5 * 60 * 1000, label: "5 minuti" },
  ],
};

export const startScheduler = () => {
  cron.schedule("*/1 * * * *", async () => {
    const now = getNow();
    console.log("[Scheduler] Ora TimeMachine:", now.toISO());

    try {
      // =========================
      // EVENTI
      // =========================
      const events = await Event.find({ reminderSent: false }).populate("user");

      for (const event of events) {
        if (!event.day || !event.user?.email) continue;

        const zone = "Europe/Rome";
        let hours = 0;
        let minutes = 0;

        if (event.time) {
          ({ hours, minutes } = parseEventTime(event.time));
        }

        const eventDateTime = DateTime.fromJSDate(event.day, { zone }).set({
          hour: hours,
          minute: minutes,
          second: 0,
          millisecond: 0,
        });

        const diff = eventDateTime.toMillis() - now.toMillis();
        const steps = NOTIFICATION_STEPS[event.notifications] || [];

        for (const step of steps) {
          if (event.reminderSentSteps?.includes(step.label)) continue;

          if (diff <= step.ms && diff > step.ms - 2 * 60 * 1000) {
            try {
              await transporter.sendMail({
                from: `"SELFIE App" <${process.env.SMTP_USER}>`,
                to: event.user.email,
                subject: `Promemoria evento: ${event.title}`,
                text: `Tra ${step.label} inizia l'evento: ${event.title}`,
                html: juice(`
                  <h3>Tra ${step.label} hai un evento!</h3>
                  <h4>${event.title}</h4>
                  <p>${event.description || ""}</p>
                  <button>Riprogramma</button>
                  <p>~ SELFIE App</p>
                `),
              });

              console.log(`Notifica evento inviata a ${event.user.email} (${step.label})`);

              const updatedSteps = [...(event.reminderSentSteps || []), step.label];
              const allStepsSent = updatedSteps.length >= steps.length;

              await Event.findByIdAndUpdate(event._id, {
                reminderSentSteps: updatedSteps,
                reminderSent: allStepsSent,
              });
            } catch (err) {
              console.error("Errore nell'invio email evento:", err);
            }
          }
        }
      }

      // =========================
      // ATTIVITÀ
      // =========================
      const activities = await Act.find({ reminderSent: false }).populate("user");

      for (const act of activities) {
        if (!act.deadline || !act.user?.email) continue;
        if (act.completed) continue; // attività già completata → skip

        const zone = "Europe/Rome";
        const deadlineDateTime = DateTime.fromJSDate(act.deadline, { zone }).set({
          second: 0,
          millisecond: 0,
        });

        const diff = deadlineDateTime.toMillis() - now.toMillis();
        const steps = NOTIFICATION_STEPS[act.notifications] || [];

        for (const step of steps) {
          if (act.reminderSentSteps?.includes(step.label)) continue;

          if (diff <= step.ms && diff > step.ms - 2 * 60 * 1000) {
            try {
              await transporter.sendMail({
                from: `"SELFIE App" <${process.env.SMTP_USER}>`,
                to: act.user.email,
                subject: `Promemoria attività: ${act.title}`,
                text: `Tra ${step.label} scade l'attività: ${act.title}`,
                html: juice(`
                  <h3>Attenzione! Tra ${step.label} scade un'attività.</h3>
                  <h4>${act.title}</h4>
                  <p>${act.description || ""}</p>
                  <button>Completa ora</button>
                  <p>~ SELFIE App</p>
                `),
              });

              console.log(`Notifica attività inviata a ${act.user.email} (${step.label})`);

              const updatedSteps = [...(act.reminderSentSteps || []), step.label];
              const allStepsSent = updatedSteps.length >= steps.length;

              await Act.findByIdAndUpdate(act._id, {
                reminderSentSteps: updatedSteps,
                reminderSent: allStepsSent,
              });
            } catch (err) {
              console.error("Errore nell'invio email attività:", err);
            }
          }
        }

        // Se la deadline è passata e l’attività non è completata → segna come in ritardo
        if (diff < 0 && !act.completed) {
          console.log(`Attività in ritardo: ${act.title}`);
          await Act.findByIdAndUpdate(act._id, { reminderSent: true });
        }
      }

    } catch (err) {
      console.error("Errore scheduler:", err);
    }
  });
};
