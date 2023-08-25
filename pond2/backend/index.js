const { Pool } = require('pg');
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = 3000;
const secretKey = 'your-secret-key';

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend')));

const client = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'todoapp',
  password: 'postgres',
  port: 5432,
});

async function createUserTable(client) {
  const userTable = `CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    usr VARCHAR(50) UNIQUE NOT NULL,
    pwd VARCHAR(50) NOT NULL
  )`;

  try {
    await client.query(userTable);
    console.log('Created "Users" table');
  } catch (error) {
    console.error('Error creating "Users" table:', error);
    throw error;
  }

  // const insertTest = `INSERT INTO Users (usr, pwd) VALUES ($1, $2)`;
  // await client.query(insertTest, ['test', 'test123']);
  // console.log('Test user inserted');
}


// Generate JWT token for a user
function generateToken(user) {
  return jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
}

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

app.get('/', async (req, res) => {
  createUserTable(client);
  const filePath = path.join(__dirname, '../frontend/pages', 'login.html');
  res.sendFile(filePath);
});

app.post('/login', async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  
  // Query the database to check if the user exists
  const query = `SELECT * FROM Users WHERE usr = $1 AND pwd = $2`;
  const { rows } = await client.query(query, [username, password]);

  if (rows.length === 0) {
    return res.sendStatus(404);
  }

  const user = rows[0];
  const token = generateToken(user);
  res.cookie('token', token, { httpOnly: true });
  res.json({ token });
});

app.get('/pokelist', authenticateToken, (req, res) => {
  const filePath = path.join(__dirname, '../frontend/pages', 'pokelist.html');
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
