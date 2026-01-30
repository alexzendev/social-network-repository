import z from "zod";


export const postSchema = z.object({
  title: z.string()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres'),
  content: z.string()
    .min(10, 'El contenido debe tener al menos 10 caracteres')
    .max(500, 'El contenido no puede exceder 500 caracteres'),
  author: z.string()
    .min(2, 'El nombre del autor debe tener al menos 2 caracteres')
    .max(50, 'El nombre del autor no puede exceder 50 caracteres'),
});