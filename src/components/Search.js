import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "../components/MovieGrid.css";

export default function Search() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        query
      )}&page=1`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [query, API_KEY]);

  return (
    <div className="movie-section">
      <h1>Search Results for "{query}"</h1>

      {loading && <p>Loading...</p>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/MovieDetail/${movie.id}`} className="movie-card">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="no-image">No Image</div>
            )}
            <div className="movie-info">
              <h2>{movie.title}</h2>
              <p>⭐ {movie.vote_average}</p>
              <p>{movie.release_date}</p>
            </div>
          </Link>
        ))}
      </div>

      {!loading && movies.length === 0 && query && (
        <p>No results found for "{query}"</p>
      )}
    </div>
  );
}
