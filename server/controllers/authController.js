require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.SECRET; 
const COOKIE_OPTIONS = { httpOnly: true, sameSite: 'lax', secure: false };

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error registering user', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, username: user.username, role:user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, { ...COOKIE_OPTIONS, maxAge: 60 * 60 * 1000 });
    res.json({ message: 'Logged in successfully', username: user.username, role:user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token', COOKIE_OPTIONS);
  res.json({ message: 'Logged out successfully' });
};

exports.admin=(req,res)=>{
  res.set('Cache-Control', 'no-store');
  res.json({ message: `Hello Admin ${req.user.username}!` });
}

exports.checkLogin=(req,res)=>{
  res.set('Cache-Control', 'no-store');
  res.json({ message: `Hello ${req.user.username}!`, username:req.user.username });
}
