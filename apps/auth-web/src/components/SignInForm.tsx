"use client";

import { useState } from "react";
import { z } from "zod";

// import { clientSignIn } from "@workspace/web-auth";

import { email } from "@/schemas/authForm";
import { AuthForm } from "./AuthForm";
import { EmailSent } from "./EmailSent";

export const SignInForm = () => {
  const [submitted, setSubmitted] = useState<{ email: string }>();

  if (typeof submitted !== "undefined")
    return <EmailSent email={submitted.email} />;

  return (
    <AuthForm
      schema={z.object({
        email,
      })}
      inputs={{
        email: {
          type: "email",
          placeholder: "Email Address",
        },
      }}
      onSubmit={(values) => {
        // const result = await clientSignIn("nodemailer", {
        //   email: values.email,
        //   redirect: false,
        // });

        // if (typeof result === "undefined") setError("Something went wrong");
        // else {
        //   if (typeof result.error !== "undefined") setError(result.error);
        //   else if (result.ok) setSubmitted(values);
        // }

        setSubmitted(values);
      }}
    />
  );
};
