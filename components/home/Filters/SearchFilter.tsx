import { useState } from "react";

interface SearchFilterProps {
    onSearch: (query: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <div className="w-full">
            <div className="text-zinc-400 text-xs font-medium mb-1">Search by keyword</div>
            <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
        </div>
    );
};

export default SearchFilter;