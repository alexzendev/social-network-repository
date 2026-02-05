interface UserSuggestionProps {
  data: {
    id: number;
    name: string;
    username: string;
    imageUrl: string;
  };
}

export const UserSuggestion = ({ data }: UserSuggestionProps) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={data.imageUrl}
        alt={data.name}
        className="size-8 rounded-full object-cover"
      />
      <div>
        <p className="text-xs">{data.name}</p>
        <p className="text-[10px] text-stone-500">@{data.username}</p>
      </div>
    </div>
  );
};
