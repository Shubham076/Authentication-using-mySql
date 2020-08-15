const Sequelize = require('sequelize');
require('dotenv').config()



const sequelize = new Sequelize('mydb','root',process.env.PASSWORD ,
 {
     dialect:'mysql' , 
     host:process.env.HOST,
     logging:false
     
})

module.exports = sequelize;

