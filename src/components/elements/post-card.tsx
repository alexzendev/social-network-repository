import {
  Ellipsis,
  Heart,
  MessageCircle,
  Pen,
  Repeat,
  Share2,
  Trash,
} from "lucide-react";
import type { Post } from "../../types/post-types";
import { formatDate } from "../../utils/format-date";
import { useState } from "react";
import { Modal } from "../ui/modal";
import Popover from "../ui/popover";
import { PostForm } from "./post-form";
import { usePostActions } from "../../hooks/usePostActions";
import type { PostFormData } from "../../types/post-form-types";

interface PostCardProps {
  post: Post;
  fetchPosts: () => Promise<void>;
}

export const PostCard = ({ post, fetchPosts }: PostCardProps) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { updatePost, deletePost } = usePostActions({ fetchPosts });

  const handleEdit = () => {
    setOpenEditModal(true);
  };

  const handleDelete = () => {
    setOpenDeleteModal(true);
  };

  const handleUpdate = async (postData: PostFormData) => {
    const success = await updatePost(post, postData);
    if (success) {
      setOpenEditModal(false);
    }
  };

  const handleConfirmDelete = async () => {
    const success = await deletePost(post.id);
    if (success) {
      setOpenDeleteModal(false);
    }
  };

  return (
    <>
      <div key={post.id} className="border border-stone-300 rounded-lg p-4">
        <div className="flex items-center gap-x-2">
          <img
            src={post.image}
            alt={`Imagen de ${post.user}`}
            className="size-10 rounded-full"
          />
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <p className="font-semibold text-xs">{post.user}</p>
              <Popover
                trigger={
                  <button className="cursor-pointer">
                    <Ellipsis className="size-4 text-stone-600" />
                  </button>
                }
                placement="bottom-end"
              >
                <div className="p-2">
                  <button
                    onClick={handleEdit}
                    className="flex items-center text-xs hover:bg-stone-200 px-3 py-2 w-full cursor-pointer"
                  >
                    <Pen className="size-3 mr-2 inline-block" />
                    <p>Editar</p>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex items-center text-xs hover:bg-stone-200 px-3 py-2 w-full cursor-pointer"
                  >
                    <Trash className="size-3 mr-2 inline-block" />
                    <p>Eliminar</p>
                  </button>
                </div>
              </Popover>
            </div>
            <p className="text-[11px] text-stone-500">
              @{post.username} · {formatDate(post.date)}
            </p>
          </div>
        </div>
        <div className="border-t border-stone-300 mt-5">
          <p className="py-5">{post.content}</p>
          <div className="flex justify-between items-center border-t border-stone-300 pt-3">
            <div className="flex gap-2">
              <Heart className="size-4" />
              <MessageCircle className="size-4" />
              <Repeat className="size-4" />
            </div>
            <div>
              <Share2 className="size-4" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de Edición */}
      <Modal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
      >
        <div className="max-w-lg w-full rounded-lg">
          <PostForm
            editingPost={post}
            onCancelEdit={() => setOpenEditModal(false)}
            onSubmit={handleUpdate}
          />
        </div>
      </Modal>

      {/* Modal de Confirmación de Eliminación */}
      <Modal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      >
        <div className="max-w-md w-full rounded-lg p-6 bg-white">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            ¿Eliminar publicación?
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar esta publicación?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setOpenDeleteModal(false)}
              className="flex-1 bg-stone-200 text-stone-800 py-3 px-4 rounded-lg hover:bg-stone-300 transition duration-200 font-semibold uppercase text-xs"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmDelete}
              className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition duration-200 font-semibold uppercase text-xs"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
