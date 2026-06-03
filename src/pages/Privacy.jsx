import { useState } from "react";
import { Link } from "react-router-dom"; // Use "next/link" if utilizing Next.js

export default function Privacy() {
  const [activeSection, setActiveSection] = useState("collection");

  const sections = [
    { id: "collection", label: "1. Information We Collect" },
    { id: "usage", label: "2. How We Use Data" },
    { id: "sharing", label: "3. Sharing & Disclosures" },
    { id: "security", label: "4. Data Security" },
    { id: "retention", label: "5. Data Retention" },
    { id: "rights", label: "6. Your Privacy Rights" },
    { id: "compliance", label: "7. Regulatory Compliance" },
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
            Privacy Policy
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
              Privacy Navigation
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

          {/* Right Detailed Privacy Content Stream */}
          <main className="lg:col-span-3 flex flex-col gap-10 text-pretty">
            
            {/* Section 1 */}
            <section id="collection" className="scroll-mt-6 fade-up">
              <h2 className="font-['DM_Serif_Display',serif] text-xl md:text-2xl text-(--text) mb-3 tracking-wide">
                1. Information We Collect
              </h2>
              <div className="text-sm md:text-base text-(--text-2) leading-relaxed flex flex-col gap-3">
                <p className="m-0">
                  FormFlow operates as both a Data Controller (for our account owners) and a Data Processor (for the respondents filling out forms built on our platform). We collect information through the following vectors:
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-1.5 font-medium text-(--text) bg-(--bg-2)/50 border border-(--border)/40 rounded-xl p-4">
                  <li><strong>Account Metadata:</strong> Name, email address, profile image URLs, and unique user identifiers (UIDs) captured during authentication.</li>
                  <li><strong>Form Submissions Data:</strong> Any textual data, file attachments, and selections submitted by end-users into active forms.</li>
                  <li><strong>Technical Usage Log:</strong> IP addresses, browser configurations, device types, and system performance telemetry.</li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section id="usage" className="scroll-mt-6">
              <h2 className="font-['DM_Serif_Display',serif] text-xl md:text-2xl text-(--text) mb-3 tracking-wide">
                2. How We Use Your Data
              </h2>
              <p className="text-sm md:text-base text-(--text-2) leading-relaxed m-0">
                We utilize collected information to maintain responsive workspace performance, secure authentication loops, manage file handling uploads (proxied securely via third-party services like Cloudinary), compile analytical charts, and troubleshoot systemic performance dropouts. We do not engage in data-profiling or use form contents to train large language models without explicit, uncoerced administrative opt-ins.
              </p>
            </section>

            {/* Section 3 */}
            <section id="sharing" className="scroll-mt-6">
              <h2 className="font-['DM_Serif_Display',serif] text-xl md:text-2xl text-(--text) mb-3 tracking-wide">
                3. Data Sharing and Disclosures
              </h2>
              <p className="text-sm md:text-base text-(--text-2) leading-relaxed m-0">
                FormFlow shares backend data structures exclusively with trusted sub-processors required to run our software core infrastructure, including Firebase (for hosting and auth states) and cloud asset delivery nodes. We do not sell, rent, or lease form submission databases to advertising networks or third-party brokers.
              </p>
            </section>

            {/* Section 4 */}
            <section id="security" className="scroll-mt-6">
              <h2 className="font-['DM_Serif_Display',serif] text-xl md:text-2xl text-(--text) mb-3 tracking-wide">
                4. Data Security Standards
              </h2>
              <div className="text-sm md:text-base text-(--text-2) leading-relaxed flex flex-col gap-3">
                <p className="m-0">
                  We enforce severe architectural security mitigations to protect data from unauthorized breaches. All network transactions utilize modern TLS transport layer encryption protocols. Data components at rest remain encrypted behind strict access controls.
                </p>
                <blockquote className="m-0 border-l-4 border-l-(--accent) bg-(--bg-2) px-4 py-3 rounded-r-xl font-medium italic text-sm">
                  Security Warning: Form creators are legally prohibited from modifying form schemas to harvest raw passwords or vulnerable national identities. If a form asks for highly sensitive authentication details, please report it to our trust and safety compliance desk immediately.
                </blockquote>
              </div>
            </section>

            {/* Section 5 */}
            <section id="retention" className="scroll-mt-6">
              <h2 className="font-['DM_Serif_Display',serif] text-xl md:text-2xl text-(--text) mb-3 tracking-wide">
                5. Data Retention
              </h2>
              <p className="text-sm md:text-base text-(--text-2) leading-relaxed m-0">
                We store account histories and incoming review logs as long as the parent workspace remains active. Account owners retain the absolute power to purge individual data cells, wipe complete form submission rows, or execute total account deletions cleanly directly from their workspace management panel at any time.
              </p>
            </section>

            {/* Section 6 */}
            <section id="rights" className="scroll-mt-6">
              <h2 className="font-['DM_Serif_Display',serif] text-xl md:text-2xl text-(--text) mb-3 tracking-wide">
                6. Your Privacy Rights
              </h2>
              <p className="text-sm md:text-base text-(--text-2) leading-relaxed m-0">
                Depending on your geographic jurisdiction, you hold concrete statutory privacy protections. These include the right to request a complete portable copy of your data, the right to demand the immediate correction of inaccurate profile assets, and the right to object to automated system processing behaviors. Please route formal data-subject requests through our support workspace.
              </p>
            </section>

            {/* Section 7 */}
            <section id="compliance" className="scroll-mt-6">
              <h2 className="font-['DM_Serif_Display',serif] text-xl md:text-2xl text-(--text) mb-3 tracking-wide">
                7. International Compliance & Transfers
              </h2>
              <p className="text-sm md:text-base text-(--text-2) leading-relaxed m-0">
                FormFlow orchestrates database nodes globally. By continuing to pass information through our endpoints, you acknowledge that transmission pathways cross international borders securely in full accordance with standardized global data transfer mechanisms.
              </p>
            </section>

          </main>
        </div>

      </div>
    </div>
  );
}