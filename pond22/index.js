const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static('public'));

const bucket = "Pokelist"

// Supabase setup
const supabase = createClient(
  'https://tmtxhmoxwgwgezkbjjhn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtdHhobW94d2d3Z2V6a2JqamhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MjA0MjU0MiwiZXhwIjoyMDA3NjE4NTQyfQ.TKYq-hQ2jEX9IzDLIXgwQr_2Gp3NXx91VP0k07JGWjU'
);

// Fetch all image records and render the HTML template
app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/getPokemon', async (req, res) => {
    const { data, error } = await supabase.storage.from(bucket).list();

    console.log(data);
    
    if (error) {
      return res.status(500).json({ error: 'Error fetching images' });
    }

    const array = ["a", "b", "c"];

    res.json(array);
});

// Create an image record
app.post('/postPokemon', async (req, res) => {
  try {
    console.log("POSTING: " + JSON.stringify(req.body));
    const { name, image } = req.body;
    const { data, error } = await supabase.storage.from(bucket).upload(image, name);

    res.json({ message: 'Pokemon posted successfully' });

  } catch (error) {
    console.error('Error:', error); // Log the error
    res.status(500).send({ error: 'Internal Server Error' });
}
});


// Edit image form
app.put('/putPokemon', async (req, res) => {
    console.log("PUTTING: " + req.body);
    const { name, image } = req.body;
    const { data, error } = await supabase.storage.from(bucket).update(image, name)
    
    if (error) {
      return res.status(404).json({ error: 'Image not found' });
    }
    
    res.redirect('/')

});

// Delete image record
app.delete('/deletePokemon', async (req, res) => {
    console.log("DELETING: " + req.body);
    const { name } = req.body;
    const { data, error } = await supabase.storage.from(bucket).remove(name);

    if (error) {
      return res.status(500).json({ error: 'Error deleting image' });
    }

    res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});