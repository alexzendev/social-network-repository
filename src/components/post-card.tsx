import { formatDate } from "../utils/format-date";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

export const PostCard = ({ post, onEdit, onDelete }: PostCardProps) => {
  return (
    <article className="border border-stone-300 p-4 rounded-2xl">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1">{post.title}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <span className="font-medium">{post.author}</span>
            <span className="mx-2">•</span>
            <time>{formatDate(post.date)}</time>
          </div>
        </div>
      </div>
      <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
      <div className="flex gap-2 pt-4 border-t border-gray-200">
        <button
          onClick={() => onEdit(post)}
          className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 text-sm font-medium cursor-pointer"
        >
          Editar
        </button>

        <button
          onClick={() => onDelete(post.id)}
          className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 text-sm font-medium cursor-pointer"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
};
