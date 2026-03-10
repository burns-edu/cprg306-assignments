"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function LoginPage() {
  // User State Variable
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  // Handlers
  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("GitHub sign-in failed: ", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Sign-out failed: ", error);
    }
  };

  return (
    <main className="p-5 bg-slate-50 min-h-screen">
      {user ? (
        // User Signed In
        <div className="flex flex-col items-center gap-4 py-10">
          <p className="text-center text-xl font-bold py-3">
            Welcome, {user.displayName} ({user.email})
          </p>
          <Link
            href="/week-8/shopping-list"
            className="p-2 bg-green-600 text-white rounded text-center w-40"
          >
            Shopping List
          </Link>
          <button
            onClick={handleSignOut}
            className="p-2 bg-red-600 text-white rounded w-40"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-10">
          <p className="text-center text-xl font-bold py-3">
            Welcome, please sign in:
          </p>
          <button
            onClick={handleSignIn}
            className="p-2 bg-green-600 text-white rounded w-40"
          >
            Sign In
          </button>
        </div>
      )}
    </main>
  );
}
