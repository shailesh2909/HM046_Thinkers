const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const Resume = sequelize.define('Resume', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  resume_url: {
    type: DataTypes.STRING,
    allowNull: false // URL to PDF/Cloudinary
  },
  resume_name: {
    type: DataTypes.STRING,
    defaultValue: 'My Resume'
  }
}, { timestamps: true });

// Relationship: User has many Resumes
User.hasMany(Resume, { foreignKey: 'userId', onDelete: 'CASCADE' });
Resume.belongsTo(User, { foreignKey: 'userId' });

module.exports = Resume;