import { Link, Outlet } from "react-router-dom";
import ThemeButton from "../components/ThemeButton";
import { features, steps } from "../utils/data.js";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster position="top-center" />
      {/* <span className="flex flex-row-reverse py-1 px-2 sticky top-0 z-100">
        <ThemeButton />
      </span> */}
      <Outlet />
    </>
  );
}
