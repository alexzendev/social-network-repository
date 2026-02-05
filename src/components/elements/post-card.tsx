import {
  Ellipsis,
  Heart,
  MessageCircle,
  Pen,
  Repeat,
  Share,
  Share2,
  Trash,
} from "lucide-react";
import type { Post } from "../../types/post-types";
import { formatDate } from "../../utils/format-date";
import { useState } from "react";
import { Modal } from "../ui/modal";
import Popover from "../ui/popover";
import { PostForm } from "./post-form";
import { API_ENDPOINTS, CONFIG } from "../../config/environments";

interface PostCardProps {
  post: Post;
  fetchPosts: () => Promise<void>;
}

export const PostCard = ({ post, fetchPosts }: PostCardProps) => {
  const [openEditModal, setOpenEditModal] = useState<number | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<number | null>(null);

  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const handleUpdate = async (postData: PostFormData) => {
    try {
      const response = await fetch(
        `${CONFIG.BACKEND_URL}${API_ENDPOINTS.POSTS}/${editingPost.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: editingPost.id,
            user: "Ulises Jiménez",
            image:
              "https://scontent.flov1-1.fna.fbcdn.net/v/t39.30808-6/445387230_345883371854518_401274454041498055_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=zvECD4yAgR8Q7kNvwGOMwGC&_nc_oc=Adl_Xq7i3O7tZqIV0jCGClVrsDMHtdEQ9_KYkg57zkXO5MsE4Kt-3RgONkNTqFMD0vQ9RH-xws2TPuW1CdeKy2QK&_nc_zt=23&_nc_ht=scontent.flov1-1.fna&_nc_gid=ULhv2ByLCr6kI7AuPH6ZFw&oh=00_AfuBfZKnOe64xCu6cmBRFeGpcKoBjuL_M-HaNzp2kqafjA&oe=6989F71F",
            username: "ulisesjimenez",
            content: postData.content,
            date: editingPost.date,
          }),
        },
      );

      if (response.ok) {
        await fetchPosts();
        setEditingPost(null);
        alert("Publicación actualizada exitosamente");
      }
    } catch (error) {
      console.error("Error al actualizar publicación:", error);
      alert("Error al actualizar la publicación");
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
                    onClick={() => setOpenEditModal(post.id)}
                    className="flex items-center text-xs hover:bg-stone-200 px-3 py-2 w-full cursor-pointer"
                  >
                    <Pen className="size-3 mr-2 inline-block" />
                    <p>Editar</p>
                  </button>
                  <button
                    onClick={() => setOpenEditModal(post.id)}
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
      <Modal
        isOpen={openEditModal === post.id}
        onClose={() => setOpenEditModal(null)}
      >
        <div className="max-w-lg w-full rounded-lg">
          <PostForm
            editingPost={editingPost}
            onCancelEdit={onCancelEdit}
            onSubmit={handleUpdate}
          />
        </div>
      </Modal>
    </>
  );
};
