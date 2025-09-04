import React, { useState, useEffect } from "react";
import axios from "axios";

const FilterBar = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [minRating, setMinRating] = useState(1);
  const [minRuntime, setMinRuntime] = useState(60);
  const [maxRuntime, setMaxRuntime] = useState(180);

  useEffect(() => {
    // Fetch genres from backend
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
    const updatedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId];

    setSelectedGenres(updatedGenres);
    updateFilters(updatedGenres);
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

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center">
          🎯 Filters
        </h3>
        <button
          onClick={() => {
            /* Add clear all filters logic */
          }}
          className="text-red-500 hover:text-red-700 text-sm font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Genres */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-3 text-gray-700">
          🎭 Genres:
        </label>
        <div className="flex flex-wrap gap-3">
          {genres.slice(0, 10).map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreChange(genre.id.toString())}
              className={`px-4 py-2 text-sm font-medium rounded-full border-2 transition-all duration-200 ${
                selectedGenres.includes(genre.id.toString())
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-lg"
                  : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-blue-300"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Rating */}
        <div className="space-y-3">
          <label className="block text-lg font-semibold text-gray-700">
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
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Runtime sliders with similar styling... */}
      </div>
    </div>
  );
};

export default FilterBar;
