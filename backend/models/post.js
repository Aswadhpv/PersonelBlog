const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Post = sequelize.define('Post', {
    content: { type: DataTypes.TEXT, allowNull: false },
    media: { type: DataTypes.STRING },
    author: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Post;
