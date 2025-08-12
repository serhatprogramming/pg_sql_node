import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
  // Add user_id column to notes table
  await queryInterface.addColumn("notes", "user_id", {
    type: DataTypes.INTEGER,
    allowNull: false, // adjust if you want to allow notes without users
    references: {
      model: "users", // refers to table name
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE", // or 'SET NULL' if you prefer
  });
}

export async function down({ context: queryInterface }) {
  // Remove user_id column if rolling back
  await queryInterface.removeColumn("notes", "user_id");
}
