const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Bearer header

  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }
    req.user = decoded; // Save decoded user info in request
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authMiddleware;