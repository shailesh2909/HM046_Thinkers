const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize with the Render connection string
const sequelize = new Sequelize(process.env.EXTERNAL_DB_URL, {
  dialect: 'postgres',
  logging: false, // Set to console.log to see SQL queries
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Required for Render/Heroku connections
    }
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connected via Sequelize...');
  } catch (err) {
    console.error('Unable to connect to the database:', err.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };