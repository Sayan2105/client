import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import FilterBar from "./components/FilterBar";
import MovieList from "./components/MovieList";
import "./index.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]); // Store all movies for random selection
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
        const movieResults = response.data.results || [];
        setMovies(movieResults);
        setAllMovies(movieResults); // Store for random selection
      }
    } catch (error) {
      console.error("Error discovering movies:", error);
      setMovies([]);
      setAllMovies([]);
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
        const movieResults = response.data.results || [];
        setMovies(movieResults);
        setAllMovies(movieResults); // Store for random selection
      }
    } catch (error) {
      console.error("Error searching movies:", error);
      setMovies([]);
      setAllMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Add this function for random movie selection
  const getRandomMovie = () => {
    if (allMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * allMovies.length);
      setMovies([allMovies[randomIndex]]);
    } else {
      // If no movies loaded, fetch some first
      discoverMovies({}).then(() => {
        if (allMovies.length > 0) {
          const randomIndex = Math.floor(Math.random() * allMovies.length);
          setMovies([allMovies[randomIndex]]);
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark: bg-neutral-950">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <header className="bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white py-12 mb-8 rounded-lg mx-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              🎬 Absolute Cinema
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
        <SearchBox onSearch={searchMovies} onRandomMovie={getRandomMovie} />

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
