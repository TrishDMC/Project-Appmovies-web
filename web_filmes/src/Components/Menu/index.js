import '../Menu/style.css'
import SearchBar from '../Searchbar';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import axios from 'axios';

function Menu({ isLoggedIn, username, handleLogout }) {
  const location = useLocation();

  const handleLogoutClick = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const config = {
          headers: { Authorization: token },
        };
        await axios.get('http://localhost:5000/logout', config);
        localStorage.removeItem('token');
        handleLogout();
        console.log('Logout bem-sucedido');
      }
    } catch (error) {
      console.error('Erro ao fazer logout', error);
    }
  };
  if (location.pathname === '/login') {
    return null; // Não renderizar o menu
  }

  return (
    <div className="navbar">
      <nav>
        <ul>
          <li><Link to="/">Ínicio</Link></li>
          <li><Link to="/Movies">Filmes</Link></li>
          <li className='btn-series'><Link to="/Series">Series</Link></li>
          <li><SearchBar /></li>
          <li className="login-section">
            {isLoggedIn ? (
              <>
                <span>{`Bem-vindo, ${username}`}</span>
                <button className='btn-logout' onClick={handleLogoutClick}>Sair</button>
              </>
            ) : (
              <Link className='login' to="/login">Entrar</Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;  