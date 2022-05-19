import dotenv from "dotenv";
import { Sequelize } from 'sequelize';
dotenv.config();

export const sequelize = new Sequelize('postgres://cucxlphh:NUMfvg0WbguH2PiuDHdWyDg2U6RcFd0z@abul.db.elephantsql.com/cucxlphh', {
    define: {
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})