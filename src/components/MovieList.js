import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../components/MovieGrid.css";
import { Star } from "lucide-react";
import { Heart } from "lucide-react";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    sortBy: "popularity.desc",
    special: ""
  }
);
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

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setGenres(data.genres))
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);

  useEffect(() => {
  setLoading(true);

  let url = "";

  if (filters.special === "christmas") {
    url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=christmas&language=en-US&page=1`;
  } else {
    const { genre, year, sortBy } = filters;
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=1&sort_by=${sortBy}`;
    if (genre) url += `&with_genres=${genre}`;
    if (year) url += `&primary_release_year=${year}`;
  }

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setMovies(data.results || []);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
      setLoading(false);
    });
}, [filters]);


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <p style={{ color: "white" }}>Loading movies...</p>;

  return (
    <div className="movie-section">
      <h1>Discover Movies</h1>

      <div className="filters">
        <select name="genre" value={filters.genre} onChange={handleFilterChange}>
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
          <select name="special" value={filters.special} onChange={handleFilterChange}>
            <option value="">All Movies</option>
            <option value="christmas">Christmas Movies</option>
          </select>

        <select name="year" value={filters.year} onChange={handleFilterChange}>
          <option value="">All Years</option>
          {Array.from({ length: 30 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return <option key={year} value={year}>{year}</option>;
          })}
        </select>

        <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
          <option value="popularity.desc">Most Popular</option>
          <option value="release_date.desc">Newest</option>
          <option value="release_date.asc">Oldest</option>
          <option value="vote_average.desc">Top Rated</option>
          <option value="revenue.desc">Highest Revenue</option>
        </select>
      </div>

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
