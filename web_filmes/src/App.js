import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import axios from 'axios';

import Menu from './Components/Menu';
import Home from './Screen/Home';
import Movies from './Screen/Movies';
import Series from './Screen/Series';
import Footer from './Components/Footer/footer';
import DetalhesFilme from './Screen/PageMovie';
import DetalhesSerie from './Screen/PageSerie';
import ResultPage from './Screen/Results';
import Login from './Screen/Login/login';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const config = {
            headers: { Authorization: token },
          };
          const response = await axios.get('http://localhost:5000/verify', config);
          const { username } = response.data;
          setUsername(username);
        }
      } catch (error) {
        console.error('Erro ao verificar token', error);
      }
    };

    verifyToken();
  }, [isLoggedIn]);

  return (
    <div style={isLoading ? { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' } : {}}>
      {isLoading ? (
        <div className='Load'>
          {/* Aqui você pode colocar um indicador de carregamento, como um spinner */
          <PacmanLoader color="#f9ff00" />}
          <h1>Carregando...</h1>
        </div>
      ) : (
        <div>
          {/* Conteúdo do aplicativo após o carregamento */}
          <>
            <Router>
              <div>
                <Menu isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout} />
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/Movies" element={<Movies />} />
                  <Route path="/Series" element={<Series />} />
                  <Route path="/filme/:id" element={<DetalhesFilme />} />
                  <Route path="/serie/:id" element={<DetalhesSerie />} />
                  <Route path="/search/:query" element={<ResultPage />} />
                  <Route path="/login" element={<Login onLogin={handleLogin} />} />
                </Routes>
                <Footer />
              </div>
            </Router>
          </>
        </div>
      )}
    </div>
  );
}

export default App;
