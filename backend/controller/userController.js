const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../modelling/userModel");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password)
    return res.status(400).send("Please Enter all Details");

  //User already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    const newUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    };
    res.status(200).send(newUser);
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

//generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_TOKEN, {
    expiresIn: "30d",
  });
};
// @desc    Login a user
// @route   /api/users/login
// @access  Public
const userLogin= asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Check user and passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

//getMe
const getMe = asyncHandler(async (req, res) => {
  console.log(req.body);
  res
    .status(200)
    .json({ id: req.user._id, email: req.user.email, name: req.user.name });
});

module.exports = { registerUser, userLogin, getMe };
