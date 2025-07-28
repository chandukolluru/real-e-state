const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS, images) from project root
app.use(express.static(path.join(__dirname, '/')));

// Load property data
const dataPath = path.join(__dirname, 'data', 'properties.json');
let properties = [];
try {
  properties = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
} catch (err) {
  console.error('Failed to load properties.json:', err);
}

// In-memory users store (for demo purposes only!)
const users = [];

/* ---------------------- Property Endpoints ---------------------- */
app.get('/api/properties', (req, res) => {
  res.json(properties);
});

app.get('/api/properties/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const property = properties.find((p) => p.id === id);
  if (!property) {
    return res.status(404).json({ error: 'Property not found' });
  }
  res.json(property);
});

/* ------------------------ Auth Endpoints ------------------------ */
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ error: 'Email already registered' });
  }
  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);
  res.json({ message: 'Registration successful', user: { id: newUser.id, name, email } });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
});

/* -------------------------- Start App --------------------------- */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});