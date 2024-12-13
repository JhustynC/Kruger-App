import { config } from "dotenv";
import { get } from "env-var";

config();

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  PUBLIC_PATH: get("PUBLIC_PATH").default("public").asString(),
  GOOGLE_CLIENT_ID: get("GOOGLE_CLIENT_ID").asString(),
  GOOGLE_CLIENT_SECRET: get("GOOGLE_CLIENT_SECRET").asString(),
};
