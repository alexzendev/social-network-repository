import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="size-4 text-stone-600" />
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          className="block w-full pl-10 pr-10 py-2 border border-stone-300 rounded-lg focus:ring-none focus:border-transparent text-xs"
          placeholder="Buscar en Friendly..."
        />

        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="size-4 text-stone-600" />
          </button>
        )}
      </div>
    </div>
  );
};
