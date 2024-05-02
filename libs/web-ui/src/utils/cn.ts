import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export const cn = (...classnames: Parameters<typeof cx>) =>
  twMerge(cx(classnames));
