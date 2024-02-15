import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../MovieCarousel/style.css'

function MovieCarousel() {
  const [movies, setMovies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovies() {
      const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
        params: {
          api_key: '8a78bbc2059ae1af9b5db720e9ee991d',
          language: 'pt-BR',
          page: 1
        }
      });
      setMovies(response.data.results);
    }

    fetchMovies();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    variableWidth: true,
    slidesToShow: 1,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          variableWidth: false,
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          variableWidth: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const handleMovieClick = (id) => {
    navigate(`/filme/${id}`);
  };

  return (
    <>
    <div className="movie-carousel-container">
      <h2 className="carousel-title">Filmes populares</h2>
      <Slider {...settings} className="slider-container">
        {movies.map((movie) => (
          <div key={movie.id} className="slide">
            <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} 
            alt={movie.title} className="movie-poster"
            onClick={() => handleMovieClick(movie.id)} />
          </div>
        ))}
      </Slider>
    </div>
    </>
  );
}

export default MovieCarousel;
