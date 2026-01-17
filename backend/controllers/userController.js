const User = require('../../backend_v2/models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Sequelize's version of SELECT *
    res.json(users);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body); // Sequelize's version of INSERT INTO
    res.json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};