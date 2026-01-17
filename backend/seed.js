const Question = require('./models/Question');
const { sequelize } = require('./config/database');

const seed = async () => {
  await sequelize.sync(); // Ensure tables exist
  await Question.create({
    title: "Addition Challenge",
    description: "Write a program that reads two space-separated integers from STDIN and prints their sum.",
    sampleTestCases: [{ input: "2 3", output: "5" }],
    hiddenTestCases: [
      { input: "10 20", output: "30" },
      { input: "-1 5", output: "4" }
    ],
    points: 20
  });
  console.log("Database Seeded!");
  process.exit();
};

seed();