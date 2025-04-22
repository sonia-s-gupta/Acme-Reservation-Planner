const pg = require('pg'); // Import pg module
const express = require('express'); // Import express module

const { client } = require('./db'); // Import the database client
const app = express(); // Create an instance of express

const PORT = process.env.PORT || 3000; // Set the port for the server

const init = async () => {
    console.log('Connecting to the database...'); // Log connection attempt
    await client.connect(); // Connect to the database
    console.log('Connected to the database'); // Log connection success
    app.listen(PORT, () => { 
        console.log(`Server is running on port ${PORT}`); // Log server start
    });
}

init ();