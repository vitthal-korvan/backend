// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// --- MIDDLEWARE ---
app.use(express.json()); // Allows us to parse JSON sent from frontend
app.use(cors()); // Allows frontend (port 5173) to access backend (port 3001)

// --- DATABASE CONNECTION ---
// Connect to a local MongoDB database named "mern-test"
mongoose.connect('mongodb+srv://korvanvitthal:mBqlyhnl9xJYbAvP@cluster0.mqurdww.mongodb.net/fullstack')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));

// --- SCHEMA & MODEL ---
// This defines what our data looks like
const ItemSchema = new mongoose.Schema({
  name: String
});

const ItemModel = mongoose.model("items", ItemSchema);

// --- ROUTES (API ENDPOINTS) ---

// 1. GET Request: Fetch all items
app.get('/getItems', async (req, res) => {
  const items = await ItemModel.find(); // Fetch all docs from MongoDB
  res.json(items); // Send them back to React
});

// 2. POST Request: Create a new item
app.post('/addItem', async (req, res) => {
  const newItem = await ItemModel.create(req.body); // Create doc in MongoDB
  res.json(newItem); // Send back the new item as confirmation
});

// --- START SERVER ---
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});