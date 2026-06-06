import toast from "react-hot-toast";
import { create } from "zustand";
import { askGemini } from "./gemini";

const generateId = () => Math.random().toString(36).slice(2, 10);

export const useFormBuilder = create((set) => ({
  title: "",
  description: "Fill out this form.",
  fields: [],

  loading: false,

  addFormByAi: async(prompt, setPrompt) => {
    if(!prompt.trim()) {
      toast.error("Please add input to generate form.")
      return;
    }

    set({loading: true});

    const {title, description, fields, err} = await askGemini(prompt);

    if(err) return;
    
    set({title: title, description: description});
    const fieldData = fields.map((field) => ({...field, id: generateId()}));
    setPrompt("");
    set({fields: fieldData, loading: false});
  },
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  addField: (type) =>
    set((state) => ({
      fields: [
        ...state.fields,
        {
          id: generateId(),
          type,
          label: `Question ${state.fields.length + 1}`,
          placeholder: "",
          required: false,
          options: ["select", "radio", "checkbox"].includes(type)
            ? ["Option 1", "Option 2"]
            : null,
        },
      ],
    })),

  updateField: (id, updates) =>
    set((state) => ({
      fields: state.fields.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    })),

  removeField: (id) =>
    set((state) => ({ fields: state.fields.filter((f) => f.id !== id) })),

  moveField: (fromIndex, toIndex) =>
    set((state) => {
      const fields = [...state.fields];
      const [moved] = fields.splice(fromIndex, 1);
      fields.splice(toIndex, 0, moved);
      return { fields };
    }),

  reset: () => set({ title: "", description: "", fields: [] }),
}));