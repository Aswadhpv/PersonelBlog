const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,  // Database name
    process.env.DB_USER,  // Username
    process.env.DB_PASS,  // Password
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false, // Disable logging (optional)
    }
);

module.exports = { sequelize };
