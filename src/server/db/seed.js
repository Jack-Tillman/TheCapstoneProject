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

/* 
Potential data structure for the cart:


1) 


cart1 = {
  cartId: 1,
  userId: 2,
  Games: [
    {
      gamesId: 3,
      productName: "The best game",
      productImage: "imgur.com",
    },
    {
      gamesId: 5,
      productName: "The worst game",
      productImage: "imgur.com", 
      etc
    },
  ],
  Merch: [
    {
      merchId: 433,
      productName: "Minecraft T-Shirt, Limited Edition Extra Rare",
      productImage: "imgur.com",
    },
  ],
  Hardware: [
    {
      hardwareId: 12,
      productName: "USB Drive",
      productImage: "your-imagination.gov",
    },
    {
        hardwareId: 47,
        productName: "USB Drive with sunglasses",
        productImage: "your-imagination.gov",
    }
  ],
};

2) 


// games, merch, hardware properties store the productId of the item added to cart 
cart2 = {
  cartId: 1,
  userId: 2,
  Games: [1, 5, 9],
  Merch: [123, 728, 9],
  Hardware: [9]
};


#2 makes most sense to me right now; we use userId as a foreign key to link the user's account to 
their cart. cartId can be useful if you wanted to interact with a specific cart I guess
When user adds an item to cart, it will go into one of three tables based off what it is (games go in games table, etc)
Should we store the entire product object, or stick to just the productId? If we store the entire product object,
that would remove the need to search for the product object by its id; however, this would likely impact performance? Not sure. If we 
store just the productId, then when the user wants to look at their cart, that productId would need to be used 
to fetch the relevant object data for stuff like productname, image, etc. 

*/