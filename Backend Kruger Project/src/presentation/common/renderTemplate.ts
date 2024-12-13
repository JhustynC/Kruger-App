import { readFileSync } from "fs";
import { resolve } from "path";

export const renderTemplate = (
  templatePath: string,
  variables: Record<string, string>
): string => {
  let template = readFileSync(resolve(__dirname, templatePath), "utf8");
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    template = template.replace(regex, value);
  }
  return template;
};
