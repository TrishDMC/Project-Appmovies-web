import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Cardseries/style.css'

const SerieList = () => { 
  const [series, setSeries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const apiKey = '8a78bbc2059ae1af9b5db720e9ee991d';
  
  const getSeries = async (page) => {
    const response = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${page}`);
    return response.data.results;
  }

  const loadSeries = async () => {
    const newSeries = await getSeries(currentPage);
    setSeries([...series, ...newSeries]);
  }
// eslint-disable-next-line
  const handleScroll = () => {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if (scrolledToBottom) {
      setCurrentPage(currentPage + 1);
    }
  }
 
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  

  useEffect(() => {
    loadSeries(); // eslint-disable-next-line
  }, [currentPage]);

  const handleMovieClick = (id) => {
    navigate(`/serie/${id}`);
  };


  return (
    <>
    <h2 className='titulo-series'>Series Populares</h2>
    <div className='content-series'>
      <ul className="lista-series-colunas-5">
        {series.map((serie) => (
          <li key={serie.id}>
          <img src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} 
          alt={`Poster da serie ${serie.title}`}
          onClick={() => handleMovieClick(serie.id)}
          />
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default SerieList;
