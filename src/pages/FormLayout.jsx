import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../utils/useAuth";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/fb";

export default function FormLayout() {
  const { set, loading, user } = useAuth();
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ user: user.providerData[0] });
      } else {
        console.log("Not Logged In");
      }
      set({ loading: false });
    });
  }, []);

  if (!user || loading) return <p>Loading...</p>;
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  )
}