import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../utils/useAuth";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/fb";

export default function FormLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
}