const mongoose = require('mongoose');
const Snippet = require('./models/Snippet');

// Your demo data (expanded)
const DEMO_SNIPPETS = [
  {
    title: "React useState Hook",
    description: "Basic state management in React functional components",
    code: `const [count, setCount] = useState(0);

const increment = () => {
  setCount(count + 1);
};`,
    language: "javascript",
    author: "Sarah Chen",
    avatar: "SC",
    tags: ["react", "hooks", "beginner"],
    likes: 234,
    views: 1200
  },
  {
    title: "Python Quick Sort",
    description: "Efficient sorting algorithm implementation",
    code: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)`,
    language: "python",
    author: "Alex Rodriguez",
    avatar: "AR",
    tags: ["python", "algorithms", "sorting"],
    likes: 156,
    views: 890
  },
  {
    title: "CSS Flexbox Center",
    description: "Perfect centering with flexbox",
    code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}`,
    language: "css",
    author: "Marcus Johnson",
    avatar: "MJ",
    tags: ["css", "flexbox", "centering"],
    likes: 89,
    views: 450
  },
  {
    title: "Express.js Basic Server",
    description: "Simple HTTP server setup with Express",
    code: `const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
    language: "javascript",
    author: "Emma Wilson",
    avatar: "EW",
    tags: ["nodejs", "express", "backend"],
    likes: 312,
    views: 1500
  },
  {
    title: "JavaScript Array Methods",
    description: "Common array operations cheat sheet",
    code: `// Map, Filter, Reduce examples
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);`,
    language: "javascript",
    author: "David Kim",
    avatar: "DK",
    tags: ["javascript", "arrays", "cheatsheet"],
    likes: 445,
    views: 2100
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/codemon');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Snippet.deleteMany({});
    console.log('🗑️ Cleared existing snippets');

    // Insert demo data
    const snippets = await Snippet.insertMany(DEMO_SNIPPETS);
    console.log(`✅ Added ${snippets.length} demo snippets to database`);

    // Close connection
    await mongoose.connection.close();
    console.log('✅ Database seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};

seedDatabase();