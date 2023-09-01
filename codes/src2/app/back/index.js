const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./db');
const { generateToken, authenticateToken } = require('./jwt');

const app = express();
const PORT = 5000;
const secretKey = 'MySecretKey';
const pokeUrl = "https://pokeapi.co/api/v2/pokemon/"

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../front')));

app.get('/get-poke', async (req, res) => {
  const rows = db.getPoke();

  if (rows.length < 1) return res.sendStatus(404);

  res.json(rows)
})

app.post('/post-poke', async (req, res) => {
  console.log(req.body)
  const { pokename } = req.body;
  try {
    const apiResponse = await axios.get(pokeUrl+pokename);
    const pokemonData = apiResponse.data;

    await db.insertPoke(pokemonData.name, pokemonData.sprites.front_default)

  } catch (error) {
    res.status(404).send('Pokemon not found');
  }
});

app.put('/put-poke/:id/:pokename', async (req, res) => {
  const { id, pokename } = req.params;

  db.updatePoke(id, pokename);

  
})

app.get('/pokedex', (req, res) => {
  const filePath = path.join(__dirname, '../front/pages', 'pokedex.html');
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

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../front/pages', 'login.html');
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});