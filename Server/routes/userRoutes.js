const express = require('express');
const router = express.Router();
const User = require('../Models/UserSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();


//SignUp
router.post('/Signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = new User({ name, email, password });
    const existinguser = await User.findOne({ email })
    if (existinguser) {
      return res.status(400).json({ message: 'Email Already Exist' })
    }
    let result = await user.save();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error Creating User', error });
  }
});

//  SignIn
router.post('/Signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid Password' });
    }
    let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login Successfull', username: user.name, userId: user._id, profileImage: user.profileImage, Admin:user.isAdmin || "", token });
  }
  catch (error) {
    res.status(500).json({ message: 'Error Signing In' });
  }
});

//  Fetch All Users
router.get('/GetUsers', async (req, res) => {
  try {
    let result = await User.find();
    return res.status(200).json(result);
  }
  catch (error) {
    res.status(500).json({ message: 'Error Fetching Users', error });
  }
})

// fetchUser by id
router.get('/GetUsers/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching User", error });
  }
});

// Update user details
router.patch("/UpdateUser/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, profileImage,password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, profileImage,password},
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Error updating profile", error });
  }
});
module.exports = router;


