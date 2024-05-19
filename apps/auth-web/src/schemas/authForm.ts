import { z } from "zod";

export const email = z
  .string({ message: "We need an email to continue" })
  .email({ message: "That email doesn't look quite right" });
