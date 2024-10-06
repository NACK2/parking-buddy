import "./loadEnvironment.js";
import express from 'express';
import connectDB from "./db/conn.js";
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 5050;

const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: 'GET, POST, PUT, DELETE', // Allow these methods
  allowedHeaders: 'Content-Type, Authorization', // Allow these headers
};

app.use(cors(corsOptions));
app.use(express.json())

let db;

// Connect to MongoDB
(async () => {
  try {
    db = await connectDB(); // Wait for MongoDB connection before starting the server
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

app.get('/users', async (req, res) => {
  try {
    const usersCollection = db.collection('Users'); // Ensure the collection name matches exactly
    const users = await usersCollection.find().toArray(); // Fetch all users as an array
    res.status(200).json([users]); // Send the users back as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

app.post("/users", async (req, res) => {
  console.log('Request body:', req.body); // Log the received body
  try {
    // Ensure request body is not undefined or null
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    let collection = await db.collection("Users");
    let newDocument = req.body;
    newDocument.date = new Date(); // Add date to the document
    let result = await collection.insertOne(newDocument);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error inserting document', error });
  }
});


app.get('/parking', async (req, res) => {
  try {
    const parkingCollection = db.collection('Parking Lots'); // Ensure the collection name matches exactly
    const parkingLots = await parkingCollection.find().toArray(); // Fetch all users as an array
    res.status(200).json([parkingLots]); // Send the users back as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

app.post("/parking", async (req, res) => {
  let collection = await db.collection("Parking Lots");
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

