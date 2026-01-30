import { useEffect, useState } from "react";
import { API_ENDPOINTS, CONFIG } from "./config/environments";
import { PostList } from "./components/post-list";
import { PostForm } from "./components/post-form";
import { SearchBar } from "./components/search-bar";
import { postSchema } from "./schemas/post-schema";
import type { z } from "zod";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

type PostFormData = z.infer<typeof postSchema>;

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

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
      console.error("Error al cargar publicaciones:", error);
      alert("Error al cargar las publicaciones");
    } finally {
      setIsLoading(false);
    }
  };

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
            ...postData,
            date: new Date().toISOString(),
          }),
        },
      );

      if (response.ok) {
        await fetchPosts();
        alert("Publicación creada exitosamente");
      }
    } catch (error) {
      console.error("Error al crear publicación:", error);
      alert("Error al crear la publicación");
    }
  };

  const handleUpdate = async (postData: PostFormData) => {
    if (!editingPost) return;
    
    try {
      const response = await fetch(
        `${CONFIG.BACKEND_URL}${API_ENDPOINTS.POSTS}/${editingPost.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...postData,
            id: editingPost.id,
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

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar esta publicación?")) return;

    try {
      const response = await fetch(
        `${CONFIG.BACKEND_URL}${API_ENDPOINTS.POSTS}/${id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        await fetchPosts();
        alert("Publicación eliminada exitosamente");
      }
    } catch (error) {
      console.error("Error al eliminar publicación:", error);
      alert("Error al eliminar la publicación");
    }
  };

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredPosts(posts);
      return;
    }

    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredPosts(filtered);
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  return (
    <div className="min-h-screen">
      <header className="bg-indigo-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">Red Social React</h1>
          <p className="text-center text-indigo-200 mt-2">
            Comparte tus pensamientos con el mundo
          </p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <PostForm
                onSubmit={editingPost ? handleUpdate : handleCreate}
                editingPost={editingPost}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <SearchBar onSearch={handleSearch} />

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Cargando publicaciones...</p>
              </div>
            ) : (
              <PostList
                posts={filteredPosts}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
