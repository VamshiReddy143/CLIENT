const express = require('express');
const userRoutes = require('./routes/userRoutes');
const marketRoutes = require('./routes/marketRoutes');
const requestRoutes = require('./routes/requestRoutes');
const adminRoutes = require('./routes/admin');
const bodyParser = require('body-parser');
const marketController = require('./controllers/marketController');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000; // Use environment variable or default to 3000

app.use(cors({
  origin: 'http://localhost:5174', // URL of the frontend (change if different)
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('Hello from Render!');
});
app.use(bodyParser.json()); // For parsing application/json
app.use('/api', userRoutes); // Use user routes
app.use('/api', marketRoutes);
app.use('/api', requestRoutes); // Use request routes
app.use('/api/admin', adminRoutes);





app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});