const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(`${process.env.DB_TABLE}`, `'${process.env.DB_USER}'`, `${process.env.DB_PASSWORD}`, {
    host: 'localhost',
    dialect: 'mysql'
});

const User = require('../models/User');

const Post = sequelize.define('Post', {
    id:  { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER },
    by: { type: DataTypes.STRING },
    title: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.STRING, allowNull: false },
    imageUrl: { type: DataTypes.STRING, allowNull: true }
});

Post.sync();

User.hasMany(Post, {foreignKey: "userId"});

module.exports = sequelize.model('Post', Post);