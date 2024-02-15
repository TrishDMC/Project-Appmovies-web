import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Results/style.css'

const ResultPage = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=8a78bbc2059ae1af9b5db720e9ee991d&query=${query}`
        );
        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <>
    <h2 className='title-results'>Results for "{query}":</h2>
    <div className="result-page">
      {results.map((result) => (
        <div className="result-card" key={result.id}>
          {result.poster_path && (
            <img
              className="result-image"
              src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
              alt={result.title || result.name}
            />
          )}
          <h3 className="result-title">{result.title || result.name}</h3>
        </div>
      ))}
    </div>
    </>
  );
};

export default ResultPage;
