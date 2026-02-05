import { Header } from "../components/elements/header";
import { CreatePost } from "../components/elements/create-post";
import { DATA_SUGGESTIONS } from "../utils/data/data-suggestions";
import { UserSuggestion } from "../components/ui/user-suggestion";
import { DATA_SIDEBAR } from "../utils/data/data-sidebar";
import { getIcon, type IconName } from "../utils/icon-map";
import type { Post } from "../types/post-types";
import { useState } from "react";
import { useFetchPost } from "../hooks/useFetchPost";

interface SidebarItem {
  id: number;
  label: string;
  icon: IconName;
  active: boolean;
}

export const Home = () => {

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const { fetchPosts } = useFetchPost({
    setPosts,
    setIsLoading,
    setFilteredPosts,
  });
  
  return (
    <div className="container mx-auto border-x border-stone-200">
      <Header />
      <main className="flex flex-row ">
        <aside className="border-r border-stone-200 w-64 min-h-svh p-4 space-y-2">
          {DATA_SIDEBAR.map((item: SidebarItem) => {
            const Icon = getIcon(item.icon);
            return (
              <div
                key={item.id}
                className={`flex items-center gap-2 rounded-md p-1.5 ${item.active ? "bg-stone-200" : "hover:bg-stone-200 cursor-pointer"}`}
              >
                <Icon className="size-4" />
                <p className="text-sm">{item.label}</p>
              </div>
            );
          })}
        </aside>

        <section className="flex-1">
          <div className="max-w-xl mx-auto">
            <CreatePost fetchPosts={fetchPosts} />
          </div>
        </section>

        <aside className="border-l border-stone-200 w-64 min-h-svh p-4">
          <h2 className="uppercase font-semibold text-xs mb-4">
            Sugerencias para ti
          </h2>

          <div className="space-y-2">
            {DATA_SUGGESTIONS.map((suggestion) => (
              <UserSuggestion key={suggestion.id} data={suggestion} />
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
};
