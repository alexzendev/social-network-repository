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
    <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{post.title}</h3>
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
          className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 text-sm font-medium"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Editar
        </button>

        <button
          onClick={() => onDelete(post.id)}
          className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 text-sm font-medium"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
};
