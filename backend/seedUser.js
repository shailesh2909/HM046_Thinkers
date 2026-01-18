const { sequelize } = require('./config/database');
const User = require('./models/User');
const Company = require('./models/Company');
const bcrypt = require('bcryptjs');

const seedUser = async () => {
  try {
    await sequelize.sync(); // Syncs the model with DB

    const hashedPassword = await bcrypt.hash('password123', 10);

    // Check if users already exist
    const existingFreelancer = await User.findOne({ where: { email: "freelancer@example.com" } });
    const existingCompany = await User.findOne({ where: { email: "company@example.com" } });

    let freelancerUser, companyUser;

    if (!existingFreelancer) {
      freelancerUser = await User.create({
        email: "freelancer@example.com",
        password: hashedPassword,
        user_type: "freelancer",
      });
      console.log("Created freelancer user:", freelancerUser.id);
    } else {
      freelancerUser = existingFreelancer;
      console.log("Freelancer user already exists:", freelancerUser.id);
    }

    if (!existingCompany) {
      companyUser = await User.create({
        email: "company@example.com",
        password: hashedPassword,
        user_type: "company",
      });
      console.log("Created company user:", companyUser.id);
    } else {
      companyUser = existingCompany;
      console.log("Company user already exists:", companyUser.id);
    }

    // Check if company record exists
    const existingCompanyRecord = await Company.findOne({ where: { authUserId: companyUser.id } });
    
    let company;
    if (!existingCompanyRecord) {
      company = await Company.create({
        authUserId: companyUser.id,
        companyName: "Test Company Inc",
        headline: "Leading tech solutions provider",
        about: "We provide innovative tech solutions for businesses worldwide.",
        industry: "Technology",
        companySize: "51-200",
        contactEmail: "contact@testcompany.com"
      });
      console.log("Created company record:", company.id);
    } else {
      company = existingCompanyRecord;
      console.log("Company record already exists:", company.id);
    }

    console.log("-----------------------------------------");
    console.log("Success: Users and Company Seeded!");
    console.log("Freelancer - Email: freelancer@example.com, Pass: password123, ID:", freelancerUser.id);
    console.log("Company - Email: company@example.com, Pass: password123, ID:", companyUser.id);
    console.log("Company Record ID:", company.id);
    console.log("-----------------------------------------");
    process.exit();
  } catch (error) {
    console.error("Seeding failed. Error:", error.message);
    process.exit(1);
  }
};

seedUser();