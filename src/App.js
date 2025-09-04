import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import FilterBar from "./components/FilterBar";
import MovieList from "./components/MovieList";
import "./index.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchMode, setSearchMode] = useState(false);

  // Initial load - discover popular movies
  useEffect(() => {
    discoverMovies({});
  }, []);

  const discoverMovies = async (filters) => {
    setLoading(true);
    setSearchMode(false);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/movies/discover",
        filters
      );
      if (response.data.success) {
        setMovies(response.data.results || []);
      }
    } catch (error) {
      console.error("Error discovering movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query) => {
    setLoading(true);
    setSearchMode(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/movies/search",
        { query }
      );
      if (response.data.success) {
        setMovies(response.data.results || []);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <header className="bg-gradient-to-r from-gray-900 to-black text-white py-12 mb-8">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-3 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              Absolute Cinema
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              Choose the movie you want to watch in just 5 mins
            </p>
            <p className="text-sm text-gray-400">
              Discover • Filter • Watch • Enjoy
            </p>
          </div>
        </header>

        {/* Search */}
        <SearchBox onSearch={searchMovies} />

        {/* Filters (only show in discover mode) */}
        {!searchMode && <FilterBar onFilterChange={discoverMovies} />}

        {/* Results Info */}
        <div className="mb-4">
          <p className="text-gray-600">
            {searchMode ? "Search Results" : "Popular Movies"} ({movies.length}{" "}
            found)
          </p>
          {searchMode && (
            <button
              onClick={() => {
                setSearchMode(false);
                discoverMovies({});
              }}
              className="text-blue-500 hover:text-blue-700 text-sm mt-1"
            >
              ← Back to Browse
            </button>
          )}
        </div>

        {/* Movie List */}
        <MovieList movies={movies} loading={loading} />
      </div>
    </div>
  );
}

export default App;
