import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PhotoUpload from './pages/PhotoUpload'
import CreateAccountForm from "./pages/CreateAccount.jsx";
import SignInForm from "./pages/SignIn.jsx";
import {Route, Routes} from "react-router-dom";
import Status from './pages/Status.jsx';
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://johnlman1:FXm3h8qm1AllyzmE@stormhacks.i9q8l.mongodb.net/?retryWrites=true&w=majority&appName=Stormhacks";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<SignInForm />} />
                <Route path="/create" element={<CreateAccountForm />} />
                <Route path="/status" element={<Status />} />
                <Route path="/ticket" element={<PhotoUpload />} />
            </Routes>
        </>

    );
}

export default App
