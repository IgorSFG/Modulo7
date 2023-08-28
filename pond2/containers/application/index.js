const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 5000;
const secretKey = 'MySecretKey';

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/frontend')));


// Generate JWT token for a user
function generateToken(user) {
  return jwt.sign({ user_id: user.user_id, username: user.username, userpassword: user.userpassword }, secretKey, { expiresIn: '1m' });
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
  const filePath = path.join(__dirname, '/frontend/pages', 'login.html');
  res.sendFile(filePath);
});

app.post('/login', async (req, res) => {
  console.log(req.body);
  const { username, userpassword } = req.body;
  
  const rows = await db.getUser(username, userpassword);

  if (rows.length < 1) return res.sendStatus(404);

  const user = rows[0];
  console.log(user);
  const token = generateToken(user);
  res.cookie('token', token, { httpOnly: true });
  res.json({ token });
});

app.get('/pokelist', authenticateToken, (req, res) => {
  const filePath = path.join(__dirname, '/frontend/pages', 'pokelist.html');
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
