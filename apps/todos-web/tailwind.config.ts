import type { Config } from "tailwindcss";

import baseConfig from "@workspace/tailwind-config/web";

export default {
  content: [...baseConfig.content, "../../configs/web-ui/**/*.{ts,tsx}"],
  presets: [baseConfig],
} satisfies Config;
