const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const CompanyProject = sequelize.define('CompanyProject', {
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
  projectName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'project_name'
  },
  
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  totalBudget: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    field: 'total_budget'
  },
  currency: {
    type: DataTypes.STRING(10),
    allowNull: true,
    defaultValue: 'INR'
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    field: 'start_date'
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    field: 'end_date'
  },
  projectStatus: {
    type: DataTypes.STRING(30),
    allowNull: true,
    defaultValue: 'open', // Changed to match your form logic if needed
    field: 'project_status',
    validate: {
      isIn: [['draft', 'open', 'in_progress', 'completed', 'cancelled']]
    }
  },
  // --- ADDED FIELDS TO MATCH PAYLOAD ---
  skills: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Stores ["React", "Node"]
    allowNull: true,
    defaultValue: []
  },
  projectCategory: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'project_category'
  }
}, {
  timestamps: true,
  tableName: 'company_projects',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = CompanyProject;