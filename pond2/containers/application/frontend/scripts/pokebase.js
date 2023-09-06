import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const bucket = "Pokelist";
const supabase = createClient(
    "https://tmtxhmoxwgwgezkbjjhn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtdHhobW94d2d3Z2V6a2JqamhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MjA0MjU0MiwiZXhwIjoyMDA3NjE4NTQyfQ.TKYq-hQ2jEX9IzDLIXgwQr_2Gp3NXx91VP0k07JGWjU"
);

async function fetchPokemon() {
    const imageGallery = document.getElementById('data-list');

    const { data, error } = await supabase.storage.from(bucket).list();

    for (let i = 0; i < data.length; i++) {
        const pokemon = data[i];
        console.log(pokemon);
        
        const pokeData = await supabase.storage.from(bucket).getPublicUrl(pokemon.name);
        const pokeUrl = pokeData.data.publicUrl;
        console.log(pokeUrl);
        
        const imageContainer = document.createElement('div'); // Create a container div
        imageContainer.classList.add('image-container'); // Add a CSS class for styling
        
        const imageElement = document.createElement('img');
        imageElement.src = pokeUrl;
        imageElement.alt = pokemon.name;
        
        const nameElement = document.createElement('p'); // Create a paragraph for the name
        nameElement.textContent = pokemon.name;
        nameElement.contentEditable = false;
        nameElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const newName = event.target.textContent;
                console.log(newName);
                if (newName !== pokemon.name) updatePokemon(pokemon.name, newName);
            }
        });

        const updateButton = document.createElement('button'); // Create an update button
        updateButton.textContent = 'Rename';
        updateButton.addEventListener('click', () => {
            nameElement.contentEditable = !nameElement.isContentEditable;
            nameElement.focus();
        });

        const deleteButton = document.createElement('button'); // Create a delete button
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deletePokemon(pokemon.name));
        
        imageContainer.appendChild(deleteButton); // Append the delete button
        imageContainer.appendChild(updateButton); // Append the update button
        imageContainer.appendChild(imageElement); // Append the image to the container
        imageContainer.appendChild(nameElement); // Append the name to the container
        
        imageGallery.appendChild(imageContainer); // Append the container to the gallery
    };
};

async function sendPokemon(image, name) {
    const { data, error } = await supabase.storage.from(bucket).upload(name, image);
    if (data) window.location.reload();
};

async function updatePokemon(oldName, newName) {
    const { data, error } = await supabase.storage.from(bucket).copy(oldName, newName);
    if (!error) {
        console.log(`Name updated from ${oldName} to ${newName}`);
    } else {
        console.error(`Error updating name: ${error.message}`);
    }
    deletePokemon(oldName);
}

async function deletePokemon(name) {
    const { data, error } = await supabase.storage.from(bucket).remove(name);
    if (data) window.location.reload();
};

const sendButton = document.getElementById("send");
sendButton.addEventListener("click", () => Pokemon('send'));

function Pokemon(action) {
    console.log(action);
    const image_input = document.getElementById("image");
    const name = document.getElementById("name").value;
    
    if (image_input.files.length != 0 && name != "") {
      
        const file = image_input.files[0];
    
        if (file) {
            console.log(file);
            sendPokemon(file, name);
        };
    };
};

window.addEventListener('load', () => {
    fetchPokemon();
});
  
