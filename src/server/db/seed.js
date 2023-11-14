const db = require("./client");
const { createUser } = require("./users");
const { faker } = require("@faker-js/faker");
const { createHardware } = require("./hardware");
const { createMerch } = require("./merch");
const { createGame } = require("./games");
const {
  createCart,
  createCartGame,
  createCartMerch,
  createCartHardware,
} = require("./cart");
const usersData = [];
const gamesData = [];
const merchData = [];
const hardwareData = [];
const cartData = [];
const cartItemGames = [];
const cartItemMerch = [];
const cartItemHardware = [];

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
  //fake games in cart
  const fakeCartItem1 = {
    cart_id: 1,
    games_item_id: 1,
    quantity: 2,
  };
  const fakeCartItem2 = {
    cart_id: 2,
    games_item_id: 2,
    quantity: 1,
  };
  const fakeCartItem3 = {
    cart_id: 3,
    games_item_id: 3,
    quantity: 4,
  };
  cartItemGames.push(fakeCartItem1);
  cartItemGames.push(fakeCartItem2);
  cartItemGames.push(fakeCartItem3);
  //fake merch in cart
  const fakeCartItem4 = {
    cart_id: 1,
    merch_item_id: 1,
    quantity: 2,
  };
  const fakeCartItem5 = {
    cart_id: 2,
    merch_item_id: 2,
    quantity: 3,
  };

  const fakeCartItem6 = {
    cart_id: 3,
    merch_item_id: 3,
    quantity: 1,
  };

  cartItemMerch.push(fakeCartItem4);
  cartItemMerch.push(fakeCartItem5);
  cartItemMerch.push(fakeCartItem6);

  const fakeCartItem7 = {
    cart_id: 1,
    hardware_item_id: 1,
    quantity: 1,
  };
  const fakeCartItem8 = {
    cart_id: 2,
    hardware_item_id: 2,
    quantity: 2,
  };
  const fakeCartItem9 = {
    cart_id: 3,
    hardware_item_id: 3,
    quantity: 3,
  };

  cartItemHardware.push(fakeCartItem7);
  cartItemHardware.push(fakeCartItem8);
  cartItemHardware.push(fakeCartItem9);
};

