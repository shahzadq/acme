import { execSync } from "node:child_process";
import type { PlopTypes } from "@turbo/gen";

const prefix = "@workspace/";

const installAndFormat = (dir: string) => async (answers: object) => {
  if ("name" in answers && typeof answers.name === "string") {
    execSync("npx pnpm i", { stdio: "inherit" });
    execSync(
      `npx pnpm prettier --write ${dir}/${answers.name}/** --list-different`,
    );

    return "Package scaffolded";
  }
  return "Package not scaffolded";
};

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("generateNextApp", {
    description: "Generate a new Next JS app",
    prompts: [
      { type: "input", name: "name", message: "What is the apps name?" },
    ],
    actions: [
      {
        type: "addMany",
        destination: "apps/{{name}}",
        templateFiles: "templates/app/next",
        base: "templates/app/next",
        stripExtensions: ["hbs"],
      },
      installAndFormat("apps"),
    ],
  });

  plop.setGenerator("generateLib", {
    description: "Generate a new lib",
    prompts: [
      {
        type: "input",
        name: "name",
        message: `What is the name of the package? (You can skip the '${prefix}' prefix)`,
      },
    ],
    actions: [
      (answers) => {
        if ("name" in answers && typeof answers.name === "string") {
          if (answers.name.startsWith(prefix)) {
            answers.name = answers.name.replace(prefix, "");
          }
        }
        return "Config sanitized";
      },
      {
        type: "addMany",
        destination: "libs/{{name}}",
        templateFiles: "templates/lib",
        base: "templates/lib",
        stripExtensions: ["hbs"],
      },
      installAndFormat("libs"),
    ],
  });
}
