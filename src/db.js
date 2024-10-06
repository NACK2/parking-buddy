// db.js
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://johnlman1:FXm3h8qm1AllyzmE@stormhacks.i9q8l.mongodb.net/?retryWrites=true&w=majority&appName=Stormhacks";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let isConnected = false;

export const connectToDatabase = async () => {
  if (!isConnected) {
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      isConnected = true;
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
};

export const getClient = () => {
  return client;
};