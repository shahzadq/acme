"use client";

import { z } from "zod";

import { AuthForm } from "./AuthForm";

export const SignInForm = () => {
  return (
    <AuthForm
      validator={z.object({
        email: z.string().email(),
      })}
      inputs={{
        email: {
          type: "email",
          placeholder: "Email Address",
          errorCategory: "Email Address",
        },
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    />
  );
};
