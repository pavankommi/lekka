import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/pocketbase";
import { SignOut } from "./sign-out";
import { DashboardContent } from "./dashboard-content";

export default async function Dashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Lekka</h1>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          <SignOut />
        </div>

        <DashboardContent />
      </div>
    </div>
  );
}
