const express = require('express'); // Import express module
const morgan = require('morgan'); // Import morgan module for logging

const { 
    client, 
    createTables,
    fetchCustomers,
    fetchRestaurants,
    fetchReservations,
    createReservation,
    destroyReservation
    } = require('./db'); // Import functions from db.js

const app = express(); // Create an instance of express
app.use(express.json()); // Middleware to parse JSON requests
app.use(morgan('dev')); // Use morgan for logging requests

const PORT = process.env.PORT || 3000; // Set the port for the server

// Initialize server and database connection
const init = async () => {
    try {
        console.log('Connecting to the database...'); 
        await client.connect(); // Connect to the database
        console.log('Connected to the database'); 
    
        app.listen(PORT, () => { 
                console.log(`Server is running on port ${PORT}`); // Log server start
        });
    } catch (error) {
        console.error('Server error:', error); // Log any errors
    }
};

init ();