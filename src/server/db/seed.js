const db = require("./client");
const { createUser } = require("./users");
const { faker } = require("@faker-js/faker");
const { createHardware } = require("./createHardware");
const { createMerch } = require("./merch");
const { createGame } = require("./games");
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

const seedMerch = () => {
  const conditionArray = ["New", "Used", "Refurbished"];
  const randomCondition = Math.floor(Math.random() * conditionArray.length);
  const deliveryArray = ["Same Day", "Two Day Delivery", "Next Day Delivery"];
  const randomDelivery = Math.floor(Math.random() * deliveryArray.length);
  // create 25 merchandise items
  for (let i = 0; i < 3; i++) {
    let fakeMerch = {
      productName: faker.commerce.productName(),
      type: faker.commerce.product(),
      delivery: deliveryArray[randomDelivery],
      price: faker.commerce.price(),
      stock: Math.floor(Math.random() * 100.0),
      condition: conditionArray[randomCondition],
      description: faker.commerce.productDescription(),
      manufacturer: faker.word.words(),
      productImage: faker.image.url(),
    };
    merchData.push(fakeMerch);
  }
};

const seedHardware = () => {
  const conditionArray = ["New", "Used", "Refurbished"];
  const randomCondition = Math.floor(Math.random() * conditionArray.length);
  const deliveryArray = ["Same Day", "Two Day Delivery", "Next Day Delivery"];
  const randomDelivery = Math.floor(Math.random() * deliveryArray.length);
  // create 25 hardware items
  for (let i = 0; i < 3; i++) {
    let fakeHardware = {
      productName: faker.commerce.productName(),
      type: faker.commerce.product(),
      manufacturer: faker.word.words(),
      price: faker.commerce.price(),
      stock: Math.floor(Math.random() * 100.0),
      condition: conditionArray[randomCondition],
      description: faker.commerce.productDescription(),
      delivery: deliveryArray[randomDelivery],
      productImage: faker.image.url(),
    };
    hardwareData.push(fakeHardware);
  }
};

// Add more user objects as needed
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
        DROP TABLE IF EXISTS merch;
        DROP TABLE IF EXISTS hardware;
        DROP TABLE IF EXISTS games;
        `);
  } catch (err) {
    throw err;
  }
};

const createTables = async () => {
  try {
    console.log("Building all Tables...");
    await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            isAdmin BOOLEAN default false
        );


        CREATE TABLE merch(
          id SERIAL PRIMARY KEY,
          productName VARCHAR(255) NOT NULL,
          type VARCHAR(255) NOT NULL,
          delivery VARCHAR(255) NOT NULL,
          price NUMERIC (15,2) NOT NULL,
          stock NUMERIC (15,2) NOT NULL,
          condition VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          manufacturer VARCHAR(255) NOT NULL,
          productImage VARCHAR(255) NOT NULL 
        );

        CREATE TABLE hardware(
          id SERIAL PRIMARY KEY,
          productName VARCHAR(255) NOT NULL,
          type VARCHAR(255) NOT NULL,
          manufacturer VARCHAR(255) NOT NULL,
          delivery VARCHAR(255) NOT NULL,
          price NUMERIC (15,2) NOT NULL,
          stock NUMERIC (15,2) NOT NULL,
          condition VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          productImage VARCHAR(255) NOT NULL 
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
    console.error("Error inserting seed data:", error);
  }
};

const insertMerch = async () => {
  try {
    console.log(merchData);
    for (const merch of merchData) {
      await createMerch({
        productName: merch.productName,
        type: merch.type,
        delivery: merch.delivery,
        price: merch.price,
        stock: merch.stock,
        condition: merch.condition,
        description: merch.description,
        manufacturer: merch.manufacturer,
        productImage: merch.productImage,
      });
    }
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const insertHardware = async () => {
  try {
    console.log(hardwareData);
    for (const hardware of hardwareData) {
      await createHardware({
        productName: hardware.productName,
        type: hardware.type,
        manufacturer: hardware.manufacturer,
        price: hardware.price,
        stock: hardware.stock,
        condition: hardware.condition,
        description: hardware.description,
        delivery: hardware.delivery,
        productImage: hardware.productImage,
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
    seedMerch();
    seedHardware();
    await dropTables();
    await createTables();
    await insertUsers();
    await insertMerch();
    await insertHardware();
    await insertGames();
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabase();