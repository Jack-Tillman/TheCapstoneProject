const db = require("./client");
const { createUser } = require("./users");
const { faker } = require("@faker-js/faker");
const { createHardware } = require("./hardware");
const { createMerch } = require("./merch");
const { createGame } = require("./games");
const { createCart, createCartItem } = require("./cart");
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
  for (let i = 0; i < 1; i++) {
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
    const fakeCart4 = {
      user_id: 4,
      total: 8,
    };
    const fakeCart5 = {
      user_id: 5,
      total: 60,
    };
    const fakeCart6 = {
      user_id: 6,
      total: 80,
    };
    const fakeCart7 = {
      user_id: 7,
      total: 120,
    };
    const fakeCart8 = {
      user_id: 7,
      total: 23,
    };
    cartData.push(fakeCart1);
    cartData.push(fakeCart2);
    cartData.push(fakeCart3);
    cartData.push(fakeCart4);
    cartData.push(fakeCart5);
    cartData.push(fakeCart6);
    cartData.push(fakeCart7);
    cartData.push(fakeCart8);
  }
};

const seedCartItems = () => {
  const fakeCartItem1 = {
    cart_id: 1,
    games_item_id: 0,
    merch_item_id: 3,
    hardware_item_id: 0,
    quantity: 2,
  };

  const fakeCartItem2 = {
    cart_id: 2,
    games_item_id: 2,
    merch_item_id: 0,
    hardware_item_id: 0,
    quantity: 3,
  };

  const fakeCartItem3 = {
    cart_id: 2,
    games_item_id: 0,
    merch_item_id: 0,
    hardware_item_id: 1,
    quantity: 4,
  };

  const fakeCartItem4 = {
    cart_id: 3,
    games_item_id: 0,
    merch_item_id: 1,
    hardware_item_id: 0,
    quantity: 1,
  };
  const fakeCartItem5 = {
    cart_id: 3,
    games_item_id: 3,
    merch_item_id: 0,
    hardware_item_id: 0,
    quantity: 1,
  };
  const fakeCartItem6 = {
    cart_id: 3,
    games_item_id: 0,
    merch_item_id: 0,
    hardware_item_id: 1,
    quantity: 1,
  };
  cartItemData.push(fakeCartItem1);
  cartItemData.push(fakeCartItem2);
  cartItemData.push(fakeCartItem3);
  cartItemData.push(fakeCartItem4);
  cartItemData.push(fakeCartItem5);
  cartItemData.push(fakeCartItem6);
};

const seedMerch = () => {
  const conditionArray = ["New", "Used", "Refurbished"];
  const randomCondition = Math.floor(Math.random() * conditionArray.length);
  const deliveryArray = ["Same Day", "Two Day Delivery", "Next Day Delivery"];
  const randomDelivery = Math.floor(Math.random() * deliveryArray.length);
  const featuredArray = [true, false];
  const randomFeature = Math.floor(Math.random() * featuredArray.length);
  // create 10 merchandise items
  for (let i = 0; i < 2; i++) {
    const merchandise1 = {
      id: 1,
      productName: "Assassin's Creed Hoodie",
      type: "Apparel",
      delivery: deliveryArray[randomDelivery],
      price: 39.99,
      stock: 100,
      condition: "New",
      description:
        "Stay stylish and comfortable with this Assassin's Creed-themed hoodie.",
      manufacturer: "Ubisoft Merchandise",
      productImage: "assassins_creed_hoodie.jpg",
      featured: true,
    };

    const merchandise2 = {
      id: 2,
      productName: "Legend of Zelda Backpack",
      type: "Accessories",
      delivery: deliveryArray[randomDelivery],
      price: 49.99,
      stock: 75,
      condition: "New",
      description:
        "Carry your gear with pride in this Legend of Zelda-themed backpack.",
      manufacturer: "Nintendo Gear",
      productImage: "zelda_backpack.jpg",
      featured: false,
    };

    const merchandise3 = {
      id: 3,
      productName: "Overwatch Mousepad",
      type: "Peripherals",
      delivery: deliveryArray[randomDelivery],
      price: 14.99,
      stock: 120,
      condition: "New",
      description:
        "Enhance your gaming setup with this Overwatch-themed mousepad.",
      manufacturer: "Blizzard Gear",
      productImage: "overwatch_mousepad.jpg",
      featured: false,
    };

    const merchandise4 = {
      id: 4,
      productName: "Minecraft Creeper Plushie",
      type: "Toys",
      delivery: deliveryArray[randomDelivery],
      price: 19.99,
      stock: 50,
      condition: "New",
      description: "Cuddle up with this adorable Minecraft Creeper plushie.",
      manufacturer: "Mojang Merch",
      productImage: "minecraft_plushie.jpg",
      featured: true,
    };

    const merchandise5 = {
      id: 5,
      productName: "Fortnite Water Bottle",
      type: "Collectibles",
      delivery: deliveryArray[randomDelivery],
      price: 9.99,
      stock: 90,
      condition: "New",
      description:
        "Stay hydrated on your gaming adventures with this Fortnite-themed water bottle.",
      manufacturer: "Epic Games Store",
      productImage: "fortnite_water_bottle.jpg",
      featured: false,
    };
    merchData.push(merchandise1);
    merchData.push(merchandise2);
    merchData.push(merchandise3);
    merchData.push(merchandise4);
    merchData.push(merchandise5);
  }
};

