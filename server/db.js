const pg = require('pg'); // Import pg module
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_reservation_planner'); // Create a new client instance
const uuid = require('uuid'); // Import uuid module

const createTables = async () => {
    const SQL = `
    DROP TABLE IF EXISTS reservations;
    DROP TABLE IF EXISTS customers;
    DROP TABLE IF EXISTS restaurants;
    
    CREATE TABLE customers(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL UNIQUE
    );
    CREATE TABLE restaurants(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL UNIQUE
    );
    CREATE TABLE reservations(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        reservation_date DATE NOT NULL, 
        party_count INTEGER NOT NULL,
        customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
        restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE
    );
    `;
    await client.query(SQL); // Execute the SQL commands
};

const createCustomer = async(name) => {
    const SQL = `
    INSERT INTO customers(id, name) VALUES($1, $2) RETURNING *
    `;
    const response = await client.query(SQL, [uuid.v4(), name]);
    return response.rows[0]; // Return the created customer
};

const createRestaurant = async(name) => {
    const SQL = `
    INSERT INTO restaurants(id, name) VALUES($1, $2) RETURNING *
    `;
    const response = await client.query(SQL, [uuid.v4(), name]);
    return response.rows[0]; // Return the created restaurant
};

const createReservation = async({ reservation_date, party_count, customer_id, restaurant_id}) => {
    const SQL = `
    INSERT INTO reservations(reservation_date, party_count, customer_id, restaurant_id) 
    VALUES($1, $2, $3, $4) RETURNING *
    `;
    const response = await client.query(SQL, [reservation_date, party_count, customer_id, restaurant_id]);
    return response.rows[0]; // Return the created reservation
};

const fetchCustomers = async () => {
    const SQL = `SELECT * FROM customers`;
    const response = await client.query(SQL);
    return response.rows; // Return all customers
};

const fetchRestaurants = async () => {
    const SQL = `SELECT * FROM restaurants`;
    const response = await client.query(SQL);
    return response.rows; // Return all restaurants
};

const fetchReservations = async () => {
    const SQL = `SELECT * FROM reservations`;
    const response = await client.query(SQL);
    return response.rows; // Return all reservations
};

const destroyReservation = async (reservation_id, customer_id) => {
    const SQL = `
    DELETE FROM reservations WHERE id = $1 and customer_id = $2;
    `;
    await client.query(SQL, [reservation_id, customer_id]); // Delete the reservation
};

module.exports = {
    client, 
    createCustomer, 
    createRestaurant,
    createReservation,
    fetchCustomers,
    fetchRestaurants,
    fetchReservations, 
    destroyReservation
}; // Export the client instance and functions
