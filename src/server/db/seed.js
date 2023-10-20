/*
Oct. 20 Note: 
This is still not functioning!
Currently, seed the database throws an error while inserting seed data "syntax error at or near $" starting at createGame
Things i've tried: changing price data type, making everything lowercase 
*/




const db = require("./client");
const { createUser } = require("./users");
const { createGame } = require("./games");

const users = [
  {
    name: "Emily Johnson",
    email: "emily@example.com",
    password: "securepass",
    isAdmin: true,
  },
  {
    name: "Liu Wei",
    email: "liu@example.com",
    password: "strongpass",
    isAdmin: false,
  },
  {
    name: "Isabella García",
    email: "bella@example.com",
    password: "pass1234",
    isAdmin: false,
  },
  {
    name: "Mohammed Ahmed",
    email: "mohammed@example.com",
    password: "mysecretpassword",
    isAdmin: false,
  },
  {
    name: "John Smith",
    email: "john@example.com",
    password: "password123",
    isAdmin: false,
  },
  // Add more user objects as needed
];

const games = [
  {
    productName: "Video GAME",
    price: 39.99,
    productImage: "imgur.com",
    genre: "Action",
    playerRange: "Singleplayer",
    esrb: "T",
    condition: "New",
    publisher: "VideoGame Pub",
    description: "This is the video game of all time",
    delivery: "Same Day",
  },
];

const dropTables = async () => {
  try {
    await db.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS games;
        `);
  } catch (err) {
    throw err;
  }
};

const createTables = async () => {
  try {
    await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            isAdmin BOOLEAN default false
        );
        
        CREATE TABLE games(
          id SERIAL PRIMARY KEY,
          productName VARCHAR(255) NOT NULL,
          price FLOAT NOT NULL,
          productImage VARCHAR(255) NOT NULL,
          genre VARCHAR(255) NOT NULL, 
          playerRange VARCHAR(255) NOT NULL,
          esrb VARCHAR(255) NOT NULL,
          condition VARCHAR(255) NOT NULL,
          publisher VARCHAR(255) NOT NULL,
          description VARCHAR(255) NOT NULL,
          delivery VARCHAR(255) NOT NULL
      );
        `);
  } catch (err) {
    throw err;
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
      });
    }
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const insertGames = async () => {
  try {
    for (const game of games) {
      await createGame({
        productName: game.productName,
        price: game.price,
        productImage: game.productImage,
        genre: game.genre,
        playerRange: game.playerRange,
        esrb: game.esrb,
        condition: game.condition,
        publisher: game.publisher,
        description: game.description,
        delivery: game.delivery,
      });
    }
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const seedDatabse = async () => {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
    await insertGames();
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabse();
