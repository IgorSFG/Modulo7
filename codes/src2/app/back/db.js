const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

/////////////////////////////// User Table ///////////////////////////////

// Create table
async function createUserTable() {
    const userTable = `CREATE TABLE IF NOT EXISTS Users (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      userpassword VARCHAR(50) NOT NULL
    )`;
  
    try {
      await pool.query(userTable);
      console.log('Created "Users" table');
    } catch (error) {
      console.error('Error creating "Users" table:', error);
      throw error;
    }
}

// Insert
async function insertUser(username='teste', userpassword='teste123') {
    const insert = `INSERT INTO Users (username, userpassword) VALUES ($1, $2)`;
    const values = [username, userpassword];
    
    try {
        await pool.query(insert, values);
        console.log('User inserted');
    } catch (error) {
      console.error('Error inserting user:', error);
      throw error;
    }
}

// Read
async function getUser(username, userpassword) {
    const get = 'SELECT * FROM Users WHERE username = $1 AND userpassword = $2';
    const values = [username, userpassword];
  
    try {
      const result = await pool.query(get, values);
      console.log('User fetched');
      return result.rows;
    } catch (error) {
      console.error('Error fetching Users: ', error);
      throw error;
    }
}
  
// Update
async function updateUser(user_id, updates) {
    const { username, userpassword } = updates;
    const update = 'UPDATE Users SET username = $2, userpassword = $3 WHERE user_id = $1';
    const values = [user_id, username, userpassword];
  
    try {
      const result = await pool.query(update, values);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Error updating Users: ', error);
      throw error;
    }
}
  
// Delete
async function deleteUser(user_id) {
    const delet = 'DELETE FROM Users WHERE user_id = $1';
  
    try {
      const result = await pool.query(delet, user_id);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
}

/////////////////////////////// Poke Table ///////////////////////////////

// Create table
async function createPokeTable() {
    const pokeTable = `CREATE TABLE IF NOT EXISTS Poke (
      poke_id SERIAL PRIMARY KEY,
      pokename VARCHAR(50) UNIQUE NOT NULL,
      pokeimage VARCHAR(50) NOT NULL,
      user_id INT REFERENCES users(user_id) ON DELETE CASCADE
    )`;

    try {
        await pool.query(pokeTable);
        console.log('Created "Poke" table');
    } catch (error) {
        console.error('Error creating "Poke" table:', error);
        throw error;
    }
}

async function insertPoke(pokename, pokeimage) {
    const insert = `INSERT INTO Poke (pokename, pokeimage) VALUES ($1, $2)`;
    const values = [pokename, pokeimage];
    
    try {
        await pool.query(insert, values);
        console.log('Pokemon inserted');
    } catch (error) {
        console.error('Error inserting pokemon:', error);
        throw error;
    }
}

async function getPoke(pokename=0, pokeimage=0) {
    if (pokename == 0 || pokeimage == 0) {
        const get = 'SELECT * FROM Poke'
        
        try {
            const result = await pool.query(get);
            console.log('All Pokemons fetched');
            return result.rows
        } catch (error) {
            console.error('Error fetching all pokemons:', error);
            throw error;
        }
    } else {
        const get = 'SELECT * FROM Poke WHERE pokename = $1 AND pokeimage = $2';
        const values = [pokename, pokeimage];
        
        try {
            const result = await pool.query(get, values);
            console.log('Pokemon fetched');
        } catch (error) {
            console.error('Error fetching pokemon:', error);
            throw error;
        }
    }
}

async function updatePoke(user_id, pokename) {
    const update = 'UPDATE Poke SET pokename = $2 WHERE id = $1';
    const values = [user_id, pokename];

    try {
        await pool.query(update, values);
        console.log('Pokemon updated');
    } catch (error) {
        console.error('Error updating pokemon:', error);
        throw error;
    }
}

async function deletePoke(user_id) {
    const delet = 'DELETE FROM Poke WHERE user_id = $1';

    try {
        await pool.query(delet, user_id);
        console.log('Pokemon deleted');
    } catch (error) {
        console.error('Error deleting pokemon:', error);
        throw error;
    }
}



  
module.exports = {
    createUserTable,
    insertUser,
    getUser,
    updateUser,
    deleteUser,

    createPokeTable,
    insertPoke,
    getPoke,
    updatePoke,
    deletePoke
};