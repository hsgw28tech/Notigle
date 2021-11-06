import { formatISO } from "date-fns";
import * as dotenv from "dotenv";
import { Client } from "@notionhq/client";
import { PagesCreateParameters } from "@notionhq/client/build/src/api-endpoints";
dotenv.config();

// Init client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const pageAdd = async () => {
  const startDate = formatISO(new Date("2021-11-07 10:13"));
  const endDate = formatISO(new Date("2021-11-08 12:31"));
  const data: PagesCreateParameters = {
    parent: {
      database_id: process.env.NOTION_DATABASE_ID,
    },
    properties: {
      Tags: {
        type: "multi_select",
        multi_select: [],
      },
      Description: {
        type: "rich_text",
        rich_text: [
          {
            type: "text",
            text: { content: "説明" },
          },
        ],
      },
      Date: {
        type: "date",
        date: { start: startDate, end: endDate },
      },
      Name: {
        type: "title",
        title: [
          {
            type: "text",
            text: { content: "aaa" },
          },
        ],
      },
    },
  };
  try {
    const result = await notion.pages.create(data);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

pageAdd();
