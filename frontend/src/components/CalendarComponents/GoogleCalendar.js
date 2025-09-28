import {supabase} from '../../features/supabaseClient';
import { DateTime } from "luxon";


// services for GoogleCalendar


// verify token session
  async function ensureValidSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) throw new Error("No session");
  
  if (session.expires_at * 1000 < Date.now()) {
    const { data, error: refreshError } = await supabase.auth.refreshSession();
    if (refreshError) throw new Error("Failed to refresh token");
    return data.session;
  }
  return session;
}


// create an event 
export async function createGoogleEvent(event) {
  const session = await ensureValidSession(); 
  if (!session || !session.provider_token) return null;

  const startDate = DateTime.fromISO(
    event.day + (event.time ? `T${event.time}` : "T00:00:00")
  ).toISO();

  const googleEvent = {
    summary: event.title,
    description: event.description,
    start: { 
      dateTime: startDate, 
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone 
    },
    end: { 
      dateTime: startDate, 
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone 
    },
  };

  try {
    const res = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + session.provider_token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(googleEvent),
      }
    );
    const data = await res.json();
    return data.id || null; 
  } catch (err) {
    console.error("Google Calendar create error:", err);
    return null;
  }
}