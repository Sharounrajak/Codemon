const express = require('express');
const Snippet = require('./models/Snippet'); // ADD THIS
const router = express.Router();

// CREATE
router.post("/snippets", async (req, res) => {
  try {
    const { title, description, language, tag, code } = req.body;

    if (!title || !language || !code) {
      return res.status(400).json({ error: "Title, language, and code are required" });
    }

    const newSnippet = new Snippet({ title, description, language, tag, code });
    await newSnippet.save();

    res.status(201).json(newSnippet);
  } catch (err) {
    console.error("POST error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// READ ALL
router.get("/snippets", async (req, res) => {
  try {
    const snippets = await Snippet.find();
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// READ ONE
router.get("/snippets/:id", async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) return res.status(404).json({ error: "Not found" });
    res.json(snippet);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE
router.put("/snippets/:id", async (req, res) => {
  try {
    const snippet = await Snippet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!snippet) return res.status(404).json({ error: "Not found" });
    res.json(snippet);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE
router.delete("/snippets/:id", async (req, res) => {
  try {
    const snippet = await Snippet.findByIdAndDelete(req.params.id);
    if (!snippet) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
