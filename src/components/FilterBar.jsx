import React, { useState, useEffect } from "react";
import axios from "axios";
import AdultModal from "./adultModal";

const FilterBar = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showAllGenres, setShowAllGenres] = useState(false);
  const [showAdultModal, setShowAdultModal] = useState(false); // Add this line
  const [minRating, setMinRating] = useState(1);
  const [minRuntime, setMinRuntime] = useState(60);
  const [maxRuntime, setMaxRuntime] = useState(180);
  const maxGenres = 3;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/genres");
        if (response.data.success) {
          setGenres(response.data.genres);
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  const handleGenreChange = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      const updated = selectedGenres.filter((id) => id !== genreId);
      setSelectedGenres(updated);
      updateFilters(updated);
    } else if (selectedGenres.length < maxGenres) {
      const updated = [...selectedGenres, genreId];
      setSelectedGenres(updated);
      updateFilters(updated);
    }
  };

  const updateFilters = (genreList = selectedGenres) => {
    const filters = {
      genres: genreList,
      min_rating: minRating,
      min_runtime: minRuntime,
      max_runtime: maxRuntime,
      page: 1,
    };
    onFilterChange(filters);
  };

  const clearAllFilters = () => {
    setSelectedGenres([]);
    setMinRating(1);
    setMinRuntime(60);
    setMaxRuntime(180);
    onFilterChange({});
  };

  // Add this function
  const handleAdultConfirm = () => {
    setShowAdultModal(false);
    window.open("https://www.google.com/search?q=pornhub", "_blank");
  };

  const displayedGenres = showAllGenres ? genres : genres.slice(0, 8);

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 mb-6 border border-gray-200 dark:border-neutral-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          🎯 Filters
        </h3>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Selected: <span>{selectedGenres.length}</span>/{maxGenres}
          </span>
          <button
            onClick={clearAllFilters}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Genres */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
          🎭 Genres:
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {displayedGenres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreChange(genre.id.toString())}
              disabled={
                !selectedGenres.includes(genre.id.toString()) &&
                selectedGenres.length >= maxGenres
              }
              className={`px-3 py-2 text-sm border rounded-md transition-colors ${
                selectedGenres.includes(genre.id.toString())
                  ? "bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-700 dark:text-blue-300"
                  : "bg-white dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-neutral-600 border-gray-300 dark:border-neutral-600"
              } ${
                !selectedGenres.includes(genre.id.toString()) &&
                selectedGenres.length >= maxGenres
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {genre.name}
            </button>
          ))}

          <button
            onClick={() => setShowAllGenres(!showAllGenres)}
            className="px-3 py-2 text-sm rounded-md font-semibold bg-gray-200 dark:bg-neutral-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-neutral-500"
          >
            {showAllGenres ? "Show Less" : "Show More"}
          </button>

          <button
            onClick={() => setShowAdultModal(true)} // Fixed syntax
            className="px-3 py-2 text-sm rounded-md font-bold bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            18+ 🔞
          </button>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            ⭐ Min Rating: <span className="text-blue-600">{minRating}</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={minRating}
            onChange={(e) => {
              setMinRating(Number(e.target.value));
              setTimeout(() => updateFilters(), 500);
            }}
            className="w-full h-2 bg-gray-200 dark:bg-neutral-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            ⏱️ Min Runtime:{" "}
            <span className="text-blue-600">{minRuntime} min</span>
          </label>
          <input
            type="range"
            min="30"
            max="240"
            value={minRuntime}
            onChange={(e) => {
              setMinRuntime(Number(e.target.value));
              setTimeout(() => updateFilters(), 500);
            }}
            className="w-full h-2 bg-gray-200 dark:bg-neutral-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            ⏰ Max Runtime:{" "}
            <span className="text-blue-600">{maxRuntime} min</span>
          </label>
          <input
            type="range"
            min="30"
            max="240"
            value={maxRuntime}
            onChange={(e) => {
              setMaxRuntime(Number(e.target.value));
              setTimeout(() => updateFilters(), 500);
            }}
            className="w-full h-2 bg-gray-200 dark:bg-neutral-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Modal */}
      <AdultModal
        isOpen={showAdultModal}
        onClose={() => setShowAdultModal(false)}
        onConfirm={handleAdultConfirm}
      />
    </div>
  );
};

export default FilterBar;
