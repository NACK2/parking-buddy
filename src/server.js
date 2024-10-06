// server.js

const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 5000;

const uri = "mongodb+srv://johnlman1:FXm3h8qm1AllyzmE@stormhacks.i9q8l.mongodb.net/?retryWrites=true&w=majority&appName=Stormhacks";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(cors());
app.use(express.json());

app.get('/ping', async (req, res) => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    res.send("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    res.status(500).send("Failed to connect to MongoDB");
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});