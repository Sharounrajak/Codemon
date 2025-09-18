const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// This lets us receive JSON data
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/codemon')
  .then(() => console.log('✅ MongoDB connected!'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// Your demo data (same as before)
const demoSnippets = [
  {
    id: 1,
    title: "React useState Hook",
    code: "const [count, setCount] = useState(0);",
    author: "Sarah Chen"
  },
  {
    id: 2, 
    title: "Python Quick Sort",
    code: "def quicksort(arr):\n  return arr",
    author: "Alex Rodriguez"
  }
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'CodeMon API is working!' });
});

// Get all snippets
app.get('/api/snippets', (req, res) => {
  res.json(demoSnippets);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});