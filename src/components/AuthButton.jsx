import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import { auth } from "../utils/fb";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";

export default function AuthButton() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const { user, loading } = useAuth();

  // Sync auth session to your global store
  useEffect(() => {}, []);

  // Handle click outside to close the dropdown menu automatically
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return <p>Loading...</p>;

  if (user) {
    return (
      <div className="relative inline-block text-left" ref={menuRef}>
        {/* Profile Image Trigger */}
        <img
          onClick={() => setIsOpen((prev) => !prev)}
          className="h-10 w-10 rounded-full cursor-pointer ring-2 ring-transparent hover:ring-(--border) transition-all object-cover"
          src={user?.photoURL || "/default-avatar.png"}
          alt="User Menu"
        />

        {/* Dropdown Menu Overlay */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-(--surface) border border-(--border) p-1 shadow-lg z-50 flex flex-col gap-0.5 fade-up">
            {/* User Meta Data Profile Header */}
            {user?.displayName && (
              <div className="px-3 py-2 text-xs border-b border-(--border) mb-1">
                <p className="font-semibold text-(--text) truncate m-0">
                  {user.name}
                </p>
                {user.email && (
                  <p className="text-(--text-3) truncate text-[11px] m-0 mt-0.5">
                    {user.email}
                  </p>
                )}
              </div>
            )}

            <Link
              to="/form"
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-3 py-2 text-sm text-(--text-2) hover:text-(--text) hover:bg-(--bg-2) rounded-lg transition-colors no-underline inline-flex items-center gap-2"
            >
              <span>🧾</span> Forms
            </Link>

            <Link
              to="/form/create"
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-3 py-2 text-sm text-(--text-2) hover:text-(--text) hover:bg-(--bg-2) rounded-lg transition-colors no-underline inline-flex items-center gap-2"
            >
              <span>📝</span>Create Forms
            </Link>
            {/* Menu Link 2: Interactive Logout Action */}
            <button
              onClick={async () => {
                setIsOpen(false);
                try {
                  await signOut(auth);
                  toast.success("Logged out successfully");
                } catch (err) {
                  toast.error(err.message);
                }
              }}
              className="w-full text-left px-3 py-2 text-sm text-(--danger) hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2 border-none bg-transparent"
            >
              <span>🚪</span> Logout
            </button>
          </div>
        )}
      </div>
    );
  }

  // Condition 2: Unauthenticated State (Displays Base Login Action Trigger)
  return (
    <Link
      to="/login"
      onClick={() => console.log("Signin")}
      className="btn-primary h-10 my-auto"
    >
      Login
    </Link>
  );
}
