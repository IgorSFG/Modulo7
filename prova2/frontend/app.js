const express = require('express');
const path = require('path')

const app = express();
const PORT = 5000;

app.use(express.static(__dirname));

app.get('/', async (req, res) => {
    const filePath = path.join(__dirname, 'login.html');
    res.sendFile(filePath);
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });