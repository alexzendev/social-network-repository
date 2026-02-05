import { toast } from "sonner";
import { API_ENDPOINTS, CONFIG } from "../config/environments";
import type { Post } from "../types/post-types";

interface UseFetchPostProps {
  setIsLoading: (isLoading: boolean) => void;
  setPosts: (posts: Post[]) => void;
  setFilteredPosts: (posts: Post[]) => void;
}

export const useFetchPost = ({
  setIsLoading,
  setPosts,
  setFilteredPosts,
}: UseFetchPostProps) => {
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${CONFIG.BACKEND_URL}${API_ENDPOINTS.POSTS}`,
      );
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      toast.error("Error al obtener las publicaciones");
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchPosts };
};
