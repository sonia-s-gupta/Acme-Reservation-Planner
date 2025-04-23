const {
    client,
    createTables,
    createCustomer,
    createRestaurant,
    createReservation
} = require('.server/db'); // Import functions from db.js

const seed = async () => {
    try {
        console.log('Connecting to the database...');
        await client.connect(); // Connect to the database
        console.log('Connected to the database');

        await createTables(); // Create tables in the database
        console.log('Tables created');

        // Create customers and restaurants
        const [Michael, Jim, Dwight, Pam, Chilis, Sbarro, Ihop] = await Promise.all([ 
            createCustomer({ name: 'Michael'}),
            createCustomer({ name: 'Jim'}),
            createCustomer({ name: 'Dwight'}),
            createCustomer({ name: 'Pam'}),
            createRestaurant({ name: 'Chilis'}),
            createRestaurant({ name: 'Sbarro'}),
            createRestaurant({ name: 'Ihop'}),
        ]);
        console.log('Customers and Restaurants created');

        // Create reservations
        const [reservation1, reservation2] = await Promise.all([
            createReservation({
                reservation_date: '2025-01-01',
                party_count: 4,
                customer_id: Michael.id,
                restaurant_id: Chilis.id
            }),
            createReservation({
                reservation_date: '2025-02-14',
                party_count: 2,
                customer_id: Jim.id,
                restaurant_id: Sbarro.id
            }),
        ]);
        console.log('Reservations created');

    } catch (error) {
        console.error('Error seeding data:', error); // Log any errors
    } finally {
        await client.end(); // Close the database connection
        console.log('Database connection closed');
    }
};

seed(); // Call the seed function to execute the seeding process