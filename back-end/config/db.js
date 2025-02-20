import{ Sequelize } from 'sequelize';

const sequelize = new Sequelize (
    process.env.DB_NAME,
    process.env.DB_MSG,
   
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false 
    }

);

export default sequelize;