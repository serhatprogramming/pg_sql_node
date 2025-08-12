import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
  await queryInterface.createTable("teams", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  await queryInterface.createTable("memberships", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    team_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "teams",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("memberships");
  await queryInterface.dropTable("teams");
}
