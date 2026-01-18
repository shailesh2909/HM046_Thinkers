const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { email, password, user_type } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      email,
      password: hashedPassword,
      user_type
    });

    res.status(201).json({ message: "User created", userId: user.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const secret = process.env.JWT_SECRET || "fallback_secret_for_testing"
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1d' });
    res.json({ token, user_type: user.user_type, userName:user.email, user_id: user.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};