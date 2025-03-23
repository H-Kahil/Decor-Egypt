import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="relative w-64">
      <Input
        type="text"
        placeholder={placeholder}
        className="pl-9"
        value={value}
        onChange={onChange}
      />
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
    </div>
  );
};

export default SearchBar;
