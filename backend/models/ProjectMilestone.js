const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ProjectMilestone = sequelize.define('ProjectMilestone', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  projectId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'project_id',
    references: {
      model: 'company_projects',
      key: 'id'
    }
  },
  milestoneTitle: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'milestone_title'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  orderNo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'order_no'
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
  milestoneStatus: {
    type: DataTypes.STRING(30),
    allowNull: true,
    defaultValue: 'pending',
    field: 'milestone_status',
    validate: {
      isIn: [['pending', 'in_progress', 'submitted', 'approved', 'paid', 'rejected']]
    }
  }
}, {
  timestamps: true,
  tableName: 'project_milestones',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = ProjectMilestone;
