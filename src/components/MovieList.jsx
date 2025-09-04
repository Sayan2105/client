import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">🎬 Finding amazing movies...</p>
        </div>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🎭</div>
        <h3 className="text-2xl font-bold text-gray-700 mb-2">
          No movies found
        </h3>
        <p className="text-gray-500 text-lg">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
