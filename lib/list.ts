export {};
import { formatISO } from "date-fns";
import { google } from "googleapis";
import getOAuth2Client from "./auth";

(async () => {
  const auth = await getOAuth2Client();

  const calendar: any = google.calendar({ version: "v3", auth });
  var now = new Date();

  await calendar.events.list(
    {
      calendarId: "ruruo.kei.work@gmail.com",
      // 取得範囲
      timeMin: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 1
      ).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (err, res) => {
      // エラーが起きた場合
      if (err) return console.log("The API returned an error: " + err);
      const events = res.data.items;
      if (events.length) {
        console.log("Upcoming 10 events:");
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log("No upcoming events found.");
      }
    }
  );
})();
