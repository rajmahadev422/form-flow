import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FileUploadField from "../components/FileUploadField";
import FormFooter from "../components/FormFooter";
import { useSubmitForm } from "../utils/useForm";
import FormDeadline from "../components/FormDeadline";
import AdvDisplay from "../components/AdvDisplay";

export default function ViewForm() {
  const { id } = useParams();
  const [values, setValues] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const { getFormById, form, loading, submitForm } = useSubmitForm();

  useEffect(() => {
    getFormById(id);
  }, [id]);

  const setValue = (fieldId, val) => {
    setValues((v) => ({ ...v, [fieldId]: val }));
    setErrors((e) => {
      const n = { ...e };
      delete n[fieldId];
      return n;
    });
  };

  const toggleCheckbox = (fieldId, option) => {
    const cur = values[fieldId] || [];
    setValue(
      fieldId,
      cur.includes(option) ? cur.filter((x) => x !== option) : [...cur, option],
    );
  };

  const validate = () => {
    const errs = {};
    form?.fields.forEach((field) => {
      if (!field.required) return;
      const v = values[field.id];
      if (field.type === "file") {
        if (!v || !v.url) errs[field.id] = "Please upload a file";
      } else if (!v || (Array.isArray(v) && v.length === 0) || v === "") {
        errs[field.id] = "This field is required";
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const payload = { data: values, formId: id };
      await submitForm(payload);
      setSubmitted(true);
    } catch (err) {
      alert("Submission failed: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // State 1: Loading view
  if (!form)
    return (
      <div className="text-center py-24 px-6 text-(--text-3)">
        Loading form…
      </div>
    );

  // State 2: Error fallback view
  if (!form || form.error)
    return (
      <div className="text-center py-24 px-6">
        <p className="text-(--danger) mb-4">Form not found.</p>
        <Link href="/forms" className="btn-ghost">
          ← Back to Forms
        </Link>
      </div>
    );

  if (form.status === "completed") return <FormDeadline formTitle={form.title} />;

  // State 3: Submission successful screen
  if (submitted)
    return (
      <div className="max-w-5xl mx-auto py-24 px-6 text-center">
        <div className="text-[3.5rem] mb-4">✅</div>
        <h2 className="font-['DM_Serif_Display',serif] text-3xl mb-3">
          Response submitted!
        </h2>
        <p className="text-(--text-2) mb-8">
          Thank you for filling out <strong>{form.title}</strong>.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => {
              setSubmitted(false);
              setValues({});
            }}
            className="btn-ghost"
          >
            Submit another
          </button>
        </div>
      </div>
    );

  // State 4: Interactive Input Form View

  return (
    <>
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Form Context Info Top Header Card */}
        <div className="bg-(--surface) border border-(--border) rounded-xl p-7 mb-5 border-t-4 border-t-(--accent)">
          <h1 className="font-['DM_Serif_Display',serif] text-3xl mb-2">
            {form.title}
          </h1>
          {form.description && (
            <p className="text-(--text-2) m-0 leading-relaxed">
              {form.description}
            </p>
          )}
          <p className="text-(--text-3) text-[0.78rem] mt-3 mb-0">
            * Required fields
          </p>
        </div>

        {/* Interactive Form Controls List */}
        <div className="flex flex-col gap-3.5">
          {form.fields.map((field, i) => (
            <div
              key={field.id}
              className="bg-(--surface) border border-(--border) rounded-xl px-6 py-5 fade-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <label className="block font-semibold mb-2.5 text-[0.95rem]">
                {field.label}
                {field.required && (
                  <span className="text-(--danger) ml-1">*</span>
                )}
              </label>

              {field.type === "text" && (
                <input
                  className="input"
                  placeholder={field.placeholder}
                  value={values[field.id] || ""}
                  onChange={(e) => setValue(field.id, e.target.value)}
                />
              )}
              {field.type === "textarea" && (
                <textarea
                  className="input resize-y"
                  placeholder={field.placeholder}
                  value={values[field.id] || ""}
                  onChange={(e) => setValue(field.id, e.target.value)}
                  rows={3}
                />
              )}
              {field.type === "number" && (
                <input
                  className="input"
                  type="number"
                  placeholder={field.placeholder}
                  value={values[field.id] || ""}
                  onChange={(e) => setValue(field.id, e.target.value)}
                />
              )}
              {field.type === "email" && (
                <input
                  className="input"
                  type="email"
                  placeholder={field.placeholder}
                  value={values[field.id] || ""}
                  onChange={(e) => setValue(field.id, e.target.value)}
                />
              )}
              {field.type === "date" && (
                <input
                  className="input"
                  type="date"
                  value={values[field.id] || ""}
                  onChange={(e) => setValue(field.id, e.target.value)}
                />
              )}
              {field.type === "select" && (
                <select
                  className="input"
                  value={values[field.id] || ""}
                  onChange={(e) => setValue(field.id, e.target.value)}
                >
                  <option value="">Select an option…</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
              {field.type === "radio" && (
                <div className="flex flex-col gap-2">
                  {field.options?.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer text-sm text-(--text-2)"
                    >
                      <input
                        type="radio"
                        name={field.id}
                        value={opt}
                        checked={values[field.id] === opt}
                        onChange={() => setValue(field.id, opt)}
                        className="accent-(--accent) w-4 h-4"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}
              {field.type === "checkbox" && (
                <div className="flex flex-col gap-2">
                  {field.options?.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer text-sm text-(--text-2)"
                    >
                      <input
                        type="checkbox"
                        checked={(values[field.id] || []).includes(opt)}
                        onChange={() => toggleCheckbox(field.id, opt)}
                        className="accent-(--accent) w-4 h-4"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}
              {field.type === "file" && (
                <FileUploadField
                  fieldId={field.id}
                  required={field.required}
                  value={values[field.id] || null}
                  onChange={(val) => setValue(field.id, val)}
                  error={errors[field.id]}
                />
              )}

              {errors[field.id] && field.type !== "file" && (
                <p className="text-(--danger) text-[0.78rem] mt-1.5 mb-0">
                  ⚠ {errors[field.id]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Navigation & Submit Action Row */}
        <div className="mt-6 flex gap-3 justify-between items-center flex-wrap">
          <button
            onClick={handleSubmit}
            className="btn-primary min-w-30"
            disabled={submitting}
          >
            {submitting ? "Submitting…" : "Submit →"}
          </button>
        </div>
        <FormFooter />
      </div>
    </>
  );
}
