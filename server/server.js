const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Snippet = require('./models/Snippet'); // ADD THIS

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/codemon')
  .then(() => console.log('✅ MongoDB connected!'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'CodeMon API is working!' });
});

const router = express.Router();
// Create new snippet
router.post("/snippets", async (req, res) => {
  try {
    const { title, description, language, tag, code } = req.body;

    // Validate required fields
    if (!title || !language || !code) {
      return res.status(400).json({ error: "Title, language, and code are required" });
    }

    // Create new snippet
    const newSnippet = new Snippet({
      title,
      description,
      language,
      tag,
      code,
    });

    await newSnippet.save();

    res.status(201).json(newSnippet);
  } catch (error) {
    console.error("Error creating snippet:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

app.put('/api/snippets/:id', async (req, res) => {
  try {
    const snippet = await Snippet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    res.json(snippet);
  } catch (error) {
    res.status(500).json({ message: 'Error updating snippet', error: error.message });
  }
})

app.delete('/api/snippets/:id', async (req, res) => {
  try {
    const snippet = await Snippet.findByIdAndDelete(req.params.id);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    res.json(snippet);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting snippet', error: error.message });
  }
})
// Get all snippets FROM DATABASE (not hardcoded anymore)
app.get('/api/snippets', async (req, res) => {
  try {
    const snippets = await Snippet.find().sort({ createdAt: -1 }); // Most recent first
    res.json(snippets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching snippets', error: error.message });
  }
});

// Get single snippet by ID
app.get('/api/snippets/:id', async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    res.json(snippet);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching snippet', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});