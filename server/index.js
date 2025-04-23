const express = require('express'); // Import express module
const morgan = require('morgan'); // Import morgan module for logging

const { 
    fetchCustomers,
    fetchRestaurants,
    fetchReservations,
    destroyReservation
    } = require('./db'); // Import functions from db.js

const app = express(); // Create an instance of express
app.use(express.json()); // Middleware to parse JSON requests
app.use(morgan('dev')); // Use morgan for logging requests

const PORT = process.env.PORT || 3000; // Set the port for the server

// Express routes
// Get all customers
app.get('/api/customers', async (req, res, next) => {
    try {
        const customers = await fetchCustomers();
        res.send(customers); // Send the customers as response
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
});

// Get all restaurants
app.get('/api/restaurants', async (req, res, next) => {
    try {
        const restaurants = await fetchRestaurants();
        res.send(restaurants); // Send the restaurants as response
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
});

// Get all reservations
app.get('/api/reservations', async (req, res, next) => {
    try {
        const reservations = await fetchReservations();
        res.send(reservations); // Send the reservations as response
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
});

// Delete a reservation
app.delete('/api/customers/:customer_id/reservations/:id', async (req, res, next) => {
    try {
        await destroyReservation(req.params.id, req.params.customer_id); // Delete the reservation
        res.sendStatus(204); // Send No Content status
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
});

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