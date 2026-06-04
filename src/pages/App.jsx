import { Link, Outlet } from "react-router-dom";
import ThemeButton from "../components/ThemeButton";
import { features, steps } from "../utils/data.js";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/fb.js";
import { useAuth } from "../utils/useAuth.js";
import AdvDisplay from "../components/AdvDisplay";
import { AuraLoader } from "../components/Loader.jsx";
import Navbar from "../components/Navbar.jsx";

export default function App() {
  const { set, loading, user } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        set({
          user: firebaseUser.providerData[0],
          loading: false,
        });
      } else {
        set({
          user: null,
          loading: false,
        });
      }
    });

    return unsubscribe;
  }, [set]);

  if (loading) return <AuraLoader />;
  return (
    <>
      <Toaster position="top-center" />
      <main className="block no-scroll bg-(--bg-2)">
        <Navbar />

        <Outlet />
      </main>
      <AdvDisplay />
      {/* Global Footer Copyright Segment */}
        <div className="border-t border-(--border)/40 text-center text-xs p-5 text-(--text-3) select-none">
          <p className="m-0">© {new Date().toLocaleString()} FormFlow Inc. All rights reserved. Data transparency protocols are audited routinely against strict systemic compliance parameters.</p>
        </div>
    </>
  );
}
