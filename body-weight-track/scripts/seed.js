const { db } = require("@vercel/postgres");
const { users, weights } = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        );
      `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (id, name, email, password)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedWeights(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "weights" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS weights(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    weight REAL NOT NULL,
    date DATE NOT NULL
    );`;

    console.log(`Created "weights" table`);

    // Insert data into the "weights" table
    const insertedWeights = await Promise.all(
      weights.map(
        (weight) => client.sql`
            INSERT INTO weights (user_id, weight, date)
            VALUES (${weight.userID}, ${weight.weight}, ${weight.date})
            ON CONFLICT (id) DO NOTHING;
            `
      )
    );

    console.log(`Seeded ${insertedWeights.length} weights`);

    return {
      createTable,
      weights: insertedWeights,
    };
  } catch (error) {
    console.error(`Error seeding weights:`, error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedWeights(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
