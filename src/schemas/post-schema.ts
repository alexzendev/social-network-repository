import z from "zod";

export const postSchema = z.object({
  content: z
    .string()
    .min(10, "El contenido debe tener al menos 10 caracteres")
    .max(500, "El contenido no puede exceder 500 caracteres"),
});
