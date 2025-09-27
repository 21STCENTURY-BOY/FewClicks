import React from 'react';
import '../styles/index.css';
import Navbar from '../components/Navbar';
import { Routes, Route } from "react-router-dom";
import MovieDetail from '../components/MovieDetail';
import MovieList from "../components/MovieList";
import Search from "../components/Search";
import BestRated from '../components/BestRated';
import PopularThisWeek from '../components/PopularThisWeek';
import Favorites from '../components/Favorites';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PopularThisWeek />} />
        <Route path="/MovieList" element={<MovieList />} />
        <Route path="/MovieDetail/:id" element={<MovieDetail />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/BestRated" element={<BestRated />} />
        <Route path="/Favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
