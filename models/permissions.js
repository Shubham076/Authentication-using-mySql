const sequelize = require('sequelize');
const db = require("../db")

const Permission = db.define('permission',{

    userId: {
        type :sequelize.INTEGER,
        allowNull : false,
        primaryKey : true
    },

    accessGreen : {
        type: sequelize.BOOLEAN,
        allowNull : false
    },

    accessRed : {
        type : sequelize.BOOLEAN,
        allowNull : false
    }
})

module.exports = Permission;