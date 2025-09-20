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

// GET all public snippets (for explore page - includes demo + user snippets)
app.get('/api/snippets', async (req, res) => {
  try {
    const snippets = await Snippet.find().sort({ createdAt: -1 });
    res.json(snippets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET user's own snippets (for "My Snippets" page)
app.get('/api/snippets/user/:userId', async (req, res) => {
  try {
    const userSnippets = await Snippet.find({ 
      userId: req.params.userId,
      isDemo: false // Exclude demo data
    }).sort({ createdAt: -1 });
    res.json(userSnippets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/snippets', async (req, res) => {
  try {
    console.log('Received data:', req.body); // Debug log
    
    const snippet = new Snippet(req.body);
    const saved = await snippet.save();
    
    console.log('Saved successfully:', saved); // Debug log
    res.json(saved);
  } catch (error) {
    console.log('Error details:', error); // This will show the real problem
    res.status(500).json({ message: error.message });
  }
});

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