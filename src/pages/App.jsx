import { Link, Outlet } from "react-router-dom";
import ThemeButton from "../components/ThemeButton";
import { features, steps } from "../utils/data.js";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/fb.js";
import { useAuth } from "../utils/useAuth.js";

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

  if(loading) return <p>Loading...</p>
  return (
    <>
      <Toaster position="top-center" />
      <Outlet />
    </>
  );
}
