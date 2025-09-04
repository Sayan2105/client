import React from "react";

const MovieCard = ({ movie }) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const imageUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : "https://via.placeholder.com/500x750/374151/ffffff?text=No+Image";

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden border border-gray-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-80 object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
            ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white line-clamp-2">
          {movie.title}
        </h3>

        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {year}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {movie.runtime || "N/A"} min
          </span>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
          {movie.overview
            ? movie.overview.substring(0, 120) + "..."
            : "No description available."}
        </p>

        <div className="flex gap-2">
          <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors">
            View Details
          </button>
          <button className="px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors">
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
