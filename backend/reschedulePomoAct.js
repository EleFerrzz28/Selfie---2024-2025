import User from './models/userModel.js'
import { getNow } from "./timemachine.js";
import Pomodoro from './models/pomodoroModel.js';
import { DateTime } from 'luxon';
import Act from './models/activityModel.js';

async function reschedule(userId, currentDay){
    // Trova pomodori programmati prima di oggi e non completati
    const incompletePomodoros = await Pomodoro.find({
        user: userId,
        planned: true,
        completedPomo: false,
    });

    const incompleteActs = await Act.find({
        user: userId,
        completedAct: false,
    });

    const currentDayDate = DateTime.fromISO(currentDay).startOf('day');

    // Aggiorna Pomodori
    await Promise.all(incompletePomodoros.map(async (pomo) => {
      const originalDate = DateTime.fromJSDate(pomo.originalDate || pomo.date).startOf('day');
      const diffDays = Math.round(currentDayDate.diff(originalDate, 'days').days);

      pomo.date = diffDays <= 0 ? originalDate.toJSDate() : originalDate.plus({ days: diffDays }).toJSDate();
      await pomo.save();
    }));

    // Aggiorna Attività
    await Promise.all(incompleteActs.map(async (act) => {
      if (!act.originalDeadline || isNaN(new Date(act.originalDeadline))) {
        console.warn(`[Reschedule] Skipping activity ${act._id} because originalDeadline is invalid`);
        return;
      }
      const originalDate = DateTime.fromJSDate(act.originalDeadline).startOf('day');
      const diffDays = Math.round(currentDayDate.diff(originalDate, 'days').days);

      act.deadline = diffDays <= 0 ? originalDate.toJSDate() : originalDate.plus({ days: diffDays }).toJSDate();
      await act.save();
    }));
}

async function runRescheduleForAllUsers(currentDay) {
  try {
    console.log("Viaggio con time machine:", getNow().startOf('day').toISO(), "→ avvio reschedule");
    const users = await User.find();
    for (let user of users) {
      await reschedule(user._id, currentDay);
    }
    console.log("[Reschedule] Operazione completata.");
  } catch (err) {
    console.error("[Reschedule] Errore nel reschedule:", err);
  }
}

export function startReschedule(){
  let lastDay = getNow().startOf("day").toISO();

  const loop = async () => {
    const currentDay = getNow().startOf("day").toISO();
    if (currentDay !== lastDay) {
      lastDay = currentDay;
      await runRescheduleForAllUsers(currentDay);
    }
    setTimeout(loop, 60 * 1000);
  };

  loop();
}
