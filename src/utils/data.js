import toast from "react-hot-toast";

export const steps = [
  {
    icon: "✏️",
    title: "Create a Form",
    desc: "Use the builder to add fields — text, dropdowns, checkboxes, dates, and more. Give your form a title and description.",
  },
  {
    icon: "🔗",
    title: "Share the Link",
    desc: "Each form gets a unique link. Share it with anyone — they can fill it from any device without needing an account.",
  },
  {
    icon: "📊",
    title: "View Responses",
    desc: "All submissions are collected in the Data page. Download them as a PDF with a single click.",
  },
];

export const features = [
  { icon: "📝", label: "9 Field Types" },
  { icon: "🎨", label: "Dark & Light Mode" },
  { icon: "📱", label: "Mobile Responsive" },
  { icon: "📄", label: "PDF Export" },
  { icon: "🗄️", label: "MongoDB Storage" },
  { icon: "⚡", label: "Built with Next.js" },
];

export const FIELD_TYPES = [
  { type: "text", label: "Short Text", icon: "T" },
  { type: "textarea", label: "Long Text", icon: "¶" },
  { type: "number", label: "Number", icon: "#" },
  { type: "email", label: "Email", icon: "@" },
  { type: "select", label: "Dropdown", icon: "▾" },
  { type: "radio", label: "Radio", icon: "◉" },
  { type: "checkbox", label: "Checkbox", icon: "☑" },
  { type: "date", label: "Date", icon: "📅" },
  { type: "file", label: "File Upload", icon: "📎" },
];

export const handleShare = async (formId, title = "", desc) => {
  const url = `${window.location.origin}/view/${formId}`;

  try {
    // Mobile native share
    if (navigator.share) {
      await navigator.share({
        title: title,
        text: desc || "Fill out this form",
        url,
      });
      return;
    }

    // Desktop fallback
    await navigator.clipboard.writeText(url);
  } catch (err) {
    toast.error(err.message);
  }
};
