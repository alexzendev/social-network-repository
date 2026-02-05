import type z from "zod";
import type { postSchema } from "../schemas/post-schema";

export type PostFormData = z.infer<typeof postSchema>;