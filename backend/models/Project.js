const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Generates unique ID automatically
    primaryKey: true
    // REMOVED: autoIncrement: true
  },
  userId: {
    type: DataTypes.UUID, // Must match User.js ID type
    allowNull: false,
    references: {
      model: 'Users', // Make sure this matches your DB table name
      key: 'id'
    }
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  media: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  associatedWith: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Company or organization associated with the project'
  },
  projectUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  skills: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  // IMPORTANT: Add these fields if you want the frontend form to work
  totalBudget: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'INR'
  },
  projectStatus: {
    type: DataTypes.STRING, // Or ENUM if you prefer
    defaultValue: 'draft'
  }
}, {
  timestamps: true,
  tableName: 'projects'
});

module.exports = Project;