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
  for (let i = 0; i < 2; i++) {
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
  const esrbArray = ["E", "E10", "T", "M"];
  const randomEsrb = Math.floor(Math.random() * esrbArray.length);
  const playerRangeArray = ["Singleplayer", "Multiplayer"];
  const randomRange = Math.floor(Math.random() * playerRangeArray.length);
  const conditionArray = ["New", "Used", "Refurbished"];
  const randomCondition = Math.floor(Math.random() * conditionArray.length);
  const deliveryArray = ["Same Day", "Pickup", "Will deliver"];
  const randomDelivery = Math.floor(Math.random() * deliveryArray.length);

  for (let i = 0; i < 2; i++) {
    const fakeGames = {
      productName: `${faker.commerce.productName()}, the Game`,
      //generates a price between 0-100; want this to be a decimal like 42.00 rather than 42
      price: Math.floor(Math.random() * 100.00),
      productImage: faker.image.url(),
      genre: faker.word.words(),
      playerRange: playerRangeArray[randomRange],
      esrb: esrbArray[randomEsrb],
      condition: conditionArray[randomCondition],
      publisher: faker.word.words(),
      description: faker.commerce.productDescription(),
      delivery: deliveryArray[randomDelivery],
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
          price NUMERIC(15,2),
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
    console.error("Error inserting seed data:", error);
  }
};

const insertGames = async () => {
  try {
    console.log(gamesData);
    for (const game of gamesData) {
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