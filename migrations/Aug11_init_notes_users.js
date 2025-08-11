import { DataTypes } from "sequelize";

export default {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("notes", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      important: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
    await queryInterface.createTable("users", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    await queryInterface.addColumn("notes", "user_id", {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("notes");
    await queryInterface.dropTable("users");
  },
};
