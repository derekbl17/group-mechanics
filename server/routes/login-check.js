const authMiddleware = require('../middleware/authMiddleware'); // The middleware we created to check for token

// This route checks if the user is logged in
exports.checkLogin = async (req, res) => {
  try {
    // The `authMiddleware` ensures that the user is authenticated by checking the token
    res.set('Cache-Control', 'no-store'); // Prevent caching

    // Return user data if authenticated
    res.json({
      message: 'Authenticated',
      username: req.user.username,
      role: req.user.role,  // Assuming `role` is set in JWT payload
      user: req.user        // Sending the full user object if needed
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
