require('dotenv').config();
console.log("dot env uri: ",process.env.MONGODB_URI)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const Test = require('./models/Test')

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(cors());
app.use(express.json());

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected!');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Stop app if can't connect
  }
}
connectDB();

// Example simple route
app.get('/', (req, res) => {
    res.send('Hello from backend!');
});

app.post('/api/test', async (req, res) => {
    try {
        const { name, message }=req.body;
        console.log(`Received: ${name} - ${message}`)
        const newTest=new Test({name,message})
        await newTest.save()
        res.status(200).json({ success: true, message: 'Data received successfully', data: { name, message } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Something went wrong', error: err });
    }
});

// GET all items
app.get('/api/test', async (req, res) => {
    try {
        const items = await Test.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});





// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
