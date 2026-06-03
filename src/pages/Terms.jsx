import { useState } from "react";
import { Link } from "react-router-dom"; // Use "next/link" if utilizing Next.js

export default function Terms() {
  const [activeSection, setActiveSection] = useState("introduction");

  const sections = [
    { id: "introduction", label: "1. Introduction" },
    { id: "accounts", label: "2. Account Terms" },
    { id: "usage", label: "3. Acceptable Use" },
    { id: "data", label: "4. Data & Privacy" },
    { id: "intellectual", label: "5. Intellectual Property" },
    { id: "termination", label: "6. Termination" },
    { id: "liability", label: "7. Limitation of Liability" },
    { id: "changes", label: "8. Changes to Terms" },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-(--bg) text-(--text) font-sans antialiased selection:bg-(--accent)/20">
      
      {/* Main Container */}
      <div className="max-w-6xl mx-auto p-4">
        
        {/* Document Header */}
        <div className="border-b border-(--border)/60 pb-8 mb-10 text-center md:text-left fade-up">
          
          <h1 className="font-['DM_Serif_Display',serif] text-3xl md:text-4xl lg:text-5xl text-(--text) m-0 tracking-wide leading-tight">
            Terms and Conditions
          </h1>
          <p className="text-(--text-2) text-sm md:text-base m-0 mt-2 font-medium">
            Last Updated: June 3, 2026 · Effective Date: Immediate
          </p>
        </div>

        {/* Two-Column Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
          
          {/* Left Sticky Sidebar Navigation (Hidden on Mobile) */}
          <aside className="hidden lg:block sticky top-8 bg-(--surface) border border-(--border) rounded-xl p-4 shadow-xs select-none">
            <h3 className="text-xs font-bold text-(--text-3) uppercase tracking-wider px-3 mb-3">
              Table of Contents
            </h3>
            <nav className="flex flex-col gap-0.5">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                    activeSection === s.id
                      ? "bg-(--accent)/10 text-(--accent) font-semibold"
                      : "text-(--text-2) hover:bg-(--bg-2) hover:text-(--text)"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Right Detailed Legal Content Stream */}
          <main className="lg:col-span-3 flex flex-col gap-10 text-pretty">
            
            {/* Section 1 */}
            <section id="introduction" className="scroll-mt-6 fade-up">
              <h2 className="font-['DM_Serif_Display',serif] text-xl md:text-2xl text-(--text) mb-3 tracking-wide">
                1. Introduction
              </h2>
              <p className="text-sm md:text-base text-(--text-2) leading-relaxed m-0">
                Welcome to FormFlow. These Terms and Conditions govern your access to and use of the FormFlow online application platform, software, and services. By registering an account, integrating our code libraries, or manipulating form data dashboards, you agree to comply with and be bound by this complete legal framework.
              </p>
            </section>

            {/* Section 2 */}
            <section id="accounts" className="scroll-mt-6">
              <h2 className="font-['DM_Serif_Display',serif] text-xl md:text-2xl text-(--text) mb-3 tracking-wide">
                2. Account Registration and Management
              </h2>
              <div className="text-sm md:text-base text-(--text-2) leading-relaxed flex flex-col gap-3">
                <p className="m-0">
                  To operate our core application structures, you must authenticate securely via our third-party social entry modules (e.g., Google Sign-In with Firebase Authentication). You explicitly maintain full accountability for all workflow state configurations running under your administrative credentials.
                </p>
                <p className="m-0">
                  You agree to immediately notify the FormFlow technical support team regarding any unauthorized resource drainage or system credentials compromise.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section id="usage" className="scroll-mt-6">
              <h2 className="font-['DM_Serif_Display',serif] text-xl md:text-2xl text-(--text) mb-3 tracking-wide">
                3. Acceptable Use Policy
              </h2>
              <div className="text-sm md:text-base text-(--text-2) leading-relaxed flex flex-col gap-3">
                <p className="m-0">
                  FormFlow empowers engineers to assemble interactive interface elements. However, you are strictly prohibited from engineering endpoints or building sheets designed to target, capture, or harvest highly vulnerable or forbidden personal identification categories, including but not limited to:
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-1.5 font-medium text-(--text) bg-(--bg-2)/50 border border-(--border)/40 rounded-xl p-4">
                  <li>Passwords, raw authentication hashes, or decryption keys.</li>
                  <li>National security identity credentials (such as Aadhaar, MyNumber, or RRN details).</li>
                  <li>Financial routing numbers or raw payment processing cards without PCI-compliant gateways.</li>
                </ul>
                <p className="m-0">
                  Violation of these explicit safety guards will result in instantaneous workspace termination without warning.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="data" className="scroll-mt-6">
              <h2 className="font-['DM_Serif_Display',serif] text-xl md:text-2xl text-(--text) mb-3 tracking-wide">
                4. Data Storage and Content Hosting
              </h2>
              <div className="text-sm md:text-base text-(--text-2) leading-relaxed flex flex-col gap-3">
                <p className="m-0">
                  FormFlow facilitates media assets and file distribution pipelines utilizing third-party infrastructure integrations (including Firestore and Cloudinary CDN layers). While our underlying code bases execute automated validation filters (such as maximum file capacities and document type limits), the final compliance burden for content ingestion remains with the account owner.
                </p>
                <blockquote className="m-0 border-l-4 border-l-(--accent) bg-(--bg-2) px-4 py-3 rounded-r-xl font-medium italic text-sm">
                  FormFlow is not an archiving platform. We strongly recommend configuring automated backups or local ledger transfers for critical production dataset streams.
                </blockquote>
              </div>
            </section>

            {/* Section 5 */}
            <section id="intellectual" className="scroll-mt-6">
              <h2 className="font-['DM_Serif_Display',serif] text-xl md:text-2xl text-(--text) mb-3 tracking-wide">
                5. Intellectual Property Rights
              </h2>
              <p className="text-sm md:text-base text-(--text-2) leading-relaxed m-0">
                All software code engines, style setups, vector graphic branding visual layers, portal animation mechanisms, and dynamic user interfaces are the exclusive proprietary property of FormFlow. You maintain complete, uninhibited intellectual ownership over the structure of your forms, schemas, and individual response submissions.
              </p>
            </section>

            {/* Section 6 */}
            <section id="termination" className="scroll-mt-6">
              <h2 className="font-['DM_Serif_Display',serif] text-xl md:text-2xl text-(--text) mb-3 tracking-wide">
                6. Workspace Suspension & Termination
              </h2>
              <p className="text-sm md:text-base text-(--text-2) leading-relaxed m-0">
                We reserve the unilateral right to suspend or close access to any administrative dashboard workspace if an account triggers persistent server-side load abuse or violates our standard security boundaries. You can easily delete your workspace metadata manually from your dashboard at any time.
              </p>
            </section>

            {/* Section 7 */}
            <section id="liability" className="scroll-mt-6">
              <h2 className="font-['DM_Serif_Display',serif] text-xl md:text-2xl text-(--text) mb-3 tracking-wide">
                7. Limitation of Liability
              </h2>
              <p className="text-sm md:text-base text-(--text-2) leading-relaxed m-0">
                The FormFlow application is delivered to users on an "As-Is" and "As-Available" functional framework. We explicitly disclaim any formal liability for data loss, network dropouts, API timeouts, or database connection latencies caused by underlying cloud architecture vendors.
              </p>
            </section>

            {/* Section 8 */}
            <section id="changes" className="scroll-mt-6">
              <h2 className="font-['DM_Serif_Display',serif] text-xl md:text-2xl text-(--text) mb-3 tracking-wide">
                8. Adjustments and Changes to Terms
              </h2>
              <p className="text-sm md:text-base text-(--text-2) leading-relaxed m-0">
                We routinely iterate on our platform configurations and feature sets. Consequently, we reserve the right to append or modify these terms at any given time. If an adjustment significantly alters your workflow operations, we will post an open banner warning across the main account workspace dashboard view.
              </p>
            </section>

          </main>
        </div>

      </div>
    </div>
  );
}