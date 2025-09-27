import { Link } from "react-router-dom";
import "../components/MovieGrid.css";
import { Star } from "lucide-react";
import React, { useState } from "react";
import { Heart } from "lucide-react";

export default function Favorites() {
  
  const [favorites, setFavorites] = useState(() => {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    });   
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

  if (!favorites.length) return <p>No favorite movies yet!</p>;

  return (
    <div className="movie-grid">
      {favorites.map(movie => (
        <Link key={movie.id} to={`/MovieDetail/${movie.id}`} className="movie-card">
          <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
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
  );
}
