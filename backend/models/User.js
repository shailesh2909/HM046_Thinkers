const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
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
    allowNull: true // Nullable for OAuth users
  },
  user_type: {
    type: DataTypes.ENUM('freelancer', 'company'),
    allowNull: false,
    defaultValue: 'freelancer'
  },
  googleId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  }
}, {
  timestamps: true // Automatically handles createdAt and updatedAt
});

module.exports = User;