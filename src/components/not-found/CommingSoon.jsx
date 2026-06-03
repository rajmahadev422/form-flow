import { Link, useLocation } from "react-router-dom";

export default function CommingSoon() {

  const path = useLocation().pathname.split('/')[1];

  return (
    <div className="py-10 bg-(--bg) flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold">Comming Soon...</h1>

      <p className="mt-4 text-(--text-2) text-4xl">
        <span className="uppercase">{path}</span> PAGE
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