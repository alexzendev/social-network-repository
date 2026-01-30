import { PostCard } from "./post-card";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

interface PostListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

export const PostList = ({ posts, onEdit, onDelete }: PostListProps) => {
  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          No hay publicaciones
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Comienza creando una nueva publicación o intenta con otra búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
