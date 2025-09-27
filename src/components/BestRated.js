import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../components/MovieGrid.css";
import { Star } from "lucide-react";
import { Heart } from "lucide-react";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

export default function BestRated() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    });
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching top rated movies:", error);
        setLoading(false);
      });
  }, []);
  const isFavorite = (id) => favorites.some(fav => fav.id === id);

const toggleFavorite = (movie) => {
  let updated;
  if (isFavorite(movie.id)) {
    updated = favorites.filter(fav => fav.id !== movie.id);
  } else {
    updated = [...favorites, movie];
  }
  setFavorites(updated);
  localStorage.setItem("favorites", JSON.stringify(updated));
};
  if (loading) return <p style={{ color: "white" }}>Loading movies...</p>;

  return (
    <div className="movie-section">
      <h1>Best Rated Movies of All Time</h1>
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
              <Star size={16} className="star-icon" /> {movie.vote_average.toFixed(1)}
              <button 
                className="favorite-btn"

                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavorite(movie);
                }}
              >
                {isFavorite(movie.id) ? <Heart color="red" /> : <Heart />}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
