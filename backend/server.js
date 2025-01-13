require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

// Database Connection
sequelize.sync().then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
