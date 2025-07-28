const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Sample property data (14 properties)
const properties = [
  {
    id: 1,
    title: 'Banjara Hills Villa',
    type: 'sale',
    price: '₹5,00,00,000',
    location: 'Banjara Hills, Hyderabad',
    image: 'images/banjara-villa.jpg',
    description: 'Luxurious 5BHK villa with private pool and garden.',
    details: {
      area: '6000 sqft',
      bedrooms: 5,
      bathrooms: 6,
      parking: 3,
      status: 'Available',
      year: 2021
    }
  },
  {
    id: 2,
    title: 'Gachibowli Apartment',
    type: 'sale',
    price: '₹1,20,00,000',
    location: 'Gachibowli, Hyderabad',
    image: 'images/gachibowli-apt.jpg',
    description: 'Modern 3BHK apartment in gated community.',
    details: {
      area: '1800 sqft',
      bedrooms: 3,
      bathrooms: 3,
      parking: 2,
      status: 'Available',
      year: 2020
    }
  },
  {
    id: 3,
    title: 'Jubilee Hills Penthouse',
    type: 'sale',
    price: '₹3,50,00,000',
    location: 'Jubilee Hills, Hyderabad',
    image: 'images/jubilee-penthouse.jpg',
    description: 'Spacious penthouse with panoramic city views.',
    details: {
      area: '4000 sqft',
      bedrooms: 4,
      bathrooms: 5,
      parking: 2,
      status: 'Available',
      year: 2022
    }
  },
  {
    id: 4,
    title: 'Kondapur Flat',
    type: 'sale',
    price: '₹90,00,000',
    location: 'Kondapur, Hyderabad',
    image: 'images/kondapur-flat.jpg',
    description: '2BHK flat close to IT corridor.',
    details: {
      area: '1200 sqft',
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      status: 'Available',
      year: 2019
    }
  },
  {
    id: 5,
    title: 'Madhapur Studio',
    type: 'rent',
    price: '₹25,000/month',
    location: 'Madhapur, Hyderabad',
    image: 'images/madhapur-studio.jpg',
    description: 'Furnished studio apartment for rent.',
    details: {
      area: '600 sqft',
      bedrooms: 1,
      bathrooms: 1,
      parking: 1,
      status: 'Available',
      year: 2021
    }
  },
  {
    id: 6,
    title: 'Hitech City 2BHK',
    type: 'rent',
    price: '₹35,000/month',
    location: 'Hitech City, Hyderabad',
    image: 'images/hitech-2bhk.jpg',
    description: '2BHK apartment in prime location.',
    details: {
      area: '1100 sqft',
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      status: 'Available',
      year: 2020
    }
  },
  {
    id: 7,
    title: 'Kukatpally Family Home',
    type: 'rent',
    price: '₹40,000/month',
    location: 'Kukatpally, Hyderabad',
    image: 'images/kukatpally-home.jpg',
    description: 'Spacious family home for rent.',
    details: {
      area: '2000 sqft',
      bedrooms: 3,
      bathrooms: 3,
      parking: 2,
      status: 'Available',
      year: 2018
    }
  },
  {
    id: 8,
    title: 'Begumpet Office Space',
    type: 'rent',
    price: '₹1,00,000/month',
    location: 'Begumpet, Hyderabad',
    image: 'images/begumpet-office.jpg',
    description: 'Commercial office space for rent.',
    details: {
      area: '3000 sqft',
      bedrooms: 0,
      bathrooms: 2,
      parking: 4,
      status: 'Available',
      year: 2017
    }
  },
  {
    id: 9,
    title: 'Urgent Sale: Manikonda Flat',
    type: 'one-day',
    price: '₹70,00,000',
    location: 'Manikonda, Hyderabad',
    image: 'images/manikonda-flat.jpg',
    description: 'Quick sale 2BHK flat, ready to move.',
    details: {
      area: '1000 sqft',
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      status: 'Available',
      year: 2019
    }
  },
  {
    id: 10,
    title: 'Quick Rent: Ameerpet PG',
    type: 'one-day',
    price: '₹8,000/month',
    location: 'Ameerpet, Hyderabad',
    image: 'images/ameerpet-pg.jpg',
    description: 'PG accommodation for students and professionals.',
    details: {
      area: '400 sqft',
      bedrooms: 1,
      bathrooms: 1,
      parking: 0,
      status: 'Available',
      year: 2021
    }
  },
  {
    id: 11,
    title: 'Miyapur Duplex',
    type: 'sale',
    price: '₹1,80,00,000',
    location: 'Miyapur, Hyderabad',
    image: 'images/miyapur-duplex.jpg',
    description: '4BHK duplex with modern amenities.',
    details: {
      area: '2500 sqft',
      bedrooms: 4,
      bathrooms: 4,
      parking: 2,
      status: 'Available',
      year: 2020
    }
  },
  {
    id: 12,
    title: 'Secunderabad Independent House',
    type: 'sale',
    price: '₹2,20,00,000',
    location: 'Secunderabad, Hyderabad',
    image: 'images/secunderabad-house.jpg',
    description: 'Independent house with garden.',
    details: {
      area: '3200 sqft',
      bedrooms: 5,
      bathrooms: 5,
      parking: 2,
      status: 'Available',
      year: 2016
    }
  },
  {
    id: 13,
    title: 'Uppal Commercial Plot',
    type: 'sale',
    price: '₹3,00,00,000',
    location: 'Uppal, Hyderabad',
    image: 'images/uppal-plot.jpg',
    description: 'Commercial plot suitable for offices/shops.',
    details: {
      area: '5000 sqft',
      bedrooms: 0,
      bathrooms: 0,
      parking: 0,
      status: 'Available',
      year: 2023
    }
  },
  {
    id: 14,
    title: 'LB Nagar Builder Floor',
    type: 'sale',
    price: '₹85,00,000',
    location: 'LB Nagar, Hyderabad',
    image: 'images/lb-builder.jpg',
    description: 'Builder floor with modern interiors.',
    details: {
      area: '1400 sqft',
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      status: 'Available',
      year: 2022
    }
  }
];

