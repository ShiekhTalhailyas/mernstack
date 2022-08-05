const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../modelling/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;    
 if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
      // Verify token
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
      // Get user from token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    console.log("no token");
    res.status(401);
    throw new Error("unAuthorised User");
  }
});

module.exports = { protect };
