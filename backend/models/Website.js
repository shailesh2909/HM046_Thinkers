const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Website = sequelize.define('Website', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  websiteUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  websiteType: {
    type: DataTypes.ENUM('personal', 'blog', 'portfolio', 'company', 'other'),
    allowNull: false,
    defaultValue: 'personal'
  }
}, {
  timestamps: true,
  tableName: 'websites'
});

module.exports = Website;
