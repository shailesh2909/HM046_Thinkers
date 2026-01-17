const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // This line generates the ID automatically
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true // Allow null for OAuth users
  },
  googleId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  user_type: {
    type: DataTypes.ENUM('freelancer', 'company'),
    defaultValue: 'freelancer'
  }
});

module.exports = User;