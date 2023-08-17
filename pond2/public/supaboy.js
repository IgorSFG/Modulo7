import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'


const url = "https://tmtxhmoxwgwgezkbjjhn.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtdHhobW94d2d3Z2V6a2JqamhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MjA0MjU0MiwiZXhwIjoyMDA3NjE4NTQyfQ.TKYq-hQ2jEX9IzDLIXgwQr_2Gp3NXx91VP0k07JGWjU"
const supabase = createClient(url, key)
const bucket = "Pokelist"

async function fetchPokemon() {
    const { data, error } = await supabase.storage.from(bucket).list();
    console.log(data);
}

async function sendPokemon(image64, name) {
    const { data, error } = await supabase.storage.from(bucket).upload(`${name}.png`, image64, {
        cacheControl: 3600,
        upsert: false,
    });
};

async function updatePokemon(image64, name) {
    const { data, error } = await supabase.storage.from(bucket).update(`${name}.png`, image64, {
        cacheControl: 3600,
        upsert: true,
    });
};

async function deletePokemon(name) {
    const { data, error } = await supabase.storage.from(bucket).remove(`${name}.png`);
};

// Get references to the buttons
const sendButton = document.getElementById("send");
const updateButton = document.getElementById("update");
const deleteButton = document.getElementById("delete");

// Add event listeners to the buttons
sendButton.addEventListener("click", () => Pokemon('send'));
updateButton.addEventListener("click", () => Pokemon('update'));
deleteButton.addEventListener("click", () => Pokemon('delete'));

function Pokemon(action) {
    console.log(action);
    const image_input = document.getElementById("image");
    const name = document.getElementById("name").value;
    
    if (image_input.files.length != 0 && name != "") {
      
        const file = image_input.files[0];
        const reader = new FileReader();
    
        if (file) {
            const base64Image = reader.result;
            console.log(file);

            if (action == "send") sendPokemon(file, name);
            else if (action == "update") updatePokemon(file, name);
        };

        if (action == "delete") deletePokemon(name);
    
        // if (file) {
        //     reader.readAsDataURL(file);
        // }
    };
};

window.addEventListener('load', () => {
    fetchPokemon();
});
  
