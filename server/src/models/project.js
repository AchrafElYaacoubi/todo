import { DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';

const Project = sequelize.define('project', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
      type: DataTypes.INTEGER
  }
});


export default Project;