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
        name VARCHAR(100) NOT NULL UNIQUE,
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

}


module.exports = {
    client, 
    createCustomer, 
    createRestaurant
}; // Export the client instance