const express = require('express');
const Snippet = require('./models/Snippet'); // ADD THIS
const router = express.Router();

// CREATE
router.post("/users", async (req, res) => {
  try {
    const { name, email, passwords } = req.body;

    if (!name || !email || !passwords) {
      return res.status(400).json({ error: "Name, email, and passwords are required" });
    }

    const newUser = new User({ name, email, passwords });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error("POST error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const User = await User.find();
    res.json(User);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
