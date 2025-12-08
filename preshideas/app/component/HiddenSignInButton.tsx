"use client";

export default function HiddenSignInButton({
  isAuthenticated,
  setView,
}: {
  isAuthenticated: boolean;
  setView: (view: string) => void;
}) {
  if (isAuthenticated) return null;

  return (
    <button
      onClick={() => setView("login")}
      className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-lg 
             shadow-lg text-sm font-medium hover:bg-gray-800 transition-all"
    >
      PI
    </button>
  );
}
