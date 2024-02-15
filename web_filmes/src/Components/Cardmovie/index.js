import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Cardmovie/style.css';

const MovieList = () => { 
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const apiKey = '8a78bbc2059ae1af9b5db720e9ee991d';
  
  const getMovies = async (page) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`);
    return response.data.results;
  };

  const loadMovies = async () => {
    const newMovies = await getMovies(currentPage);
    setMovies([...movies, ...newMovies]);
  };

  const handleScroll = () => {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if (scrolledToBottom) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);// eslint-disable-next-line 
  }, []); 

  useEffect(() => {
    loadMovies(); // eslint-disable-next-line 
  }, [currentPage]);

  const handleMovieClick = (id) => {
    navigate(`/filme/${id}`);
  };

  return (
      <>
      <h2 className="titulo-movies">Filmes Populares</h2>
      <div className='content-movies'>
      <ul className="lista-movies-colunas-5">
        {movies.map((movie) => (
          <li key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`Poster do filme ${movie.title}`}
              onClick={() => handleMovieClick(movie.id)}
            />
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default MovieList;
