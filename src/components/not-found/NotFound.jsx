import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-(--bg) justify-center">
      <h1 className="text-7xl font-bold">404</h1>

      <p className="mt-4 text-(--text-2)">
        Page not found
      </p>

      <Link
        to="/"
        className="mt-6 px-4 py-2 rounded-lg bg-blue-600 text-white"
      >
        Go Home
      </Link>
    </div>
  );
}