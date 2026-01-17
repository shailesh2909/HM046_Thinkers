const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Resume = require('./Resume');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'reviewed', 'accepted', 'rejected'),
    defaultValue: 'pending'
  },
  appliedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW // Explicit timestamp for the application event
  }
}, { 
  timestamps: true // This will also give you createdAt/updatedAt automatically
});

// Relationships
User.hasMany(Application, { foreignKey: 'userId' });
Application.belongsTo(User, { foreignKey: 'userId' });

Resume.hasMany(Application, { foreignKey: 'resumeId' });
Application.belongsTo(Resume, { foreignKey: 'resumeId' });

module.exports = Application;