const User = require('./User');
const UserProfile = require('./UserProfile');
const Education = require('./Education');
const ContactInfo = require('./ContactInfo');
const Website = require('./Website');
const Experience = require('./Experience');
const Project = require('./Project');
const Company = require('./Company');
const CompanyWebsite = require('./CompanyWebsite');
const CompanyProject = require('./CompanyProject');
const ProjectMilestone = require('./ProjectMilestone');
const Resume = require('./Resume');
const Question = require('./Question');
const Submission = require('./Submission');
const Message = require('./Message');
const Application = require('./Application');

// Define relationships
// User - UserProfile (One-to-One)
User.hasOne(UserProfile, {
  as: 'UserProfile',
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
UserProfile.belongsTo(User, {
  foreignKey: 'userId'
});

// User - Education (One-to-Many)
User.hasMany(Education, {
  as: 'Educations',
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Education.belongsTo(User, {
  foreignKey: 'userId'
});

// User - ContactInfo (One-to-Many)
User.hasMany(ContactInfo, {
  as: 'ContactInfos',
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
ContactInfo.belongsTo(User, {
  foreignKey: 'userId'
});

// User - Website (One-to-Many)
User.hasMany(Website, {
  as: 'Websites',
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Website.belongsTo(User, {
  foreignKey: 'userId'
});

// User - Experience (One-to-Many)
User.hasMany(Experience, {
  as: 'Experiences',
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Experience.belongsTo(User, {
  foreignKey: 'userId'
});

// User - Project (One-to-Many)
User.hasMany(Project, {
  as: 'Projects',
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Project.belongsTo(User, {
  foreignKey: 'userId'
});

// Company - CompanyWebsite (One-to-Many)
Company.hasMany(CompanyWebsite, {
  foreignKey: 'companyId',
  onDelete: 'CASCADE'
});
CompanyWebsite.belongsTo(Company, {
  foreignKey: 'companyId'
});

// Company - CompanyProject (One-to-Many)
Company.hasMany(CompanyProject, {
  foreignKey: 'companyId',
  onDelete: 'CASCADE'
});
CompanyProject.belongsTo(Company, {
  foreignKey: 'companyId'
});

// CompanyProject - ProjectMilestone (One-to-Many)
CompanyProject.hasMany(ProjectMilestone, {
  foreignKey: 'projectId',
  onDelete: 'CASCADE'
});
ProjectMilestone.belongsTo(CompanyProject, {
  foreignKey: 'projectId'
});

// User - Resume (One-to-Many)
User.hasMany(Resume, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Resume.belongsTo(User, {
  foreignKey: 'userId'
});

// Question - Submission (One-to-Many)
Question.hasMany(Submission, {
  foreignKey: 'questionId',
  onDelete: 'CASCADE'
});
Submission.belongsTo(Question, {
  foreignKey: 'questionId'
});

// User - Submission (One-to-Many)
User.hasMany(Submission, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Submission.belongsTo(User, {
  foreignKey: 'userId'
});

// User - Message (One-to-Many for sent messages)
User.hasMany(Message, {
  as: 'SentMessages',
  foreignKey: 'senderId',
  onDelete: 'CASCADE'
});
Message.belongsTo(User, {
  as: 'Sender',
  foreignKey: 'senderId'
});

// User - Message (One-to-Many for received messages)
User.hasMany(Message, {
  as: 'ReceivedMessages',
  foreignKey: 'receiverId',
  onDelete: 'CASCADE'
});
Message.belongsTo(User, {
  as: 'Receiver',
  foreignKey: 'receiverId'
});

// User - Application (One-to-Many)
User.hasMany(Application, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Application.belongsTo(User, {
  foreignKey: 'userId'
});

// Resume - Application (One-to-Many)
Resume.hasMany(Application, {
  foreignKey: 'resumeId',
  onDelete: 'CASCADE'
});
Application.belongsTo(Resume, {
  foreignKey: 'resumeId'
});

// CompanyProject - Application (One-to-Many)
CompanyProject.hasMany(Application, {
  foreignKey: 'projectId',
  onDelete: 'CASCADE'
});
Application.belongsTo(CompanyProject, {
  foreignKey: 'projectId'
});

module.exports = {
  User,
  UserProfile,
  Education,
  ContactInfo,
  Website,
  Experience,
  Project,
  Company,
  CompanyWebsite,
  CompanyProject,
  ProjectMilestone,
  Resume,
  Question,
  Submission,
  Message,
  Application
};
