export {};
const fs = require("fs").promises;
const { google } = require("googleapis");
import * as dotenv from "dotenv";
dotenv.config();

const getOAuth2Client = async () => {
  const tokenText = await fs.readFile("lib/token.json", "utf-8");
  const token = JSON.parse(tokenText);

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_ID
  );

  oAuth2Client.setCredentials(token);
  return oAuth2Client;
};
export default getOAuth2Client;
