import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../PageSerie/style.css';

const DetalhesSerie = () => {
  const { id } = useParams();
  const [serie, setSerie] = useState(null);
  const [imagens, setImagens] = useState([]);

  useEffect(() => {
    const apiKey = '8a78bbc2059ae1af9b5db720e9ee991d';

    const fetchSerie = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=pt-BR`);
        setSerie(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchImagens = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/images?api_key=${apiKey}`);
        setImagens(response.data.backdrops);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSerie();
    fetchImagens();
  }, [id]);

  if (!serie) {
    return <div>Carregando...</div>;
  }

  const { name, overview, poster_path } = serie;

  return (
    <div className="container">
      <div className="content">
        <div className="text">
          <h2 className="title">{name}</h2>
          {overview ? <p className="overview">{overview}</p> : <p>Não há uma visão geral disponível.</p>}
        </div>
        <div className="poster-container">
          <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={`Poster da Série ${name}`} className="poster" />
        </div>
      </div>
      <div className="image-slider">
        <h2>Imagens da Série</h2>
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
              <img src={`https://image.tmdb.org/t/p/w500${imagem.file_path}`} alt={`Imagem da Série ${name}`} className="backdrop" />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default DetalhesSerie;
