import Sequelize from 'sequelize'
export const sequelize = new Sequelize('hrmanagement', 'root', '@Abc123456', {
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








