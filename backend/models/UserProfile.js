const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UserProfile = sequelize.define('UserProfile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  profilePhoto: {
    type: DataTypes.STRING,
    allowNull: true
  },
  profileName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  headline: {
    type: DataTypes.STRING,
    allowNull: true
  },
  currentPosition: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  userBanner: {
    type: DataTypes.STRING,
    allowNull: true
  },
  aboutSection: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'user_profiles'
});

module.exports = UserProfile;
