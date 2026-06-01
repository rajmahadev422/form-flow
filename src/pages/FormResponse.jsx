"use client";
import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import ShareButton from "../components/ShareButton";
import { handleShare } from "../utils/data";
import { useResponse, useSubmitForm } from "../utils/useForm";
import { useAuth } from "../utils/useAuth";

export default function FormResponse() {
  const { id } = useParams();
  const printRef = useRef(null);

  const { getResponseData, responseData, loading } = useResponse();
  const { getFormById, form } = useSubmitForm();
  const { user } = useAuth();

  useEffect(() => {
    if (id && user?.uid) {
      getResponseData(id, user.uid);
      getFormById(id);
    }
  }, [id, user, getResponseData, getFormById]);

  // Excel Export Handler
  const handleExportExcel = async () => {
    if (!form || !responseData || responseData.length === 0) return;

    // Lazy load SheetJS engine only upon user interaction
    const { utils, writeFile } = await import("xlsx");

    // Flatten submission objects into a structural spreadsheet row mapping
    const formattedData = responseData.map((sub, index) => {
      // Safe extraction helper for structural Firebase/Firestore timestamps
      let formattedDate = "—";
      if (sub.createdAt) {
        const dateObj =
          typeof sub.createdAt.toDate === "function"
            ? sub.createdAt.toDate()
            : new Date(sub.createdAt);
        formattedDate = dateObj.toLocaleString();
      }

      const row = {
        "Response ID": `#${index + 1}`,
        "Submission Date": formattedDate,
      };

      // Correlate dynamic responses with form labels as column headers
      form.fields.forEach((field) => {
        const val = sub.data?.[field.id];
        row[field.label] = Array.isArray(val) ? val.join(", ") : val || "—";
      });

      return row;
    });

    // Compile virtual sheets & workbooks
    const worksheet = utils.json_to_sheet(formattedData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Submissions");

    // Clear dynamic special characters to construct a safe filename
    const safeFileName = `${form.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_responses.xlsx`;

    // Trigger user browser download stream
    writeFile(workbook, safeFileName);
  };

  if (loading || (!form && !responseData))
    return <div className="text-center py-24 text-(--text-3)">Loading…</div>;

  if (!form)
    return (
      <div className="text-center py-24">
        <p className="text-(--danger)">Form not found.</p>
        <Link to="/form" className="btn-ghost">
          ← Back
        </Link>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 pb-16">
      {/* Interactive Desktop Header */}
      <div className="no-print flex justify-between items-start mb-8 flex-wrap gap-4">
        <div>
          <Link
            to="/form"
            className="text-(--text-3) text-xs no-underline inline-flex items-center gap-1 mb-2"
          >
            ← My Forms
          </Link>
          <h1 className="font-['DM_Serif_Display',serif] text-3xl mb-1">
            {form.title}
          </h1>
          <p className="text-(--text-2) text-sm m-0">
            {responseData?.length} response
            {responseData?.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <ShareButton formId={id} title={form.title} desc={form.description} />
          {responseData?.length > 0 && (
            <button
              onClick={handleExportExcel}
              className="btn-ghost border border-(--border) cursor-pointer"
            >
              📊 Download Excel
            </button>
          )}
        </div>
      </div>

      {/* Submissions Container */}
      <div ref={printRef}>
        {responseData?.length === 0 ? (
          <div className="bg-(--surface) border border-(--border) rounded-xl py-16 px-8 text-center no-print">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-(--text-2) mb-6">No responses yet.</p>
            <button
              onClick={() => handleShare(form.id, form.title, form.description)}
              className="btn-primary"
            >
              Share form to collect responses
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {responseData?.map((sub, i) => (
              <div
                key={sub.id}
                className="bg-(--surface) border border-(--border) rounded-xl p-6 fade-up"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                {/* Entry Metadata Row */}
                <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                  <span className="bg-(--accent-light) text-(--accent) text-[0.78rem] font-bold px-3 py-1 rounded-md tracking-wide">
                    Response #{i + 1}
                  </span>
                  <span className="text-(--text-3) text-[0.78rem]">
                    {sub.createdAt?.toDate
                      ? new Date(sub.createdAt.toDate()).toLocaleString()
                      : "—"}
                  </span>
                </div>

                {/* Data Fields Grid */}
                <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3">
                  {form.fields.map((field) => {
                    const val = sub.data?.[field.id];
                    const display = Array.isArray(val)
                      ? val.join(", ")
                      : val || "—";
                    return (
                      <div
                        key={field.id}
                        className="bg-(--bg-2) border border-(--border) rounded-lg p-3"
                      >
                        <div className="text-[0.72rem] font-semibold text-(--text-3) uppercase tracking-wider mb-1">
                          {field.label}
                        </div>
                        <div
                          className={`text-sm wrap-break ${display === "—" ? "text-(--text-3)" : "text-(--text)"}`}
                        >
                          {display}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Native Media Layout Stylesheet overrides */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-header { display: block !important; margin-bottom: 1.5rem; }
          body { background: white !important; color: black !important; font-size: 12px; }
          .card { border: 1px solid #ddd !important; page-break-inside: avoid; margin-bottom: 12px; }
          .fade-up { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
}
