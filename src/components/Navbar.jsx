import { Link } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import { useLocation } from "react-router-dom";
import AuthButton from "./AuthButton";

export default function Navbar() {
  const path = useLocation().pathname;

  return (
    <nav className="sticky top-0 z-100 justify-between flex h-15 items-center gap-6 border-b border-(--border) bg-(--surface) px-6 backdrop-blur">
      <Link
        to="/"
        className="mr-2 text-[1.3rem] font-normal no-underline text-(--accent) font-['DM_Serif_Display',serif]"
      >
        FormFlow
      </Link>

      <div className="flex-1 gap-1 hidden sm:flex">
        {[
          { href: "/form/create", label: "Create" },
          { href: "/form", label: "My Forms" },
        ].map(({ href, label }) => {
          const isActive = path === href;
          return (
            <Link
              key={href}
              to={href}
              className={`rounded-md px-3 py-[0.35rem] text-sm font-medium no-underline transition-all duration-150 ${
                isActive
                  ? "bg-(--accent-light) text-(--accent)"
                  : "bg-transparent text-(--text-2)"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
      <div className="flex gap-5">
        <ThemeButton />
        <AuthButton />
      </div>
    </nav>
  );
}
