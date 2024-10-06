import "./loadEnvironment.js";
import express from 'express';
import connectDB from './db/conn.js'; // Import the connectDB function

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware (if any)
app.use(express.json());

// Connect to MongoDB
(async () => {
  try {
    await connectDB(); // Wait for MongoDB connection before starting the server
    console.log('Database connected, starting the server...');

    // Start server after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.error('Failed to start the server due to DB connection issues', e);
    process.exit(1); // Exit the process if connection fails
  }
})();

// Example route
app.get('/', (req, res) => {
  res.send('API is working');
});

// Additional routes (if any)
