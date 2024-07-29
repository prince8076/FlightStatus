const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Adjust path as needed
const flightRoutes = require('./routes/CURD'); // Adjust path as needed
const userRoutes = require('./routes/users');
const cors = require('cors');



const app = express();

connectDB();

app.use(express.json());
app.use(cors());

// Use flight routes
app.use('/api', flightRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
