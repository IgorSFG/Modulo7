const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/frontend/login.html');
});

app.get('/pokelist', (req, res) => {
  res.sendFile(__dirname + '/public/frontend/pokelist.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});