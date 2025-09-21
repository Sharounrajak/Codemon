import { useState, useEffect } from 'react';
// constants/demoData.js (or at the top of your Explore component)
export const FALLBACK_SNIPPETS = [
  {
    id: 1,
    title: "React useState Hook",
    description: "Basic state management in React functional components",
    code: `const [count, setCount] = useState(0);

const increment = () => {
  setCount(count + 1);
};`,
    language: "javascript",
    author: "Sarah Chen",
    avatar: "SC",
    likes: 234,
    views: 1200,
    tags: ["react", "hooks", "beginner"],
    createdAt: "2 days ago"
  },
  {
    id: 2,
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
    likes: 156,
    views: 890,
    tags: ["python", "algorithms", "sorting"],
    createdAt: "5 days ago"
  },
  {
    id: 3,
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
    likes: 89,
    views: 450,
    tags: ["css", "flexbox", "centering"],
    createdAt: "1 week ago"
  },
  {
    id: 4,
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
    likes: 312,
    views: 1500,
    tags: ["nodejs", "express", "backend"],
    createdAt: "3 days ago"
  },
  {
    id: 5,
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
    likes: 445,
    views: 2100,
    tags: ["javascript", "arrays", "cheatsheet"],
    createdAt: "1 day ago"
  },
  {
    id: 6,
    title: "SQL Find Duplicates",
    description: "Query to find duplicate records in a table",
    code: `SELECT column_name, COUNT(*)
FROM table_name
GROUP BY column_name
HAVING COUNT(*) > 1;`,
    language: "sql",
    author: "Lisa Park",
    avatar: "LP",
    likes: 78,
    views: 340,
    tags: ["sql", "database", "duplicates"],
    createdAt: "4 days ago"
  }
];

export const DEMO_CATEGORIES = [
  "All",
  "JavaScript",
  "Python", 
  "React",
  "CSS",
  "Node.js",
  "SQL"
];
export const useDemoData = () => {
  const [snippets, setSnippets] = useState(FALLBACK_SNIPPETS); // Start with fallback
  const [loading, setLoading] = useState(false);

      
  const fetchSnippets = async () => {
    try {
      setLoading(true);
      console.log('Fetching fresh data...'); // Debug log
      
      const response = await fetch('http://localhost:5000/api/snippets?_t=' + Date.now());
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fresh API data:', data); // Debug log
        
        const transformedData = data.map(item => ({
          ...item,
          id: item._id,
        }));
        
        setSnippets(transformedData);
      }
    } catch (error) {
      console.log('API error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  // Return refetch function so components can manually refresh
  return { snippets, loading, refetch: fetchSnippets };
};



// Export the constant too if other components need it
export const DEMO_SNIPPETS = FALLBACK_SNIPPETS;