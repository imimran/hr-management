import Sequelize from 'sequelize'
export const sequelize = new Sequelize('hrmanagement', 'root', '', {
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
// import UserModel from "./user"
// const User = UserModel(sequelize, Sequelize);


// export default sequelize;

/*Generating the database table. If we set force:true then each and every
 *time when we start our application all tables will be drop from the
 *database and regenerate new. So beware of it before using it.
 */






