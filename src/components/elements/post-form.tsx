import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { postSchema } from "../../schemas/post-schema";
import type { PostFormData } from "../../types/post-form-types";

interface Post {
  id: number;
  content: string;
  date: string;
}

interface PostFormProps {
  onSubmit: (data: PostFormData) => void;
  editingPost: Post | null;
  onCancelEdit: () => void;
}

export const PostForm = ({
  onSubmit,
  editingPost,
  onCancelEdit,
}: PostFormProps) => {
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
      setValue("content", editingPost.content);
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
    <div className="">
      <h2 className="text-base uppercase font-semibold text-gray-800 mb-4">
        {editingPost ? "Editar Publicación" : "Nueva Publicación"}
      </h2>

      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div>
          <textarea
            id="content"
            {...register("content")}
            rows={8}
            className={`text-sm w-full px-4 py-2 border rounded-lg focus:ring-0 focus:border-transparent resize-none ${
              errors.content ? "border-red-500" : "border-stone-300"
            }`}
            placeholder="¿Qué estás pensando?"
          />
          {errors.content && (
            <p className="mt-0.5 text-xs text-red-600">
              * {errors.content.message}
            </p>
          )}
        </div>

        <div className="flex gap-2 mt-5">
          <button
            type="submit"
            className="flex-1 bg-stone-800 text-white py-3 px-4 rounded-lg hover:bg-stone-700 transition duration-200 font-semibold uppercase text-xs cursor-pointer"
          >
            {editingPost ? "Actualizar" : "Publicar"}
          </button>

          {editingPost && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-stone-200 text-stone-800 py-3 px-4 rounded-lg hover:bg-stone-300 transition duration-200 font-semibold uppercase text-xs cursor-pointer"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
