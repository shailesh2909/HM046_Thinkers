const { sequelize } = require('./config/database');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const seedUser = async () => {
  try {
    await sequelize.sync(); // Syncs the model with DB

    const hashedPassword = await bcrypt.hash('password123', 10);

    const user = await User.create({
      email: "test@example.com",
      password: hashedPassword,
      user_type: "freelancer", // Matches your model's ENUM
    });

    console.log("-----------------------------------------");
    console.log("Success: User Seeded!");
    console.log("Email: test@example.com");
    console.log("Pass: password123");
    console.log("User ID:", user.id);
    console.log("-----------------------------------------");
    process.exit();
  } catch (error) {
    console.error("Seeding failed. Error:", error.message);
    process.exit(1);
  }
};

seedUser();