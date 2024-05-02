import type { Config } from "tailwindcss";

import baseConfig from "@workspace/tailwind-config/web";

export default {
  content: ["./src/**/*.{tsx,ts}"],
  presets: [baseConfig],
} satisfies Config;
