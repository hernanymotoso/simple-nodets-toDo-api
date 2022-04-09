import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/instances/postgresql';

export interface ITodoInstance extends Model {
  id: number;
  title: string;
  done: boolean;
}

export const Todo = sequelize.define<ITodoInstance>(
  'Todo',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'todos',
    timestamps: false,
  },
);