const seedMerch = () => {
  const conditionArray = ["New", "Used", "Refurbished"];
  const randomCondition = Math.floor(Math.random() * conditionArray.length);
  const deliveryArray = ["Same Day", "Two Day Delivery", "Next Day Delivery"];
  const randomDelivery = Math.floor(Math.random() * deliveryArray.length);
  const featuredArray = [true, false];
  const randomFeature = Math.floor(Math.random() * featuredArray.length);
  // create 10 merchandise items
  const merchandise1 = {
    stripe_id: "price_1OAZogHfk6TyDeClPok77okA",
    productName: "Assassin's Creed Hoodie",
    type: "Apparel",
    delivery: deliveryArray[randomDelivery],
    price: 39.99,
    stock: 100,
    condition: "New",
    description:
      "Stay stylish and comfortable with this Assassin's Creed-themed hoodie.",
    manufacturer: "Ubisoft Merchandise",
    productImage:
      "https://pertlybeast.com/302-large_default/hoodie-assassin-s-creed.jpg",
    featured: true,
  };

  const merchandise2 = {
    stripe_id: "price_1OAZp1Hfk6TyDeCl1tG6G3K2",
    productName: "Legend of Zelda Backpack",
    type: "Accessories",
    delivery: deliveryArray[randomDelivery],
    price: 49.99,
    stock: 75,
    condition: "New",
    description:
      "Carry your gear with pride in this Legend of Zelda-themed backpack.",
    manufacturer: "Nintendo Gear",
    productImage:
      "https://banzika.com.br/image/cache/catalog/data/produtos/NEW%20MOUSEPADS/OVER/21/6GVF5DV98-1100x1100.jpg",
    featured: false,
  };

  const merchandise3 = {
    stripe_id: "price_1OAZpWHfk6TyDeCl8LVT87vY",
    productName: "Overwatch Mousepad",
    type: "Peripherals",
    delivery: deliveryArray[randomDelivery],
    price: 14.99,
    stock: 120,
    condition: "New",
    description:
      "Enhance your gaming setup with this Overwatch-themed mousepad.",
    manufacturer: "Blizzard Gear",
    productImage:
      "https://3.bp.blogspot.com/-k2D_vv3mX5c/XsE507i_rOI/AAAAAAAAlvU/qMUh9-JA66884xtwbLTlTuxRdvyJRIARQCLcBGAsYHQ/s800/Creeper-Mini-Crafter-4.5-Inch-Plush-Jinx-1.jpg",
    featured: false,
  };

  const merchandise4 = {
    stripe_id: "price_1OAZpsHfk6TyDeClXpy2T1Cr",
    productName: "Minecraft Creeper Plushie",
    type: "Toys",
    delivery: deliveryArray[randomDelivery],
    price: 19.99,
    stock: 50,
    condition: "New",
    description: "Cuddle up with this adorable Minecraft Creeper plushie.",
    manufacturer: "Mojang Merch",
    productImage:
      "https://3.bp.blogspot.com/-k2D_vv3mX5c/XsE507i_rOI/AAAAAAAAlvU/qMUh9-JA66884xtwbLTlTuxRdvyJRIARQCLcBGAsYHQ/s800/Creeper-Mini-Crafter-4.5-Inch-Plush-Jinx-1.jpg",
    featured: true,
  };

  const merchandise5 = {
    stripe_id: "price_1OAZqHHfk6TyDeCl1EVBRK40",
    productName: "Fortnite Water Bottle",
    type: "Collectibles",
    delivery: deliveryArray[randomDelivery],
    price: 9.99,
    stock: 90,
    condition: "New",
    description:
      "Stay hydrated on your gaming adventures with this Fortnite-themed water bottle.",
    manufacturer: "Epic Games Store",
    productImage:
      "https://www.luluhypermarket.com/medias/1725020-01.jpg-515Wx515H?context=bWFzdGVyfGltYWdlc3wzMzc5M3xpbWFnZS9qcGVnfGgxNS9oZjgvMTAzMzYxOTU3MDY5MTAvMTcyNTAyMC0wMS5qcGdfNTE1V3g1MTVIfGNmNDdjNTI0YzBiODVmYzFlOGJkMmVlMWQ4ZWYxYjc3NWJlZWM1Yjk5ZjNjYWJiYzJmOGMxNTI1OGU0OGVhNzI",
    featured: false,
  };
  merchData.push(merchandise1);
  merchData.push(merchandise2);
  merchData.push(merchandise3);
  merchData.push(merchandise4);
  merchData.push(merchandise5);
};

const seedHardware = () => {
  const conditionArray = ["New", "Used", "Refurbished"];
  const randomCondition = Math.floor(Math.random() * conditionArray.length);
  const deliveryArray = ["Same Day", "Two Day Delivery", "Next Day Delivery"];
  const randomDelivery = Math.floor(Math.random() * deliveryArray.length);
  const featuredArray = [true, false];
  const randomFeature = Math.floor(Math.random() * featuredArray.length);

  const hardware1 = {
    stripe_id: "price_1OAZs2Hfk6TyDeClWaFi3x14",
    productName: "Razer DeathAdder Elite",
    type: "Mouse",
    manufacturer: "Razer",
    delivery: "Same Day",
    price: 69.99,
    stock: 150,
    condition: "New",
    description: "High-precision gaming mouse with customizable RGB lighting.",
    productImage:
      "https://assets.razerzone.com/press/deathadder/razer-deathadder-elite.png",
    featured: false,
  };
  const hardware2 = {
    stripe_id: "price_1OAZsOHfk6TyDeClpgzRFBC6",
    productName: "Corsair K95 RGB Platinum XT",
    type: "Keyboard",
    manufacturer: "Corsair",
    delivery: "Same Day",
    price: 19.99,
    stock: 100,
    condition: "New",
    description:
      "Mechanical gaming keyboard with Cherry MX switches and RGB lighting.",
    productImage:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6394/6394003cv12d.jpg",
    featured: true,
  };
  const hardware3 = {
    stripe_id: "price_1OAZskHfk6TyDeClXhfC99wL",
    productName: "HyperX Cloud II",
    type: "Headset",
    manufacturer: "HyperX",
    delivery: "Two Day Delivery",
    price: 89.99,
    stock: 120,
    condition: "New",
    description:
      "Over-ear gaming headset with virtual 7.1 surround sound and detachable microphone.",
    productImage:
      "https://i.pcmag.com/imagery/reviews/06g43wkwvluqEmcw4BKLE8s-3.fit_scale.size_760x427.v1569471699.jpg",
    featured: false,
  };
  const hardware4 = {
    stripe_id: "price_1OAZt4Hfk6TyDeCluMDXLznj",
    productName: "NVIDIA GeForce RTX 3080",
    type: "Graphics Card",
    manufacturer: "NVIDIA",
    delivery: "Two Day Delivery",
    price: 799.99,
    stock: 50,
    condition: "New",
    description:
      "Powerful graphics card for high-end gaming and content creation.",
    productImage:
      "https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ampere/rtx-3080/images/design/geforce-rtx-3080-1-960.jpg",
    featured: false,
  };
  const hardware5 = {
    stripe_id: "price_1OAZtKHfk6TyDeClbRZp5bKt",
    productName: "Dell Alienware AW3420DW",
    type: "Monitor",
    manufacturer: "Dell",
    delivery: "Next Day Delivery",
    price: 999.99,
    stock: 80,
    condition: "New",
    description:
      "34-inch curved gaming monitor with G-Sync and 120Hz refresh rate.",
    productImage:
      "https://c1.neweggimages.com/productimage/nb640/B8H9D22110801G9IEB8.jpg",
    featured: true,
  };
  hardwareData.push(hardware1);
  hardwareData.push(hardware2);
  hardwareData.push(hardware3);
  hardwareData.push(hardware4);
  hardwareData.push(hardware5);
};

