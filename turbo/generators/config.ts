import { execSync } from "node:child_process";
import type { PlopTypes } from "@turbo/gen";

const prefix = "@workspace/";
const dir = "libs";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("init", {
    description: "Generate a new lib for the Acme Monorepo",
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
        type: "add",
        path: `${dir}/{{name}}/package.json`,
        templateFile: "templates/package.json.hbs",
      },
      {
        type: "add",
        path: `${dir}/{{name}}/tsconfig.json`,
        templateFile: "templates/tsconfig.json.hbs",
      },
      {
        type: "add",
        path: `${dir}/{{name}}/src/index.ts`,
        template: "export const name = '{{ name }}';",
      },
      async (answers) => {
        if ("name" in answers && typeof answers.name === "string") {
          execSync("npx pnpm i", { stdio: "inherit" });
          execSync(
            `npx pnpm prettier --write ${dir}/${answers.name}/** --list-different`,
          );

          return "Package scaffolded";
        }

        return "Package not scaffolded";
      },
    ],
  });
}
