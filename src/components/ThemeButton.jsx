import { useEffect, useState } from "react";

const ThemeButton = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn-ghost h-10 my-auto"
    >
      {theme === "light" ? "🌙 " : "☀️ "} <span className="capitalize hidden sm:block">{theme}</span>
    </button>
  );
};

export default ThemeButton;
