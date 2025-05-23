require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.SECRET;

const authMiddleware = (req, res, next) => {
  console.log("Token:", req.cookies.token);
  const token = req.cookies.token;
  console.log(token)
  if (!token) return res.status(401).json({ message: 'Unauthorized: No token' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Decoded user:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
