import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { postSchema } from "../schemas/post-schema";
import type { z } from "zod";

type PostFormData = z.infer<typeof postSchema>;

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

interface PostFormProps {
  onSubmit: (data: PostFormData) => void;
  editingPost: Post | null;
  onCancelEdit: () => void;
}

export const PostForm = ({ onSubmit, editingPost, onCancelEdit }: PostFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  useEffect(() => {
    if (editingPost) {
      setValue("title", editingPost.title);
      setValue("content", editingPost.content);
      setValue("author", editingPost.author);
    } else {
      reset();
    }
  }, [editingPost, setValue, reset]);

  const onSubmitForm = (data: PostFormData) => {
    onSubmit(data);
    reset();
  };

  const handleCancel = () => {
    reset();
    onCancelEdit();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {editingPost ? "Editar Publicación" : "Nueva Publicación"}
      </h2>

      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Escribe el título..."
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contenido
          </label>
          <textarea
            id="content"
            {...register("content")}
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              errors.content ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="¿Qué estás pensando?"
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">
              {errors.content.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Autor
          </label>
          <input
            type="text"
            id="author"
            {...register("author")}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              errors.author ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Tu nombre"
          />
          {errors.author && (
            <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
          >
            {editingPost ? "Actualizar" : "Publicar"}
          </button>

          {editingPost && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200 font-medium"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
