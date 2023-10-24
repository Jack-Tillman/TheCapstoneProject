const db = require("./client");
const { createUser } = require("./users");
const { faker } = require("@faker-js/faker");
const { createHardware } = require("./createHardware");
const { createMerch } = require("./createMerch");
const usersData = [];
const merchData = [];
const hardwareData = [];

const seedUsers = () => {
  // create 25 fake users
  for (let i = 0; i < 3; i++) {
    let fakeUsers = {
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

const dropTables = async () => {
  try {
    await db.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS merch;
        DROP TABLE IF EXISTS hardware;
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

        `);
  } catch (err) {
    throw err;
  }
};

const insertUsers = async () => {
  try {
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

const seedDatabase = async () => {
  try {
    db.connect();
    seedUsers();
    seedMerch();
    seedHardware();
    await dropTables();
    await createTables();
    await insertUsers();
    await insertMerch();
    await insertHardware();
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabase();

// {
//   name: "Emily Johnson",
//   email: "emily@example.com",
//   password: "securepass",
//   isAdmin: false,

// },
// {
//   name: "Liu Wei",
//   email: "liu@example.com",
//   password: "strongpass",
// },
// {
//   name: "Isabella García",
//   email: "bella@example.com",
//   password: "pass1234",
// },
// {
//   name: "Mohammed Ahmed",
//   email: "mohammed@example.com",
//   password: "mysecretpassword",
// },
// {
//   name: "John Smith",
//   email: "john@example.com",
//   password: "password123",
// },
