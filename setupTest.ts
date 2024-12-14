import { config } from "dotenv";

delete process.env.VARIABLE_TEST;
delete process.env.PORT;
delete process.env.MAILER_SERVICE;
delete process.env.MAILER_EMAIL;
delete process.env.MAILER_SECRET_KEY;
delete process.env.PROD;
delete process.env.MONGO_URL;
delete process.env.MONGO_DB_NAME;
delete process.env.MONGO_USER;
delete process.env.MONGO_PASS;
delete process.env.POSTGRES_URL;
delete process.env.POSTGRES_DB;
delete process.env.POSTGRES_USER;
delete process.env.POSTGRES_PASSWORD;

config({ path: "./.env.test" });

// console.log("Config test envs");
