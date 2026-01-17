const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ContactInfo = sequelize.define('ContactInfo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneType: {
    type: DataTypes.ENUM('home', 'work', 'mobile'),
    allowNull: false,
    defaultValue: 'mobile'
  }
}, {
  timestamps: true,
  tableName: 'contact_info'
});

module.exports = ContactInfo;
