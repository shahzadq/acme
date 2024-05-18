import { redirect } from "next/navigation";

export default function HomePage() {
  // if we reach home page auto redirect to sign in
  redirect("/signin");

  return <></>;
}
