require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes.js');
const mechanicRoutes = require('./routes/mechanics.js');
const workshopRoutes = require('./routes/workshopRoutes.js');

const app = express();
const PORT = process.env.PORT || 5001;

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(cookieParser());  
app.use(express.json()); 


app.use('/api', authRoutes);
app.use('/api', mechanicRoutes);
app.use('/api', workshopRoutes);


async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected!');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}
connectDB();


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
