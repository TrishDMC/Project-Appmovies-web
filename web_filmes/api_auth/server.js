const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Configuração da conexão com o banco de dados
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

// Rota para registro (signup)
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Hash da senha
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Verificar a existência da tabela
  pool.query(
    `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    )`,
    (err, result) => {
      if (err) {
        console.error('Erro ao criar tabela no banco de dados', err);
        res.status(500).json({ error: 'Erro ao registrar usuário' });
      } else {
        // Inserir informações do usuário no banco de dados
        pool.query(
          'INSERT INTO users (username, password) VALUES ($1, $2)',
          [username, hashedPassword],
          (err, result) => {
            if (err) {
              console.error('Erro ao inserir usuário no banco de dados', err);
              res.status(500).json({ error: 'Erro ao registrar usuário' });
            } else {
              res.status(201).json({ message: 'Usuário registrado com sucesso!' });
            }
          }
        );
      }
    }
  );
});

// Rota para login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Buscar informações do usuário no banco de dados
  pool.query(
    'SELECT * FROM users WHERE username = $1',
    [username],
    (err, result) => {
      if (err) {
        console.error('Erro ao buscar usuário no banco de dados', err);
        res.status(500).json({ error: 'Erro ao fazer login' });
      } else {
        if (result.rows.length > 0) {
          const user = result.rows[0];
          bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
            if (bcryptErr) {
              console.error('Erro ao comparar senhas', bcryptErr);
              res.status(500).json({ error: 'Erro ao fazer login' });
            } else if (bcryptResult) {
              const token = jwt.sign({ username }, 'chave-secreta', {
                expiresIn: '1h',
              });
              res.json({ token });
            } else {
              res.status(401).json({ error: 'Credenciais inválidas' });
            }
          });
        } else {
          res.status(401).json({ error: 'Usuário não encontrado' });
        }
      }
    }
  );
});

// Rota para verificar o token
app.get('/verify', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, 'chave-secreta', (err, decoded) => {
    if (err) {
      res.status(401).json({ error: 'Token inválido' });
    }

    res.json({ message: 'Token válido', username: decoded.username });
  });
});

// Rota para logout
app.get('/logout', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ error: 'Token não fornecido' });
  }

  res.json({ message: 'Logout bem-sucedido' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Servidor iniciado`);
});
