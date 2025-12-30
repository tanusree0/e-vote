const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  const { name, aadhaar, age, password } = req.body;

  if (age < 18) return res.status(400).json({ error: "Underage" });

  const hashed = await bcrypt.hash(password, 10);

  try {
    await User.create({
      name,
      aadhaarNumber: aadhaar,
      age,
      password: hashed
    });
    res.json({ message: "Registered successfully" });
  } catch {
    res.status(400).json({ error: "Aadhaar already exists" });
  }
});

router.post('/login', async (req, res) => {
  const { aadhaar, password } = req.body;

  const user = await User.findOne({ aadhaarNumber: aadhaar });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'strict'
  });

  res.json({ message: "Login successful" });
});

module.exports = router;
