const db = require("./client");
const { createUser } = require("./users");
const { createGame } = require("./games");
const { faker } = require("@faker-js/faker");
//empty arrays that will hold faker-generated data objects that are then inserted into the appropriate table
const usersData = [];
const gamesData = [];
const merchData = [];
const hardwareData = [];

const seedUsers = () => {
  for (let i = 0; i < 5; i++) {
    const fakeUsers = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      isAdmin: false,
    };
    usersData.push(fakeUsers);
  }
};

const seedGames = () => {
  for (let i = 0; i < 5; i++) {
    //these 8 variables are temporary measure to introduce random variety to seeded data
    const esrbArray = ["E", "E10", "T", "M"];
    const randomEsrb = Math.floor(Math.random() * esrbArray.length);
    const playerRangeArray = ["Singleplayer", "Multiplayer"];
    const randomRange = Math.floor(Math.random() * playerRangeArray.length);
    const conditionArray = ["New", "Used", "Refurbished"];
    const randomCondition = Math.floor(Math.random() * conditionArray.length);
    const deliveryArray = ["Same Day", "Pickup", "Will deliver"];
    const randomDelivery = Math.floor(Math.random() * deliveryArray.length);

    const fakeGames = {
      productName: `${faker.commerce.productName()}, the Game`,
      genre: faker.word.words(),
      delivery: deliveryArray[randomDelivery],
      price: Math.floor(Math.random() * 100.0),
      stock: Math.floor(Math.random() * 100.0),
      condition: conditionArray[randomCondition],
      description: faker.commerce.productDescription(),
      publisher: faker.word.words(),
      productImage: faker.image.url(),
      playerRange: playerRangeArray[randomRange],
      esrb: esrbArray[randomEsrb],
    };
    gamesData.push(fakeGames);
  }
};

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
          genre VARCHAR(255) NOT NULL, 
          delivery VARCHAR(255) NOT NULL,
          price NUMERIC(15,2),
          stock NUMERIC(15,2),
          condition VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          publisher VARCHAR(255) NOT NULL,
          productImage VARCHAR(255) NOT NULL,
          playerRange VARCHAR(255) NOT NULL,
          esrb VARCHAR(255) NOT NULL
      );

        `);
  } catch (err) {
    throw err;
  }
};

const insertUsers = async () => {
  try {
    console.log(usersData);
    for (const user of usersData) {
      await createUser({
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
      });
    }
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting user seed data:", error);
  }
};

const insertGames = async () => {
  try {
    console.log(gamesData);
    for (const game of gamesData) {
      await createGame({
        productName: game.productName,
        genre: game.genre,
        delivery: game.delivery,
        price: game.price,
        stock: game.stock,
        condition: game.condition,
        description: game.description,
        publisher: game.publisher,
        productImage: game.productImage,
        playerRange: game.playerRange,
        esrb: game.esrb
      });
    }
  } catch (error) {
    console.error("Error inserting games seed data for games");
  }
};

const seedDatabase = async () => {
  try {
    db.connect();
    seedUsers();
    seedGames();
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

seedDatabase();
