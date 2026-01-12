import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/pocketbase";
import { GoogleSignIn } from "./google-signin";

export default async function Home() {
  if (await isAuthenticated()) {
    redirect("/dashboard");
  }

  return (
    <div className="flex items-center justify-center bg-white">
      <GoogleSignIn />
    </div>
  );
}
