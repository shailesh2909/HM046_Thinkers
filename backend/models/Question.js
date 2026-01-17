const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false }, // Problem Statement
  difficulty: { type: DataTypes.ENUM('easy', 'medium', 'hard'), defaultValue: 'easy' },
  
  // JSONB stores: [{ input: "1 2", output: "3" }]
  sampleTestCases: { type: DataTypes.JSONB, allowNull: false }, 
  hiddenTestCases: { type: DataTypes.JSONB, allowNull: false }, 
  
  points: { type: DataTypes.INTEGER, defaultValue: 10 }
});

module.exports = Question;