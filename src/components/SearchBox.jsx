import React, { useState } from "react";

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="flex gap-3 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍 Search for movies... (e.g., 'Marvel', 'Comedy 2023')"
            className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all shadow-lg"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
