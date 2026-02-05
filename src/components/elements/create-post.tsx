import { useState } from "react";
import { Modal } from "../ui/modal";
import { PostForm } from "../post-form";
import { API_ENDPOINTS, CONFIG } from "../../config/environments";
import type { PostFormData } from "../../types/post-form-types";
import { toast } from "sonner";

interface CreatePostProps {
  fetchPosts: () => Promise<void>;
}

export const CreatePost = ({ fetchPosts }: CreatePostProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCreate = async (postData: PostFormData) => {
    try {
      const response = await fetch(
        `${CONFIG.BACKEND_URL}${API_ENDPOINTS.POSTS}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: "Ulises Jiménez",
            image: "https://scontent.flov1-1.fna.fbcdn.net/v/t39.30808-6/445387230_345883371854518_401274454041498055_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=zvECD4yAgR8Q7kNvwGOMwGC&_nc_oc=Adl_Xq7i3O7tZqIV0jCGClVrsDMHtdEQ9_KYkg57zkXO5MsE4Kt-3RgONkNTqFMD0vQ9RH-xws2TPuW1CdeKy2QK&_nc_zt=23&_nc_ht=scontent.flov1-1.fna&_nc_gid=ULhv2ByLCr6kI7AuPH6ZFw&oh=00_AfuBfZKnOe64xCu6cmBRFeGpcKoBjuL_M-HaNzp2kqafjA&oe=6989F71F",
            username: "ulisesjimenez",
            content: postData.content,
            date: new Date().toISOString(),
          }),
        },
      );

      if (response.ok) {
        await fetchPosts();
        toast.success("Publicación creada con éxito");
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error al crear publicación:", error);
      toast.error("Error al crear la publicación");
    }
  };
  return (
    <div className="flex items-center gap-2 sticky top-0">
      <div>
        <img
          src="https://scontent.flov1-1.fna.fbcdn.net/v/t39.30808-6/445387230_345883371854518_401274454041498055_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=zvECD4yAgR8Q7kNvwGOMwGC&_nc_oc=Adl_Xq7i3O7tZqIV0jCGClVrsDMHtdEQ9_KYkg57zkXO5MsE4Kt-3RgONkNTqFMD0vQ9RH-xws2TPuW1CdeKy2QK&_nc_zt=23&_nc_ht=scontent.flov1-1.fna&_nc_gid=ULhv2ByLCr6kI7AuPH6ZFw&oh=00_AfuBfZKnOe64xCu6cmBRFeGpcKoBjuL_M-HaNzp2kqafjA&oe=6989F71F"
          alt="Foto de usuario"
          className="size-10 rounded-full"
        />
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-stone-200 rounded-full px-4 py-3 text-xs w-full flex justify-start cursor-pointer"
      >
        <p>¿Qué estás pensando?</p>
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="max-w-lg w-full rounded-lg"
      >
        <PostForm onSubmit={handleCreate} />
      </Modal>
    </div>
  );
};
