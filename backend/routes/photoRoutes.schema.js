export const postSchema = {
  type: "object",
  properties: {
    url: { type: "string", format: "url" },
    theme: { type: "array", items: { type: "string" } },
    album: { type: "string", minLength: 24, maxLength: 24 },
  },
  required: ["url"],
  additionalProperties: false,
};