const seedHardware = () => {
  const conditionArray = ["New", "Used", "Refurbished"];
  const randomCondition = Math.floor(Math.random() * conditionArray.length);
  const deliveryArray = ["Same Day", "Two Day Delivery", "Next Day Delivery"];
  const randomDelivery = Math.floor(Math.random() * deliveryArray.length);
  const featuredArray = [true, false];
  const randomFeature = Math.floor(Math.random() * featuredArray.length);
  // create 10 hardware items
  for (let i = 0; i < 2; i++) {
    const hardware1 = {
      id: 1,
      productName: "Razer DeathAdder Elite",
      type: "Mouse",
      manufacturer: "Razer",
      delivery: deliveryArray[randomDelivery],
      price: 69.99,
      stock: 150,
      condition: "New",
      description:
        "High-precision gaming mouse with customizable RGB lighting.",
      productImage: "razer_deathadder.jpg",
      featured: false,
    };
    const hardware2 = {
      id: 2,
      productName: "Corsair K95 RGB Platinum XT",
      type: "Keyboard",
      manufacturer: "Corsair",
      delivery: deliveryArray[randomDelivery],
      price: 199.99,
      stock: 100,
      condition: "New",
      description:
        "Mechanical gaming keyboard with Cherry MX switches and RGB lighting.",
      productImage: "corsair_k95.jpg",
      featured: true,
    };
    const hardware3 = {
      id: 3,
      productName: "HyperX Cloud II",
      type: "Headset",
      manufacturer: "HyperX",
      delivery: deliveryArray[randomDelivery],
      price: 89.99,
      stock: 120,
      condition: "New",
      description:
        "Over-ear gaming headset with virtual 7.1 surround sound and detachable microphone.",
      productImage: "hyperx_cloud_ii.jpg",
      featured: false,
    };
    const hardware4 = {
      id: 4,
      productName: "NVIDIA GeForce RTX 3080",
      type: "Graphics Card",
      manufacturer: "NVIDIA",
      delivery: deliveryArray[randomDelivery],
      price: 799.99,
      stock: 50,
      condition: "New",
      description:
        "Powerful graphics card for high-end gaming and content creation.",
      productImage: "rtx_3080.jpg",
      featured: false,
    };
    const hardware5 = {
      id: 5,
      productName: "Dell Alienware AW3420DW",
      type: "Monitor",
      manufacturer: "Dell",
      delivery: deliveryArray[randomDelivery],
      price: 999.99,
      stock: 80,
      condition: "New",
      description:
        "34-inch curved gaming monitor with G-Sync and 120Hz refresh rate.",
      productImage: "alienware_aw3420dw.jpg",
      featured: true,
    };
    hardwareData.push(hardware1);
    hardwareData.push(hardware2);
    hardwareData.push(hardware3);
    hardwareData.push(hardware4);
    hardwareData.push(hardware5);
  }
};

