import { MongoClient } from "mongodb";
import process from "process";

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

let db;

async function connectDB() {
  try {
    const conn = await client.connect();
    db = conn.db("sample_training"); // Change "sample_training" to your actual database name
    console.log("MongoDB connected successfully");
    return db; // Return the connected database object
  } catch (e) {
    console.error("Failed to connect to MongoDB", e);
    throw e; // Rethrow the error so it can be handled elsewhere if needed
  }
}

export default connectDB;