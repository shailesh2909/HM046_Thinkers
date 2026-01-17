const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const CompanyWebsite = sequelize.define('CompanyWebsite', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'company_id',
    references: {
      model: 'companies',
      key: 'id'
    }
  },
  websiteUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'website_url',
    validate: {
      isUrl: true
    }
  },
  websiteType: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'website_type',
    validate: {
      isIn: [['official', 'blog', 'portfolio', 'product']]
    }
  }
}, {
  timestamps: false,
  tableName: 'company_websites',
  underscored: true
});

module.exports = CompanyWebsite;
