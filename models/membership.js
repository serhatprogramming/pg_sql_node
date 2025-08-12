import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";

class Membership extends Model {}

Membership.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "membership",
    underscored: true,
    timestamps: false,
  }
);

export default Membership;
