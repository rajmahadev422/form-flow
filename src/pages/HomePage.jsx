import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";

import { features, FIELD, steps } from "../utils/data.js";
import ThemeButton from "../components/ThemeButton";
import AdvDisplay from "../components/AdvDisplay";
import AuthButton from "../components/AuthButton";
import { BarWaveLoader } from "../components/Loader.jsx";

const ShowFeedback = lazy(() => import("../components/ShowFeedback"));
const Feedback = lazy(() => import("../components/Feedback"));
const EyeFace = lazy(() => import("../components/EyeFace"));

export default function HomePage() {
  return (
    <div className="bg-(--bg) grid gap-5">

      {/* Hero Section */}
      <section className="text-center px-5">
        <div className="inline-flex items-center gap-2 bg-(--accent-light) text-(--accent) rounded-full px-4 py-1.2 text-xs font-semibold mb-6 tracking-widest">
          ✦ FORM BUILDER
        </div>
        <h1 className="font-['DM_Serif_Display',serif] text-[clamp(2.5rem,6vw,4rem)] text-(--text)">
          Build forms{" "}
          <em className="text-(--accent) italic not-italic-none">
            beautifully
          </em>
          <br />
          in minutes
        </h1>
        <Suspense fallback={<BarWaveLoader />}>
          <EyeFace />
        </Suspense>

        <p className="text-(--text-2) text-lg leading-relaxed max-w-130 mx-auto mb-10">
          FormFlow lets you create, share, and analyze forms — with a clean
          interface and PDF export built in.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="form/create" className="btn-primary btn-style">
            ✨ Create a Form
          </Link>
          <Link to="/form" className="btn-ghost btn-style">
            📋 My Forms
          </Link>
        </div>
      </section>

      {/* Features Badge Section */}
      <section className="px-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {features.map((f) => (
            <span
              key={f.label}
              className=" bg-(--surface-2) border border-(--border) rounded-lg px-3.5 py-1.5 text-[0.85rem] text-(--text-2) font-medium items-center gap-1.5"
            >
              {f.icon} {f.label}
            </span>
          ))}
        </div>
      </section>

      {/* How it Works & Fields Section */}
      <section className="mx-auto max-w-5xl px-6 py-8">
        <h2 className="font-['DM_Serif_Display',serif] text-[clamp(1.6rem,4vw,2.2rem)] text-center text-(--text) mb-3">
          How it works
        </h2>
        <p className="text-center text-(--text-2) mb-12">
          Three steps from idea to insights
        </p>

        {/* Step Grid */}
        <div className="flex flex-wrap gap-5">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-(--surface) border border-(--border) flex-auto rounded-xl p-7 relative"
            >
              <div className="absolute top-4 right-4 text-xs font-bold text-(--text-3) font-['DM_Serif_Display',serif]">
                0{i + 1}
              </div>
              <div className="text-3xl mb-4">{step.icon}</div>
              <h3 className="text-base font-semibold text-(--text) mb-2.5">
                {step.title}
              </h3>
              <p className="text-(--text-2) text-[0.875rem] leading-relaxed m-0">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Supported Fields Card */}
        <div className="bg-(--surface) border border-(--border) rounded-xl mt-8 p-8">
          <h3 className="font-['DM_Serif_Display',serif] text-xl mb-4 text-(--text)">
            Supported field types
          </h3>
          <div className="flex flex-wrap gap-5">
            {FIELD.map((f) => (
              <div
                key={f.type}
                className="bg-(--bg-2) flex-auto border border-(--border) rounded p-3"
              >
                <div className="font-semibold text-[0.875rem] text-(--text) mb-0.5">
                  {f.type}
                </div>
                <div className="text-[0.78rem] text-(--text-3)">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<BarWaveLoader />}>
        <Feedback />
        <ShowFeedback />
      </Suspense>
    </div>
  );
}
