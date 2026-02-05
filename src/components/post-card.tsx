import type { Post } from "../types/post-types";
import { formatDate } from "../utils/format-date";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div key={post.id} className="border border-stone-300 rounded-lg p-4">
      <div className="flex items-center gap-2">
        <img
          src={post.image}
          alt={`Imagen de ${post.user}`}
          className="size-10 rounded-full"
        />
        <div>
          <p className="font-semibold text-xs">{post.user}</p>
          <p className="text-[11px] text-stone-500">
            @{post.username} · {formatDate(post.date)}
          </p>
        </div>
      </div>
      <p>{post.content}</p>
    </div>
  );
};
