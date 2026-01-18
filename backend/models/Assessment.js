const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Assessment = sequelize.define('Assessment', {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true 
  },
  title: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  type: { 
    type: DataTypes.ENUM('aptitude', 'dsa', 'system_coding'), 
    allowNull: false 
  },
  duration: { 
    type: DataTypes.INTEGER 
  }, // in minutes
  companyId: { 
    type: DataTypes.UUID, 
    allowNull: false 
  },
  // FIX: Moved 'questions' inside the define block
  questions: {
    type: DataTypes.JSONB, // Stores Array of objects [{question, options, answer}]
    allowNull: true,
    defaultValue: []
  }
}, {
  timestamps: true,
  tableName: 'assessments'
});

module.exports = Assessment;