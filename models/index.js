const Sequelize = require('sequelize')
const sequelize = new Sequelize('hrmanagement', 'root', '@Abc123456', {
  dialect: 'mysql',
  host: 'localhost',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: false
  },
  logging: false,
  timezone: '+06:00',
})

// //import tables
const UserModel = require("./user");
const User = UserModel(sequelize, Sequelize);




/*Generating the database table. If we set force:true then each and every
 *time when we start our application all tables will be drop from the
 *database and regenerate new. So beware of it before using it.
 */

//connect Database
(async () => {
  await sequelize.sync({ force: false });
  console.log('Database Connected!')

})()

module.exports = { sequelize, User };
