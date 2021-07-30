const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(`${process.env.DB_TABLE}`, `'${process.env.DB_USER}'`, `${process.env.DB_PASSWORD}`, {
    host: 'localhost',
    dialect: 'mysql'
});

const Post = require('../models/Post');
const User = require('./User');

const Coms = sequelize.define('Coms', {
    id:  { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER },
    postId: { type: DataTypes.INTEGER },
    by: { type: DataTypes.STRING },
    text: { type: DataTypes.STRING, allowNull: false }
});

Coms.sync();

Post.hasMany(Coms, {foreignKey: "postId"});
User.hasMany(Coms, {foreignKey: "userId"});

module.exports = sequelize.model('Coms', Coms);