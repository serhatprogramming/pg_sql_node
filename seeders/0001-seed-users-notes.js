export async function up({ context: queryInterface }) {
  // Insert 5 users
  await queryInterface.bulkInsert("users", [
    { id: 1, name: "Alice", username: "alice123" },
    { id: 2, name: "Bob", username: "bob456" },
    { id: 3, name: "Carol", username: "carol789" },
    { id: 4, name: "Dave", username: "dave321" },
    { id: 5, name: "Eve", username: "eve654" },
  ]);

  // Insert 15 notes assigned to these users (3 notes per user)
  await queryInterface.bulkInsert("notes", [
    {
      content: "Note 1 from Alice",
      important: true,
      user_id: 1,
      date: new Date(),
    },
    {
      content: "Note 2 from Alice",
      important: false,
      user_id: 1,
      date: new Date(),
    },
    {
      content: "Note 3 from Alice",
      important: true,
      user_id: 1,
      date: new Date(),
    },

    {
      content: "Note 1 from Bob",
      important: false,
      user_id: 2,
      date: new Date(),
    },
    {
      content: "Note 2 from Bob",
      important: true,
      user_id: 2,
      date: new Date(),
    },
    {
      content: "Note 3 from Bob",
      important: false,
      user_id: 2,
      date: new Date(),
    },

    {
      content: "Note 1 from Carol",
      important: true,
      user_id: 3,
      date: new Date(),
    },
    {
      content: "Note 2 from Carol",
      important: true,
      user_id: 3,
      date: new Date(),
    },
    {
      content: "Note 3 from Carol",
      important: false,
      user_id: 3,
      date: new Date(),
    },

    {
      content: "Note 1 from Dave",
      important: false,
      user_id: 4,
      date: new Date(),
    },
    {
      content: "Note 2 from Dave",
      important: false,
      user_id: 4,
      date: new Date(),
    },
    {
      content: "Note 3 from Dave",
      important: true,
      user_id: 4,
      date: new Date(),
    },

    {
      content: "Note 1 from Eve",
      important: true,
      user_id: 5,
      date: new Date(),
    },
    {
      content: "Note 2 from Eve",
      important: false,
      user_id: 5,
      date: new Date(),
    },
    {
      content: "Note 3 from Eve",
      important: true,
      user_id: 5,
      date: new Date(),
    },
  ]);
}

export async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete("notes", null, {});
  await queryInterface.bulkDelete("users", null, {});
}
