export {};
import { formatISO } from "date-fns";
import { google } from "googleapis";
import getOAuth2Client from "./auth";

const NewEvent = {
  summary: "サンプル",
  description: "カレンダー説明",
  start: {
    dateTime: formatISO(new Date("2021-11-05 15:13")),
    timeZone: "Asia/Tokyo",
  },
  end: {
    dateTime: formatISO(new Date("2021-11-05 18:13")),
    timeZone: "Asia/Tokyo",
  },
  colorId: 2, // @see https://lukeboyle.com/blog-posts/2016/04/google-calendar-api---color-id
  reminders: {
    useDefault: false,
    overrides: [
      { method: "email", minutes: 120 },
      { method: "popup", minutes: 30 },
    ],
  },
};

(async () => {
  const auth = await getOAuth2Client();

  const calendar: any = google.calendar({ version: "v3", auth });
  const response = await calendar.events.insert({
    auth,
    calendarId: "primary",
    resource: NewEvent,
  });

  console.log("Event created:", response);
})();
