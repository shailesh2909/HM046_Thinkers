const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const Resume = sequelize.define('Resume', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  // ADD THIS FIELD EXPLICITLY
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  resume_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  resume_name: {
    type: DataTypes.STRING,
    defaultValue: 'My Resume'
  }
}, { timestamps: true });

// Relationships
User.hasMany(Resume, { foreignKey: 'userId', onDelete: 'CASCADE' });
Resume.belongsTo(User, { foreignKey: 'userId' });

module.exports = Resume;