const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

// Load environment configurations
dotenv.config();

// Initialize express app
const app = express();

// Set up server port
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB (with automatic fallback to JSON mock DB if connection is missing/fails)
connectDB();

// Welcome endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: "🚀 Welcome to Deepankar Dayal's Premium Portfolio REST API",
    version: "1.0.0",
    status: "online"
  });
});

// Register API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));

// Public Contact Endpoint (Saves contact messages permanently in MongoDB)
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please supply a name, email, and message.' });
  }

  try {
    const Message = require('./models/Message');
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    console.log(`📬 [New Message Saved to DB]:`);
    console.log(`👤 Name: ${name}`);
    console.log(`📧 Email: ${email}`);
    console.log(`💬 Message: ${message}`);
    console.log(`-----------------------------------`);

    res.status(200).json({
      success: true,
      message: '🚀 Message received! Deepankar will connect with you shortly.'
    });
  } catch (error) {
    console.error('💥 Error saving contact message:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error saving message.' });
  }
});

// Fallback route error handler for 404s
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'API endpoint route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('💥 Global Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error Encountered'
  });
});

// Launch server listener
app.listen(PORT, () => {
  console.log(`🔥 [ONLINE] Server running at http://localhost:${PORT}`);
});
