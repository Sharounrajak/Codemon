const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Snippet = require('./models/Snippet');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/codemon')
  .then(() => console.log('✅ MongoDB connected!'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'CodeMon API is working!' });
});

// REMOVE THIS LINE - it's causing the error
// app.use("/api/snippets", require("./Routes/CRUDroutes"));

// GET all snippets (keep only one version)
app.get('/api/snippets', async (req, res) => {
  try {
    console.log('Getting all snippets...'); // Debug
    const snippets = await Snippet.find().sort({ createdAt: -1 });
    console.log(`Found ${snippets.length} snippets`); // Debug
    res.json(snippets);
  } catch (error) {
    console.error('Error fetching snippets:', error); // Debug
    res.status(500).json({ error: error.message });
  }
});

// GET single snippet by ID
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

// GET user's snippets
app.get('/api/snippets/user/:userId', async (req, res) => {
  try {
    const userSnippets = await Snippet.find({ 
      userId: req.params.userId,
      isDemo: false
    }).sort({ createdAt: -1 });
    res.json(userSnippets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE new snippet
app.post('/api/snippets', async (req, res) => {
  try {
    console.log('Creating snippet:', req.body.title); // Debug
    
    const snippet = new Snippet(req.body);
    const saved = await snippet.save();
    
    console.log('Created successfully with ID:', saved._id); // Debug
    res.json(saved);
  } catch (error) {
    console.error('Create error:', error); // Debug
    res.status(500).json({ message: error.message });
  }
});

// UPDATE snippet
app.put('/api/snippets/:id', async (req, res) => {
  try {
    const snippet = await Snippet.findByIdAndUpdate(snippetId, updateSnippet, { new: true });
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    res.json(snippet);
  } catch (error) {
    res.status(500).json({ message: 'Error updating snippet', error: error.message });
  }
});

// DELETE snippet
app.delete('/api/snippets/:id', async (req, res) => {
  try {
    const snippet = await Snippet.findByIdAndDelete(req.params.id);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    res.json({ message: 'Snippet deleted successfully', snippet });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting snippet', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});