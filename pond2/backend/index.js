const { createClient } = require('@supabase/supabase-js');
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require("path")
const app = express();
const PORT = 3000;
const secretKey = 'your-secret-key';

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"../frontend")));

const table = "Users";
const supabase = createClient(
    "https://tmtxhmoxwgwgezkbjjhn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtdHhobW94d2d3Z2V6a2JqamhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MjA0MjU0MiwiZXhwIjoyMDA3NjE4NTQyfQ.TKYq-hQ2jEX9IzDLIXgwQr_2Gp3NXx91VP0k07JGWjU"
);

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

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../frontend/pages/', 'login.html');
  res.sendFile(filePath);
});

app.post('/login', async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const { data, error } = await supabase.from(table).select();
  const user = data.find(u => u.username === username && u.password === password);

  if (!user) return res.sendStatus(404);

  console.log(user);
  const token = generateToken(user);
  res.cookie('token', token, { httpOnly: true });
  res.json({ token });
});

app.get('/pokelist', authenticateToken, (req, res) => {
  const filePath = path.join(__dirname, '../frontend/pages/', 'pokelist.html');
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});