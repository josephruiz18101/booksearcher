const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = ({ req }) => {
  let token = req.headers.authorization || '';
  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }

  try {
    if (token) {
      const { data } = jwt.verify(token, process.env.JWT_SECRET);
      req.user = data;
    }
  } catch (err) {
    console.log('Invalid token');
  }
  return req;
};

module.exports = authMiddleware;
