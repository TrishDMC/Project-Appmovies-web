import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../PageMovie/style.css';

const DetalhesFilme = () => {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);
  const [imagens, setImagens] = useState([]);

  useEffect(() => {
    const apiKey = '8a78bbc2059ae1af9b5db720e9ee991d';

    const fetchFilme = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`);
        setFilme(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchImagens = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`);
        setImagens(response.data.backdrops);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFilme();
    fetchImagens();
  }, [id]);

  if (!filme) {
    return <div>Carregando...</div>;
  }

  const { title, overview, poster_path } = filme;

  return (
    <div className="container">
      <div className="content">
        <div className="text">
          <h2 className="title">{title}</h2>
          <p className="overview">{overview}</p>
        </div>
        <div className="poster-container">
          <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={`Poster do filme ${title}`} className="poster" />
        </div>
      </div>
      <div className="image-slider">
        <h2>Imagens do filme</h2>
        <Carousel
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          centerMode={true}
          centerSlidePercentage={33.3333}
          autoPlay={false}
          emulateTouch={true}
          showIndicators={false}
        >
          {imagens.map((imagem) => (
            <div key={imagem.file_path} className="custom-slide">
              <img src={`https://image.tmdb.org/t/p/w500${imagem.file_path}`} alt={`Imagem do filme ${title}`} className="backdrop" />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default DetalhesFilme;
