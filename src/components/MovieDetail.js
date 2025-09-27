import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../components/MovieDetail.module.css";
import { Star } from "lucide-react";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    if (!id) return;

    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id, API_KEY]);

  if (loading) return <p>Loading movie details...</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className={styles["movie-detail-container"]}>
      <div className={styles["movie-poster"]}>
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <div className="no-poster">No Image</div>
        )}
      </div>

      <div className={styles["movie-info"]}>
        <h1>{movie.title}</h1>
        <Star size={16} className={styles["star-icon"]} /> {movie.vote_average.toFixed(1)}
        <p className={styles["release-date"]}>Release: {movie.release_date}</p>
        <p className={styles["overview"]}>{movie.overview}</p>
        {movie.genres && (
          <p className={styles["genres"]}>
            Genres: {movie.genres.map((g) => g.name).join(", ")}
          </p>
        )}
        <p className={styles["runtime"]}>Runtime: {movie.runtime} min</p>
      </div>
    </div>
  );
}
