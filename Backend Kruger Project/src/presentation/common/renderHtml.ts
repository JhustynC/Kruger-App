import { readFileSync } from "fs";
import { resolve } from "path";

export const htmlComponent = (htmlPath: string): string => {
  const component = readFileSync(resolve(__dirname, htmlPath), "utf8");
  return component;
};
