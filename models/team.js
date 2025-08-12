import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db";

class Team extends Model {}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "team",
    underscored: true,
    timestamps: false,
  }
);

export default Team;
