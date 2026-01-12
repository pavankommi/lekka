import { getCurrentUser } from "@/lib/pocketbase";
import { GoogleSignIn } from "./google-signin";
import { SignOut } from "./dashboard/sign-out";
import { DashboardContent } from "./dashboard/dashboard-content";

export default async function Home() {
  const user = await getCurrentUser();

  if (user) {
    return (
      <div className="flex-1 bg-white">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm text-gray-600">{user.email}</p>
              <h1 className="text-xl font-semibold text-gray-900">Lekka</h1>
            </div>
            <SignOut />
          </div>

          <DashboardContent />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <GoogleSignIn />
    </div>
  );
}
