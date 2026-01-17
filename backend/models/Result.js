const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Result = sequelize.define('Result', {
  totalScore: { type: DataTypes.FLOAT, defaultValue: 0 },
  percentage: { type: DataTypes.FLOAT },
  completedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  isShortlisted: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = Result;

// Relationships
// User has many Results
// Assessment has many Results