const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  authUserId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'auth_user_id',
    comment: 'Reference to auth_users table'
  },
  companyName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'company_name'
  },
  headline: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  about: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  profilePhoto: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'profile_photo'
  },
  bannerPhoto: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'banner_photo'
  },
  industry: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  companySize: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'company_size'
  },
  contactEmail: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'contact_email',
    validate: {
      isEmail: true
    }
  },
  phoneNumber: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'phone_number'
  },
  phoneType: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'phone_type',
    validate: {
      isIn: [['work', 'support', 'other']]
    }
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING(150),
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'companies',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Company;
