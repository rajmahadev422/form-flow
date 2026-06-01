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

    const formattedData = responseData.map((sub, index) => {
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

      form.fields.forEach((field) => {
        let val = sub.data?.[field.id];
        if (typeof val === "object") val = val.url;

        row[field.label] = Array.isArray(val) ? val.join(", ") : val || "—";
      });

      return row;
    });

    const worksheet = utils.json_to_sheet(formattedData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Submissions");

    const safeFileName = `${form.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_responses.xlsx`;

    // Trigger user browser download stream
    writeFile(workbook, safeFileName);
  };

  if (loading || (!form && !responseData))
    return <div className="text-center py-24 text-(--text-3)">Loading…</div>;

  console.log(responseData);

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
    <div className="max-w-5xl mx-auto px-6 py-4">
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
          <div className="w-full bg-(--surface) border border-(--border) rounded shadow-xs overflow-hidden no-print">
            {/* Scrollable Container to prevent mobile layout breaking */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                {/* SPREADSHEET HEADERS */}
                <thead className="bg-(--bg-2) border-b border-(--border) text-xs font-semibold text-(--text-3) uppercase tracking-wider sticky top-0 select-none">
                  <tr>
                    <th className="px-4 py-3.5 border-r border-(--border) w-16 text-center">
                      #
                    </th>
                    <th className="px-4 py-3.5 border-r border-(--border) min-w-40">
                      Submission Date
                    </th>
                    {form.fields.map((field) => (
                      <th
                        key={field.id}
                        className="px-4 py-3.5 border-r border-(--border) min-w-35"
                      >
                        {field.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* SPREADSHEET ROWS */}
                <tbody className="divide-y divide-(--border)">
                  {responseData?.map((sub, i) => {
                    // Process the Firestore timestamp safely
                    const submissionDate = sub.createdAt?.toDate
                      ? new Date(sub.createdAt.toDate()).toLocaleString()
                      : "—";

                    return (
                      <tr
                        key={sub.id}
                        className="hover:bg-(--bg-2)/40 transition-colors group odd:bg-transparent even:bg-(--bg-2)/10"
                      >
                        {/* Index Column */}
                        <td className="px-4 py-3 border-r border-(--border) text-center font-medium text-(--text-3) bg-(--bg-2)/20 group-hover:bg-(--bg-2)/60 transition-colors">
                          {i + 1}
                        </td>

                        {/* Timestamp Column */}
                        <td className="px-4 py-3 border-r border-(--border) text-(--text-2) whitespace-nowrap">
                          {submissionDate}
                        </td>

                        {/* Dynamic Field Data Cells */}
                        {form.fields.map((field) => {
                          let val = sub.data?.[field.id];
                          if (typeof val === "object") val = val.url;
                          const display = Array.isArray(val)
                            ? val.join(", ")
                            : val || "—";

                          return (
                            <td
                              key={field.id}
                              className="px-4 py-3 border-r border-(--border) max-w-sm truncate"
                              title={display !== "—" ? display : undefined} // Tooltip showing full text on hover
                            >
                              <span
                                className={
                                  display === "—"
                                    ? "text-(--text-3)"
                                    : "text-(--text)"
                                }
                              >
                                {display}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