// Add more user objects as needed
const seedGames = () => {
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
    stripe_id: "price_1OAZliHfk6TyDeCl3kcd9qG9",
    productName: "The Legend of Zelda: Breath of the Wild",
    genre: "Action-Adventure",
    delivery: deliveryArray[randomDelivery],
    price: 59.99,
    stock: 100,
    condition: "New",
    description:
      "Explore the vast world of Hyrule in this action-packed adventure.",
    publisher: "Nintendo",
    productImage:
      "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58",
    playerRange: "Single Player",
    esrb: "E10+",
    featured: false,
  };
  const videoGame2 = {
    stripe_id: "price_1OAZmkHfk6TyDeCliOZf7gyW",
    productName: "Fortnite",
    genre: "Battle Royale",
    delivery: "Digital Download",
    price: 0.0,
    stock: 500,
    condition: "New",
    description: "Join the battle royale and build to outlast your opponents.",
    publisher: "Epic Games",
    productImage:
      "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000010192/2e8af138c432e81ce6b1fceb510b39b0544081417c6fe403465a99603a7b7a4d",
    playerRange: "Multiplayer",
    esrb: "T",
    featured: false,
  };
  const videoGame3 = {
    stripe_id: "price_1OAZnDHfk6TyDeClPzFwXPUV",
    productName: "FIFA 23",
    genre: "Sports",
    delivery: "Physical Disc",
    price: 49.99,
    stock: 75,
    condition: "New",
    description: "Play the latest edition of the popular FIFA soccer series.",
    publisher: "Electronic Arts",
    productImage: "https://m.media-amazon.com/images/I/71iJkhHSlQL.jpg",
    playerRange: "Multiplayer",
    esrb: "E",
    featured: false,
  };
  const videoGame4 = {
    stripe_id: "price_1OAZndHfk6TyDeClJ9PCdRcF",
    productName: "Call of Duty: Modern Warfare",
    genre: "First-Person Shooter",
    delivery: "Digital Download",
    price: 59.99,
    stock: 100,
    condition: "Used",
    description:
      "Experience realistic and intense modern warfare in this action-packed FPS game.",
    publisher: "Activision",
    productImage:
      "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/kronos/common/social-share/social-share-image.jpg",
    playerRange: "Singleplayer, Multiplayer",
    esrb: "M",
    featured: false,
  };
  const videoGame5 = {
    stripe_id: "price_1OAZnwHfk6TyDeClTydWaZUe",
    productName: "The Elder Scrolls V: Skyrim",
    genre: "Role-Playing Game",
    delivery: "Physical Copy",
    price: 39.99,
    stock: 50,
    condition: "Used",
    description:
      "Embark on an epic open-world adventure in this critically acclaimed RPG.",
    publisher: "Bethesda Softworks",
    productImage:
      "https://image.api.playstation.com/vulcan/ap/rnd/202110/2019/aDSOgerXg4V6sf5A7VzHiTun.jpg",
    playerRange: "Single Player",
    esrb: "M",
    featured: true,
  };
  gamesData.push(videoGame1);
  gamesData.push(videoGame2);
  gamesData.push(videoGame3);
  gamesData.push(videoGame4);
  gamesData.push(videoGame5);
};
//Using the CASCADE keyword after a table to be dropped indicates that the table itself
// will be dropped as well as the tables that depend on it (e.g., tables that utilize that tables' keys as foreign keys)
const dropTables = async () => {
  try {
    await db.query(`
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS hardware CASCADE;
        DROP TABLE IF EXISTS merch CASCADE;
        DROP TABLE IF EXISTS games CASCADE;
        DROP TABLE IF EXISTS shopping_cart CASCADE;
        DROP TABLE IF EXISTS shopping_cart_hardware CASCADE;
        DROP TABLE IF EXISTS shopping_cart_games CASCADE;
        DROP TABLE IF EXISTS shopping_cart_merch CASCADE;
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
          stripe_id VARCHAR(255) NOT NULL,
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
          stripe_id VARCHAR(255) NOT NULL,
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
          stripe_id VARCHAR(255) NOT NULL,
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

      CREATE TABLE shopping_cart_games(
        id SERIAL PRIMARY KEY,
        cart_id INT NOT NULL,
        games_item_id INT,
        quantity INT,
        CONSTRAINT fk_shopcartitem_shopcart FOREIGN KEY (cart_id) REFERENCES
        shopping_cart (id),
        CONSTRAINT fk_shopcartitem_gamesitemid FOREIGN KEY (games_item_id) REFERENCES 
        games (id)
        );

      CREATE TABLE shopping_cart_merch(
        id SERIAL PRIMARY KEY,
        cart_id INT NOT NULL,
        merch_item_id INT,
        quantity INT,
        CONSTRAINT fk_shopcartitem_shopcart FOREIGN KEY (cart_id) REFERENCES
        shopping_cart (id),
        CONSTRAINT fk_shopcartitem_merchitemid FOREIGN KEY (merch_item_id) REFERENCES 
        merch (id)
      );

      CREATE TABLE shopping_cart_hardware(
        id SERIAL PRIMARY KEY,
        cart_id INT NOT NULL,
        hardware_item_id INT,
        quantity INT,
        CONSTRAINT fk_shopcartitem_shopcart FOREIGN KEY (cart_id) REFERENCES
        shopping_cart (id),
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
        stripe_id: merch.stripe_id,
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
        stripe_id: hardware.stripe_id,
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
    console.log("Hardware data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data for hardware");
  }
};

const insertGame = async () => {
  try {
    console.log(gamesData);
    for (const game of gamesData) {
      await createGame({
        stripe_id: game.stripe_id,
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
    console.log("Successfully inserted game seed data");
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

const insertCartGames = async () => {
  try {
    console.log(cartItemGames);
    for (const item of cartItemGames) {
      console.log(item);
      await createCartGame({
        cart_id: item.cart_id,
        games_item_id: item.games_item_id,
        quantity: item.quantity,
      });
    }
    console.log("Seed data for shopping_cart_games inserted successfully");
  } catch (error) {
    console.error("Error inserting cart game seed data for cart items");
  }
};

const insertCartMerch = async () => {
  try {
    console.log(cartItemMerch);
    for (const item of cartItemMerch) {
      console.log(item);
      await createCartMerch({
        cart_id: item.cart_id,
        merch_item_id: item.merch_item_id,
        quantity: item.quantity,
      });
    }
    console.log("Seed data for shopping_cart_merch inserted successfully");
  } catch (error) {
    console.error("Error inserting cart merch seed data for cart items");
  }
};

const insertCartHardware = async () => {
  try {
    console.log(cartItemHardware);
    for (const item of cartItemHardware) {
      console.log(item);
      await createCartHardware({
        cart_id: item.cart_id,
        hardware_item_id: item.hardware_item_id,
        quantity: item.quantity,
      });
    }
    console.log("Seed data for shopping_cart_hardware inserted successfully");
  } catch (error) {
    console.error("Error inserting cart hardware seed data for cart items");
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
    await insertCartGames();
    await insertCartMerch();
    await insertCartHardware();
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabase();
