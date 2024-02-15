import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Login/style.css'

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      onLogin();
      console.log('Login bem-sucedido')
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer login', error);
      // Trate o erro de acordo com sua necessidade
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="container-login">
      <h2 className='titulo-pagina'>Entrar</h2>
      <form className='form-login' onSubmit={handleLogin}>
        <div>
          <label className='lb-usr' htmlFor="username">Usuário:</label>
          <input className='input-usr' type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label className='lb-psw' htmlFor="password">Senha:</label>
          <input className='input-psw' type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className='btn-login' type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
