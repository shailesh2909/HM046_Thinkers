const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Assessment = sequelize.define('Assessment', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  type: { 
    type: DataTypes.ENUM('aptitude', 'dsa', 'system_coding'), 
    allowNull: false 
  },
  duration: { type: DataTypes.INTEGER }, // in minutes
  companyId: { type: DataTypes.UUID, allowNull: false } // Link to User (Company)
});

// For simplicity in a hackathon, store questions as JSONB (PostgreSQL specific)
// This allows you to store arrays of objects (Questions + Options + Correct Answer)
Assessment.prototype.questions = { type: DataTypes.JSONB }; 

module.exports = Assessment;