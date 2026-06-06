import { getAI, getGenerativeModel, Schema, SchemaType } from "@firebase/ai";
import { app } from "./fb";
import toast from "react-hot-toast";

const ai = getAI(app);

const systemInstruction = `
Generate a form in JSON format based on the give prompt.

Return ONLY valid JSON.

Schema:

{
  "title": "string",
  "description": "string",
  "fields": [
    {
      "id": "unique string",
      "type": "text | email | number | textarea | select | radio | checkbox",
      "label": "string",
      "placeholder": "string",
      "required": true,
      "options": ["option1", "option2"]
    }
  ]
}

Rules:
- For text, email, number and textarea, options must be [].
- For radio and checkbox, provide options.
- Generate meaningful ids.
- Return only JSON.
- Do not include markdown.
- Do not include explanations.
`;



const model = getGenerativeModel(ai, {
  model: "gemini-2.5-flash-lite",
  systemInstruction,
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: {
      type: SchemaType.OBJECT,
      properties: {
        title: { type: SchemaType.STRING },
        description: { type: SchemaType.STRING },
        fields: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              type: {
                type: SchemaType.STRING,
                // Restricting field types using an enum constraint
                enum: [
                  "text",
                  "textarea",
                  "number",
                  "email",
                  "date",
                  "radio",
                  "checkbox",
                  "file",
                ],
              },
              label: { type: SchemaType.STRING }, // Added missing label property
              placeholder: { type: SchemaType.STRING },
              required: { type: SchemaType.BOOLEAN },
              options: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING },
              },
            },
            required: [
              "type",
              "label",
              "placeholder",
              "required",
              "options",
            ],
          },
        },
      },
      required: ["title", "description", "fields"],
    },
  },
});

export async function askGemini(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    // No Markdown (```json) parsing issues will occur here
    const form = JSON.parse(rawText);
    
    return form;
  } catch (error) {
    toast.error("Error generating structured form data:", error);
    return {err: true};
  }
}
