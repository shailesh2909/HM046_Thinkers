const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// models/Submission.js
const Submission = sequelize.define('Submission', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  questionId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  score: { type: DataTypes.FLOAT, defaultValue: 0 },
  executionTime: { type: DataTypes.FLOAT },
  memoryUsed: { type: DataTypes.INTEGER },
  status: { 
    type: DataTypes.STRING, // No arguments here
    defaultValue: 'Pending',
    validate: {
      isIn: [['Pending', 'Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error']]
    }
  },
  code: { type: DataTypes.TEXT, allowNull: false },
  language: { type: DataTypes.STRING }
}, { timestamps: true });

module.exports = Submission;