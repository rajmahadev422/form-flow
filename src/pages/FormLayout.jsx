import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../utils/useAuth";
import { Suspense, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/fb";

import { BarWaveLoader } from "../components/Loader";

export default function FormLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main>
      <Navbar />
      <Suspense fallback={<BarWaveLoader />}>
        <Outlet />
      </Suspense>
    </main>
  );
}
