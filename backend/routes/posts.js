import { db } from '../db/conn.js'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');

router.get('/', async (req, res) => {
    try {
      // Find all documents in the "items" collection
      const items = await User.find();  // No filter means it will return everything
      res.json(items);  // Send the found documents as JSON
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Add a new document to the collection
router.post("/", async (req, res) => {
    let collection = await db.collection("Users");
    let newDocument = req.body;
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  });