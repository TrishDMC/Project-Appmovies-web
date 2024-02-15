import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Searchbar/style.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${query}`);
    setQuery('');
  };

  return (
    <form className='form-search' onSubmit={handleSubmit}>
      <input
        className='pesquisa'
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Pesquisar..."
      />
      <button className='btn-busca' type="submit">Buscar</button>
    </form>
  );
};

export default SearchBar;