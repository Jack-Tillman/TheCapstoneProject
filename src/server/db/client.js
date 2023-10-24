const { Client } = require("pg");
const connectionString =
  process.env.DATABASE_URL || "http://localhost:5432/capstone-db";

const db = new Client({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = db;

