const MovieCard = ({ movie }) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const imageUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-bold">
          ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
        </div>
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <button className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold transition-colors">
              Watch Now
            </button>
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-800">
          {movie.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          📅{" "}
          {movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : "TBA"}
        </p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-500 text-sm">
            👥 {movie.vote_count} votes
          </span>
          <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
            {movie.original_language?.toUpperCase()}
          </span>
        </div>
        {movie.overview && (
          <p className="text-gray-700 text-sm line-clamp-3">{movie.overview}</p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
