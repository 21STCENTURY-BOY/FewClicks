import { Link, useNavigate } from "react-router-dom";
import { Film, Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;


    navigate(`/search?query=${encodeURIComponent(query)}`);
    setQuery("");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Film />
          <span>FewClicks</span>
        </Link>

        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/MovieList">All Movies</Link>
          <Link to="/BestRated">Best Rated</Link>
          <Link to="/Favorites">Favorites</Link>
        </div>

        <form className="navbar-search" onSubmit={handleSearch}>
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>
    </nav>
  );
}
