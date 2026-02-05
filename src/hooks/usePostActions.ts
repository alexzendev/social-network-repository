import { toast } from "sonner";
import { API_ENDPOINTS, CONFIG } from "../config/environments";
import type { PostFormData } from "../types/post-form-types";
import type { Post } from "../types/post-types";

interface UsePostActionsProps {
  fetchPosts: () => Promise<void>;
}

export const usePostActions = ({ fetchPosts }: UsePostActionsProps) => {
  const updatePost = async (post: Post, postData: PostFormData) => {
    try {
      const response = await fetch(
        `${CONFIG.BACKEND_URL}${API_ENDPOINTS.POSTS}/${post.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...post,
            content: postData.content,
          }),
        },
      );

      if (response.ok) {
        await fetchPosts();
        toast.success("Publicación actualizada exitosamente");
        return true;
      } else {
        toast.error("Error al actualizar la publicación");
        return false;
      }
    } catch (error) {
      console.error("Error al actualizar publicación:", error);
      toast.error("Error al actualizar la publicación");
      return false;
    }
  };

  const deletePost = async (postId: number) => {
    try {
      const response = await fetch(
        `${CONFIG.BACKEND_URL}${API_ENDPOINTS.POSTS}/${postId}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        await fetchPosts();
        toast.success("Publicación eliminada exitosamente");
        return true;
      } else {
        toast.error("Error al eliminar la publicación");
        return false;
      }
    } catch (error) {
      console.error("Error al eliminar publicación:", error);
      toast.error("Error al eliminar la publicación");
      return false;
    }
  };

  return { updatePost, deletePost };
};
