import * as dotenv from "dotenv";
import { Client } from "@notionhq/client";
import { RequestParameters } from "@notionhq/client/build/src/Client";
dotenv.config();

// Init client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const database_id = process.env.NOTION_DATABASE_ID;

const getVideos = async () => {
  const payload: RequestParameters = {
    path: `databases/${database_id}/query`,
    method: "post",
  };

  const { results } = await notion.request(payload);
  // console.log(results);

  const pages = results.map((page) => {
    console.log(page.properties.FirebaseAdd.checkbox);

    return {
      pageId: page.id,
      isUpload: page.properties.FirebaseAdd.checkbox,
    };
  });
  console.log(pages);

  return pages;
};

getVideos();
