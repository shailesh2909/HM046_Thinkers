const User = require('./User');
const UserProfile = require('./UserProfile');
const Education = require('./Education');
const ContactInfo = require('./ContactInfo');
const Website = require('./Website');
const Experience = require('./Experience');
const Project = require('./Project');

// Define relationships
// User - UserProfile (One-to-One)
User.hasOne(UserProfile, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
UserProfile.belongsTo(User, {
  foreignKey: 'userId'
});

// User - Education (One-to-Many)
User.hasMany(Education, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Education.belongsTo(User, {
  foreignKey: 'userId'
});

// User - ContactInfo (One-to-Many)
User.hasMany(ContactInfo, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
ContactInfo.belongsTo(User, {
  foreignKey: 'userId'
});

// User - Website (One-to-Many)
User.hasMany(Website, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Website.belongsTo(User, {
  foreignKey: 'userId'
});

// User - Experience (One-to-Many)
User.hasMany(Experience, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Experience.belongsTo(User, {
  foreignKey: 'userId'
});

// User - Project (One-to-Many)
User.hasMany(Project, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Project.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = {
  User,
  UserProfile,
  Education,
  ContactInfo,
  Website,
  Experience,
  Project
};
