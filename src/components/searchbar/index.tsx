import { Search, X } from "lucide-react";
import Input from "../input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar:React.FC<SearchBarProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="relative w-full">
      <Input
        type="search"
        name="search"
        placeholder="Search products by title…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        icon={<Search className="h-4 w-4" />}
        aria-label="Search products"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
