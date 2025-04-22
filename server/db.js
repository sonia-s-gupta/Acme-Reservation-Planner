const pg = require('pg'); // Import pg module
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_reservation_planner'); // Create a new client instance

module.exports = {
    client
}; // Export the client instance