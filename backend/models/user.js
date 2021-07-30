const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(`${process.env.DB_TABLE}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
    host: 'localhost',
    dialect: 'mysql'
});

const User = sequelize.define('User', {
    id:  {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

console.log(User === sequelize.models.User); // true

User.sync();

module.exports = sequelize.model('User', User);