const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const flightRoutes = require('./routes/CURD');
const userRoutes = require('./routes/users');
const cors = require('cors');



const app = express();

connectDB();

app.use(express.json());
app.use(cors());


app.use('/api', flightRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
