import { useEffect, useState, useRef } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../utils/fb.js";
import { Link, Navigate } from "react-router-dom"; // Assumed matching your routing architecture
import { useAuth } from "../utils/useAuth.js";

const googleProvider = new GoogleAuthProvider();

const GoogleLogin = () => {
  const { user, set, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const loggedInUser = {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };

      set(loggedInUser);
      console.log(loggedInUser);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      set(null);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Automatically dismiss user dropdown modal if outer document areas are pressed
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (user) return <Navigate to="/" replace />;
  return (
    <div>
      <button
        onClick={handleLogin}
        className="inline-flex items-center gap-2.5 bg-(--surface) text-(--text) border border-(--border) px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer shadow-xs hover:bg-(--bg-2) transition-all active:scale-[0.98]"
      >
        {/* Flat Styled Inline Google Vector Icon Asset */}
        <svg
          className="w-4 h-4 shrink-0"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="#EA4335"
            d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.273 0 3.19 2.69 1.155 6.645l4.11 3.12z"
          />
          <path
            fill="#4285F4"
            d="M23.49 12.275c0-.818-.073-1.609-.21-2.373H12v4.582h6.455c-.277 1.482-1.114 2.736-2.37 3.582l3.682 2.855c2.154-1.99 3.395-4.918 3.395-8.645z"
          />
          <path
            fill="#FBBC05"
            d="M5.266 14.235L1.155 17.355A11.947 11.947 0 0 0 12 24c3.055 0 5.79-.99 7.764-2.682l-3.682-2.855C15.08 19.145 13.636 19.455 12 19.455c-3.136 0-5.836-1.89-6.734-4.545z"
          />
          <path
            fill="#34A853"
            d="M1.155 6.645C.42 8.236 0 10.036 0 12s.42 3.764 1.155 5.355l4.111-3.12c-.227-.673-.355-1.39-.355-2.235 0-.845.128-1.564.355-2.236L1.155 6.645z"
          />
        </svg>
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
