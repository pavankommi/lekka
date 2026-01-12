import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/pocketbase";
import { GoogleSignIn } from "./google-signin";

export default async function Home() {
  if (await isAuthenticated()) {
    redirect("/dashboard");
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <GoogleSignIn />
    </div>
  );
}