// Sample testimonials
const testimonials = [
  { name: 'Ravi Kumar', text: 'Best real estate experience in Hyderabad!' },
  { name: 'Anjali Sharma', text: 'Professional and transparent service.' },
  { name: 'Suresh Reddy', text: 'Highly recommend Hyderabad Realty.' }
];

// Sample blog posts
const blogs = [
  { id: 1, title: 'Hyderabad Real Estate Trends 2024', content: 'Market is booming with new projects...' },
  { id: 2, title: 'How to Register Your Property', content: 'Step-by-step guide to property registration...' },
  { id: 3, title: 'Investment Hotspots in Hyderabad', content: 'Top areas for real estate investment...' }
];

// Sample users (for demo only, not secure)
const users = [
  { id: 1, username: 'user1', password: 'pass1', name: 'User One' },
  { id: 2, username: 'user2', password: 'pass2', name: 'User Two' }
];

// --- API Endpoints ---

// Get all properties
app.get('/api/properties', (req, res) => {
  res.json(properties);
});

// Get property by ID
app.get('/api/properties/:id', (req, res) => {
  const prop = properties.find(p => p.id === parseInt(req.params.id));
  if (prop) res.json(prop);
  else res.status(404).json({ error: 'Property not found' });
});

// Get properties by type (sale, rent, one-day)
app.get('/api/properties/type/:type', (req, res) => {
  const filtered = properties.filter(p => p.type === req.params.type);
  res.json(filtered);
});

// Get testimonials
app.get('/api/testimonials', (req, res) => {
  res.json(testimonials);
});

// Get blogs
app.get('/api/blogs', (req, res) => {
  res.json(blogs);
});

// Get homepage blocks (market insights, services, etc.)
app.get('/api/homeblocks', (req, res) => {
  res.json({
    sales: properties.filter(p => p.type === 'sale').slice(0, 4),
    rent: properties.filter(p => p.type === 'rent').slice(0, 4),
    oneDay: properties.filter(p => p.type === 'one-day'),
    services: [
      'Property Buying',
      'Property Selling',
      'Legal Assistance',
      'Investment Consulting'
    ],
    testimonials,
    marketInsights: 'Latest trends and price analysis for Hyderabad real estate.',
    askingPrice: 'Average asking price in Hyderabad: ₹7,500/sqft',
    govtRegistration: 'Guidance on government registration and compliance.',
    microMarketAnalysis: 'Analysis of micro markets in Hyderabad.',
    investmentPotential: 'High investment potential in emerging areas.'
  });
});

// User login (demo only)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) res.json({ success: true, user: { id: user.id, name: user.name } });
  else res.status(401).json({ success: false, error: 'Invalid credentials' });
});

// User account info (demo only)
app.get('/api/account/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) res.json({ id: user.id, name: user.name, username: user.username });
  else res.status(404).json({ error: 'User not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});