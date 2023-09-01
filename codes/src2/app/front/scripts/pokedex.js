function Elements(pokemons) {
    const pokeGallery = document.getElementById('data-list');
    pokemons.forEach(pokemon => {
        console.log(pokemon);
        const { poke_id, pokename, pokeimage } = pokemon

        const imageContainer = document.createElement('div'); // Create a container div
        imageContainer.classList.add('image-container'); // Add a CSS class for styling
        
        const imageElement = document.createElement('img');
        imageElement.src = pokeimage;
        imageElement.alt = pokename;
        
        const nameElement = document.createElement('p'); // Create a paragraph for the name
        nameElement.textContent = pokename;
        nameElement.contentEditable = false;
        nameElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const newName = event.target.textContent;
                console.log(newName);
                if (newName !== pokename) updatePokemon(poke_id, newName);
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
        deleteButton.addEventListener('click', () => deletePokemon(poke_id));
        
        imageContainer.appendChild(deleteButton); // Append the delete button
        imageContainer.appendChild(updateButton); // Append the update button
        imageContainer.appendChild(imageElement); // Append the image to the container
        imageContainer.appendChild(nameElement); // Append the name to the container
        
        pokeGallery.appendChild(imageContainer); // Append the container to the gallery
    });
}

async function fetchPokemon() {
    fetch('/get-poke', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
          }
      })
      .then((response) => {
        if (response.ok) {
          Elements(response);
        } else {
          console.error('GET Pokemon failed');
          alert(' GET Pokemon failed');
        }
      })
};

async function updatePokemon(id, newName) {
    fetch(`/update-poke/${id}/${newName}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
            }
    })
    .then((response) => {
        if (response.ok) {
            window.location.reload();
        } else {
            console.error('UPDATE Pokemon Failed!');
            alert('UPDATE Pokemon Failed!')
        }
    })
}

async function deletePokemon(id) {
    fetch(`/delete-poke/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            }
    })
    .then((response) => {
        if (response.ok) {
            window.location.reload();
        } else {
            console.error('DELETE Pokemon Failed!');
            alert('DELETE Pokemon Failed!')
        }
    })
};

const sendButton = document.getElementById("send");
sendButton.addEventListener("click", () => postPokemon());

function postPokemon() {
    const pokename = document.getElementById("name").value;
    
    fetch('/post-poke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({ pokename: pokename })
      })
      .then((response) => {
        if (response.ok) {
          fetchPokemon();
        } else {
          console.error('Pokemon failed');
          alert('Pokemon failed');
        }
      })
};

window.addEventListener('load', () => {
    fetchPokemon();
});
  
