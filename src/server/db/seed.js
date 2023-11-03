const db = require("./client");
const { createUser } = require("./users");
const { faker } = require("@faker-js/faker");
const { createHardware } = require("./hardware");
const { createMerch } = require("./merch");
const { createGame } = require("./games");
const usersData = [];
const gamesData = [];
const merchData = [];
const hardwareData = [];
const cartData = [];
const cartItemData = [];

const seedUsers = () => {
  const testAdmin = {
    name: "Admin Fella",
    email: "fake@email.com",
    password: "Password123!",
    isAdmin: true,
  };
  usersData.push(testAdmin);

  const testUser = {
    name: "Jerry Jerald",
    email: "jerry@email.com",
    password: "FakePass1!",
    isAdmin: false,
  };
  usersData.push(testUser);

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

const seedCarts = () => {
  for (let i = 0; i < 3; i++) {
    const fakeCart1 = {
      user_id: 1,
      total: 34,
    };
    const fakeCart2 = {
      user_id: 2,
      total: 4,
    };
    const fakeCart3 = {
      user_id: 3,
      total: 12,
    };
    cartData.push(fakeCart1);
    cartData.push(fakeCart2);
    cartData.push(fakeCart3);
  }
};

const seedCartItems = () => {
  for (let i = 0; i < 3; i++) {
    const fakeCartItem1 = {
      cart_id: 1,
      games_item_id: 1,
      merch_item_id: 3,
      hardware_item_id: 1,
      quantity: 2,
    };

    const fakeCartItem2 = {
      cart_id: 2,
      games_item_id: 0,
      merch_item_id: 1,
      hardware_item_id: 2,
      quantity: 3,
    };

    const fakeCartItem3 = {
      cart_id: 3,
      games_item_id: 1,
      merch_item_id: 1,
      hardware_item_id: 2,
      quantity: 2,
    };
    cartItemData.push(fakeCartItem1);
    cartItemData.push(fakeCartItem2);
    cartItemData.push(fakeCartItem3);
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
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS merch CASCADE;
        DROP TABLE IF EXISTS hardware CASCADE;
        DROP TABLE IF EXISTS games CASCADE;
        DROP TABLE IF EXISTS shopping_cart CASCADE;
        DROP TABLE IF EXISTS shopping_cart_item CASCADE;
        
        `);
  } catch (err) {
    throw err;
  }
};

/*
 * Add SKU for stripe implementation
 * Add discount table, and related discount fields to games, merch, hardware stuff  !
 */

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

      CREATE TABLE shopping_cart(
        id SERIAL PRIMARY KEY,
        user_id INT,
        total NUMERIC(15,2),
        CONSTRAINT fk_shopcart_user FOREIGN KEY (user_id) REFERENCES users (id)
      );

      CREATE TABLE shopping_cart_item(
        id SERIAL PRIMARY KEY,
        cart_id INT,
        games_item_id INT,
        merch_item_id INT,
        hardware_item_id INT,
        quantity INT,
        CONSTRAINT fk_shopcartitem_shopcart FOREIGN KEY (cart_id) REFERENCES
        shopping_cart (id),
        CONSTRAINT fk_shopcartitem_gamesitem FOREIGN KEY (games_item_id) REFERENCES 
        games (id),
        CONSTRAINT fk_shopcartitem_merchitem FOREIGN KEY (merch_item_id) REFERENCES 
        merch (id),
        CONSTRAINT fk_shopcartitem_hardwareitem FOREIGN KEY (hardware_item_id) REFERENCES 
        hardware (id)
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

const insertGame = async () => {
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
        esrb: game.esrb,
      });
    }
  } catch (error) {
    console.error("Error inserting games seed data for games");
  }
};

const createCart = async ({ user_id, total }) => {
  try {
    const {
      rows: [cart],
    } = await db.query(
      `
      INSERT INTO shopping_cart(user_id, total)
      VALUES($1, $2)
      RETURNING *`,
      [user_id, total]
    );
    return cart;
  } catch (err) {
    throw err;
  }
};

//nowhere near complete
const insertCart = async () => {
  try {
    console.log(cartData);
    for (const cart of cartData) {
      await createCart({
        user_id: cart.user_id,
        total: cart.total,
      });
    }
    console.log("Seed data for shopping_carts inserted successfully");
  } catch (error) {
    console.error("Error inserting cart seed data for carts");
  }
};
/*
games/merch/hardware_item_id are distinct because they each reference primary IDs from respective tables
cart items should only have a value in one of the 3 _item_id fields 
Error is thrown when inserting 0 into fields for any of the 3 ids, so instead, a preliminary check 
is initated to check which _item_id fields lack a non-0 number and replace them with null. 
I *think* that there is a way to add 0s to PSQL databases without the aforementioned errors, so this will
ideally be a short-term fix.
*/
const createCartItem = async ({
  cart_id,
  games_item_id,
  merch_item_id,
  hardware_item_id,
  quantity,
}) => {
  try {
    console.log(games_item_id);
    console.log(merch_item_id);
    console.log(hardware_item_id);
    if (games_item_id) {
      const {
        rows: [ item ],
      } = await db.query(
        `
        INSERT INTO shopping_cart_item(cart_id, games_item_id, merch_item_id, hardware_item_id, quantity)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *`,
        [cart_id, games_item_id, null, null, quantity]
      );
      return item;
    };
    if (merch_item_id) {
      const {
        rows: [ item ],
      } = await db.query(
        `
        INSERT INTO shopping_cart_item(cart_id, games_item_id, merch_item_id, hardware_item_id, quantity)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *`,
        [cart_id, null, merch_item_id, null, quantity]
      );
      return item;
    };
    if (hardware_item_id) {
      const {
        rows: [ item ],
      } = await db.query(
        `
        INSERT INTO shopping_cart_item(cart_id, games_item_id, merch_item_id, hardware_item_id, quantity)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *`,
        [cart_id, null, null, hardware_item_id, quantity]
      );
      return item;
    }
    else {
      console.error("No items to add to cart!");
    }
  } catch (err) {
    console.error("Error creating cart item seed data for cart items");
    throw err;
  }
};
/* 

ok so 
1) multiple checks for the destructured product_item_id 
 - if id > 0, fire off the relevant SQL query that only inserts stuff into cart_id, product item, quantity
  

*/
const insertCartItem = async () => {
  try {
    console.log(cartItemData);
    for (const item of cartItemData) {
      await createCartItem({
        cart_id: item.cart_id,
        games_item_id: item.games_item_id,
        merch_item_id: item.merch_item_id,
        hardware_item_id: item.hardware_item_id,
        quantity: item.quantity,
      });
    }
    console.log("Seed data for shopping_cart_item inserted successfully");
  } catch (error) {
    console.error("Error inserting cart item seed data for cart items");
  }
};

const seedDatabase = async () => {
  try {
    db.connect();
    seedUsers();
    seedGames();
    seedMerch();
    seedHardware();
    seedCarts();
    seedCartItems();
    await dropTables();
    await createTables();
    await insertUsers();
    await insertMerch();
    await insertHardware();
    await insertGame();
    await insertCart();
    await insertCartItem();
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabase();