// Add more user objects as needed
const seedGames = () => {
  for (let i = 0; i < 2; i++) {
    //these 8 variables are temporary measure to introduce random variety to seeded data
    const esrbArray = ["E", "E10", "T", "M"];
    const randomEsrb = Math.floor(Math.random() * esrbArray.length);
    const playerRangeArray = ["Singleplayer", "Multiplayer"];
    const randomRange = Math.floor(Math.random() * playerRangeArray.length);
    const conditionArray = ["New", "Used", "Refurbished"];
    const randomCondition = Math.floor(Math.random() * conditionArray.length);
    const deliveryArray = ["Same Day", "Pickup", "Will deliver"];
    const randomDelivery = Math.floor(Math.random() * deliveryArray.length);
    const featuredArray = [true, false];
    const randomFeature = Math.floor(Math.random() * featuredArray.length);

    const videoGame1 = {
      productName: "The Legend of Zelda: Breath of the Wild",
      genre: "Action-Adventure",
      delivery: deliveryArray[randomDelivery],
      price: 59.99,
      stock: 100,
      condition: "New",
      description:
        "Explore the vast world of Hyrule in this action-packed adventure.",
      publisher: "Nintendo",
      productImage: "zelda_image.jpg",
      playerRange: "Single Player",
      esrb: "E10+",
      featured: false,
    };
    const videoGame2 = {
      productName: "Fortnite",
      genre: "Battle Royale",
      delivery: "Digital Download",
      price: 0.0,
      stock: 500,
      condition: "New",
      description:
        "Join the battle royale and build to outlast your opponents.",
      publisher: "Epic Games",
      productImage: "fortnite_image.jpg",
      playerRange: "Multiplayer",
      esrb: "T",
      featured: false,
    };
    const videoGame3 = {
      productName: "FIFA 23",
      genre: "Sports",
      delivery: "Physical Disc",
      price: 49.99,
      stock: 75,
      condition: "New",
      description: "Play the latest edition of the popular FIFA soccer series.",
      publisher: "Electronic Arts",
      productImage: "fifa23_image.jpg",
      playerRange: "Multiplayer",
      esrb: "E",
      featured: false,
    };
    const videoGame4 = {
      productName: "Call of Duty: Modern Warfare",
      genre: "First-Person Shooter",
      delivery: "Digital Download",
      price: 59.99,
      stock: 100,
      condition: "Used",
      description:
        "Experience realistic and intense modern warfare in this action-packed FPS game.",
      publisher: "Activision",
      productImage: "cod_modern_warfare.jpg",
      playerRange: "Singleplayer, Multiplayer",
      esrb: "M",
      featured: false,
    };
    const videoGame5 = {
      productName: "The Elder Scrolls V: Skyrim",
      genre: "Role-Playing Game",
      delivery: "Physical Copy",
      price: 39.99,
      stock: 50,
      condition: "Used",
      description:
        "Embark on an epic open-world adventure in this critically acclaimed RPG.",
      publisher: "Bethesda Softworks",
      productImage: "skyrim.jpg",
      playerRange: "Single Player",
      esrb: "M",
      featured: true,
    };
    gamesData.push(videoGame1);
    gamesData.push(videoGame2);
    gamesData.push(videoGame3);
    gamesData.push(videoGame4);
    gamesData.push(videoGame5);
  }
};
//Using the CASCADE keyword after a table to be dropped indicates that the table itself
// will be dropped as well as the tables that depend on it (e.g., tables that utilize that tables' keys as foreign keys)
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
          productImage VARCHAR(255) NOT NULL,
          featured BOOLEAN default false
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
          productImage VARCHAR(255) NOT NULL,
          featured BOOLEAN default false
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
          esrb VARCHAR(255) NOT NULL,
          featured BOOLEAN default false
      );

      CREATE TABLE shopping_cart(
        id SERIAL PRIMARY KEY,
        user_id INT,
        total NUMERIC(15,2),
        CONSTRAINT fk_shopcart_user FOREIGN KEY (user_id) REFERENCES users (id)
      );

      CREATE TABLE shopping_cart_item(
        id SERIAL PRIMARY KEY,
        cart_id INT NOT NULL,
        games_item_id INT,
        merch_item_id INT,
        hardware_item_id INT,
        quantity INT,
        CONSTRAINT fk_shopcartitem_shopcart FOREIGN KEY (cart_id) REFERENCES
        shopping_cart (id),
        CONSTRAINT fk_shopcartitem_gamesitemid FOREIGN KEY (games_item_id) REFERENCES 
        games (id),
        CONSTRAINT fk_shopcartitem_merchitemid FOREIGN KEY (merch_item_id) REFERENCES 
        merch (id),
        CONSTRAINT fk_shopcartitem_hardwareitemid FOREIGN KEY (hardware_item_id) REFERENCES 
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
        featured: merch.featured,
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
        featured: hardware.featured,
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
        featured: game.featured,
      });
    }
  } catch (error) {
    console.error("Error inserting games seed data for games");
  }
};

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
