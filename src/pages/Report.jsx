import { useState } from "react";
import { Link } from "react-router-dom"; // Use "next/link" if utilizing Next.js

export default function Report() {
  const [formData, setFormData] = useState({
    targetUrl: "",
    violationType: "",
    description: "",
    reporterEmail: "",
    digitalSignature: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const violationCategories = [
    { value: "phishing", label: "Phishing, Credential Harvesting, or Password Collection" },
    { value: "malware", label: "Malware Distribution or Harmful Executables" },
    { value: "harassment", label: "Harassment, Hate Speech, or Defamation" },
    { value: "spam", label: "Unsolicited Bulk Marketing or System Spam" },
    { value: "intellectual", label: "Copyright, Trademark, or Intellectual Property Theft" },
    { value: "other", label: "Other System Abuse Conditions" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.targetUrl || !formData.violationType || !formData.description) {
      alert("Please populate all required system screening metrics.");
      return;
    }

    setSubmitting(true);
    try {
      // Simulate database ingestion pipeline latency
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitted(true);
    } catch (error) {
      alert("System routing failure. Please retry or contact system administrators.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-(--bg) text-(--text) font-sans antialiased selection:bg-(--accent)/20 pb-16">
   
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        
        {/* Document Header Panel */}
        <div className="border-b border-(--border)/60 pb-8 mb-10 text-center md:text-left fade-up">
         
          <h1 className="font-['DM_Serif_Display',serif] text-3xl md:text-4xl lg:text-5xl text-(--text) m-0 tracking-wide leading-tight">
            Trust & Safety Compliance
          </h1>
          <p className="text-(--text-2) text-sm md:text-base m-0 mt-2 font-medium">
            Report terms of service violations, credential harvesting operations, or malicious web scripts.
          </p>
        </div>

        {/* Split Grid Blueprint View */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          
          {/* LEFT SIDEBAR: Rigid Legal Policy Frameworks (Spans 2 columns) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            <div className="bg-(--surface) border border-(--border) rounded-2xl p-6 shadow-xs select-none">
              <h3 className="text-xs font-bold text-(--text) uppercase tracking-wider border-b border-(--border)/40 pb-2 mb-3.5 flex items-center gap-1.5">
                🛡️ Operational Safe Guards
              </h3>
              <p className="text-xs text-(--text-2) leading-relaxed m-0 mb-4">
                FormFlow enforces an ironclad zero-tolerance policy against any form creators utilizing our responsive elements to harvest protected sensitive assets.
              </p>
              
              <div className="bg-(--bg-2) border border-(--border)/40 rounded-xl p-3.5 flex flex-col gap-2.5 text-xs">
                <span className="font-semibold text-(--text) tracking-wide">Strictly Prohibited Collection Categories:</span>
                <ul className="list-disc pl-4 flex flex-col gap-1 text-(--text-2) font-medium">
                  <li>Account Passwords or Session Keys</li>
                  <li>National Identity Strings</li>
                  <li>Raw Unencrypted Bank / Card Data</li>
                </ul>
              </div>
            </div>

            <div className="bg-(--surface) border border-(--border) rounded-2xl p-5 shadow-xs text-xs text-(--text-3) leading-relaxed">
              <span className="font-bold text-(--text-2) block mb-1">Administrative Remediation</span>
              Once a targeted reporting token undergoes database review and checks positive for abuse, the tracking workspace, form layouts, and structural Cloudinary file assets undergo total infrastructure erasure without notice.
            </div>

          </div>

          {/* RIGHT SIDEBAR: Core Report Intake Interface Form (Spans 3 columns) */}
          <div className="lg:col-span-3">
            {submitted ? (
              
              /* SUCCESS CONFIRMATION STATE */
              <div className="bg-(--surface) border border-green-500/20 rounded-2xl p-8 text-center shadow-xs fade-up border-t-4 border-t-green-500 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-green-500/10 text-green-500 text-2xl flex items-center justify-center mb-4 select-none">
                  ✓
                </div>
                <h3 className="font-['DM_Serif_Display',serif] text-xl md:text-2xl text-(--text) mb-2 tracking-wide">
                  Report Filed Successfully
                </h3>
                <p className="text-sm text-(--text-2) leading-relaxed m-0 mb-6 max-w-sm">
                  Our continuous Trust & Safety processing queue has cached your screening parameters. The targeted endpoint will undergo immediate automated inspection.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 text-xs font-semibold bg-(--bg-2) border border-(--border) text-(--text-2) rounded-xl hover:text-(--text) transition-colors cursor-pointer"
                >
                  File Another Ticket
                </button>
              </div>

            ) : (
              
              /* PRIMARY REPORT INTAKE FORM LAYOUT */
              <form onSubmit={handleSubmit} className="bg-(--surface) border border-(--border) rounded-2xl p-6 md:p-8 shadow-xs flex flex-col gap-5">
                
                {/* Field 1: Suspect Link */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-(--text-2) uppercase tracking-wider flex items-center justify-between">
                    <span>Offending Form URL link <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://yourformflow.com/view/offending-form-id"
                    value={formData.targetUrl}
                    onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-(--border) rounded-xl text-sm bg-(--bg-2) text-(--text) placeholder-gray-400 focus:outline-hidden focus:border-(--accent) transition-colors"
                  />
                </div>

                {/* Field 2: Abuse Category */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-(--text-2) uppercase tracking-wider">
                    Violation Classification Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.violationType}
                    onChange={(e) => setFormData({ ...formData, violationType: e.target.value })}
                    className="w-full px-4 py-3 border border-(--border) rounded-xl text-sm bg-(--bg-2) text-(--text) focus:outline-hidden focus:border-(--accent) transition-colors cursor-pointer"
                  >
                    <option value="" disabled>-- Select a system violation condition --</option>
                    {violationCategories.map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                {/* Field 3: Long Description text block */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-(--text-2) uppercase tracking-wider">
                    Evidence & Verification Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Provide specific contextual details regarding the malicious behaviors displayed inside this layout instance..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-(--border) rounded-xl text-sm bg-(--bg-2) text-(--text) placeholder-gray-400 focus:outline-hidden focus:border-(--accent) transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Field 4: Optional Contact Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-(--text-2) uppercase tracking-wider">
                    Your Contact Email <span className="text-zinc-400 text-[10px] normal-case">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.reporterEmail}
                    onChange={(e) => setFormData({ ...formData, reporterEmail: e.target.value })}
                    className="w-full px-4 py-3 border border-(--border) rounded-xl text-sm bg-(--bg-2) text-(--text) placeholder-gray-400 focus:outline-hidden focus:border-(--accent) transition-colors"
                  />
                </div>

                {/* Field 5: Compliance Legal Checkbox */}
                <div className="flex items-start gap-3 mt-1 text-xs text-(--text-2) leading-relaxed">
                  <input
                    type="checkbox"
                    required
                    id="digitalSignature"
                    checked={formData.digitalSignature}
                    onChange={(e) => setFormData({ ...formData, digitalSignature: e.target.checked })}
                    className="w-4 h-4 rounded border-(--border) bg-(--bg-2) text-(--accent) focus:ring-0 mt-0.5 cursor-pointer"
                  />
                  <label htmlFor="digitalSignature" className="cursor-pointer select-none">
                    I verify that the parameter data points packaged in this complaint log are completely accurate and filed in good faith under standard application usage bounds.
                  </label>
                </div>

                {/* Action Submit Row */}
                <div className="border-t border-(--border)/40 pt-4 mt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto bg-red-500 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-red-600 transition-all cursor-pointer disabled:bg-zinc-600 disabled:cursor-wait shadow-xs active:scale-[0.99]"
                  >
                    {submitting ? "Routing Ticket..." : "🚨 File Official Abuse Report"}
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}