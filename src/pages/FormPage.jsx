import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShareButton from "../components/ShareButton";
import Navbar from "../components/Navbar";
import { useForm } from "../utils/useForm.js";
import { useAuth } from "../utils/useAuth";
import { BarWaveLoader } from "../components/loader/BarWaveLoader.jsx";

export default function FormsPage() {
  const { getUserForm, forms, loading, updateToComplete, up } = useForm();
  const { user } = useAuth();

  useEffect(() => {
    getUserForm(user.uid);
  }, [user]);

  const deleteForm = async (id) => {
    console.log("form deleted", id);
  };

  if (!forms) return <BarWaveLoader />;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-['DM_Serif_Display',serif] text-3xl m-0">
            My Forms
          </h1>
          <p className="text-(--text-2) mt-1 text-sm">
            {forms.length} form{forms.length !== 1 ? "s" : ""} created
          </p>
        </div>
        <Link to="/form/create" className="btn-primary">
          + New Form
        </Link>
      </div>

      {/* Main Content States */}
      {loading ? (
        <div className="text-center py-16 text-(--text-3)">Loading…</div>
      ) : forms.length === 0 ? (
        <div className="bg-(--surface) border border-(--border) rounded-xl py-16 px-8 text-center">
          <div className="text-5xl mb-4">📋</div>
          <p className="text-(--text-2) mb-6">
            No forms yet. Create your first one!
          </p>
          <Link to="/form/create" className="btn-primary">
            ✨ Create Form
          </Link>
        </div>
      ) : forms?.error ? (
        <div className="bg-(--surface) border border-(--border) rounded-xl py-16 px-8 text-center">
          <div className="text-5xl mb-4">📋</div>
          <p className="text-(--text-2) mb-6">{forms.error}</p>
        </div>
      ) : (
        /* Forms Stack List */
        <div className="flex flex-col gap-4">
          {forms.map((form, i) => (
            <div
              key={form.id}
              className="bg-(--surface) border border-(--border) rounded p-4 gap-4 flex flex-col sm:flex-row fade-up transition-all hover:border-(--accent)/40"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Meta Content & Truncation Layer */}
              <div className="min-w-0 flex-1">
                <Link
                  to={`/view/${form.id}`}
                  className="block font-semibold text-[0.95rem] text-(--text) hover:text-(--accent) truncate no-underline transition-colors mb-1"
                >
                  {form.title || "Untitled Form"}
                </Link>

                {/* Subtitle Badge Row */}
                <div className="flex items-center gap-2 text-[0.78rem] text-(--text-3) flex-wrap">
                  <span className="font-medium bg-(--bg-2) px-2 py-0.5 rounded border border-(--border)">
                    {form.fields.length} fields
                  </span>
                  <span className="text-gray-400 select-none">·</span>
                  <span>
                    Created{" "}
                    {form.createdAt?.toDate
                      ? new Date(form.createdAt.toDate()).toLocaleDateString()
                      : new Date(form.createdAt).toLocaleDateString()}
                  </span>

                  {/* Visual Status Indicator pill */}
                  {form.status === "running" ? (
                    <span className="ml-1 inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />{" "}
                      Active
                    </span>
                  ) : (
                    <span className="ml-1 inline-flex items-center gap-1 text-(--text-3) font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />{" "}
                      Finished
                    </span>
                  )}
                </div>
              </div>

              {/* Actions Button Group Layout Container */}
              <div className="flex items-center gap-2">
                <ShareButton
                  formId={form.id}
                  title={form.title}
                  desc={form.description}
                />

                <Link
                  to={`/form/${form.id}`}
                  className="btn-ghost p-2 text-base hover:bg-(--bg-2) rounded-lg transition-colors no-underline inline-flex items-center justify-center"
                  title="View Data"
                >
                  🧾
                </Link>

                <button
                  disabled={form.status !== "running" || (up && up === form.id)}
                  onClick={() => updateToComplete(form.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all border shrink-0 ${
                    form.status === "running"
                      ? "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white cursor-pointer active:scale-[0.98]"
                      : "bg-(--bg-2) text-(--text-3) border-(--border) opacity-50 cursor-not-allowed"
                  }`}
                >
                  {up && up === form.id ? "Loading..." : "Complete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
