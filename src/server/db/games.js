const db = require("./client");

//get all games - functional
const getAllGames = async () => {
  try {
    const { rows } = await db.query(`
          SELECT * FROM games;
          `);
    return rows;
  } catch (err) {
    throw err;
  }
};

//get videogame based on its id -  functional
async function getGameById(id) {
  try {
    console.log(id);
    const {
      rows: [games],
    } = await db.query(
      `
      SELECT * FROM games
      WHERE id = $1;
      `,
      [id]
    );
    return games;
  } catch (error) {
    throw error;
  }
}

//post a new game
const createGame = async ({
  productName,
  genre,
  delivery,
  price,
  stock,
  condition,
  description,
  publisher,
  productImage,
  playerRange,
  esrb
}) => {
  try {
    const {
      rows: [game],
    } = await db.query(
      `
        INSERT INTO games(productName, genre, delivery, price, stock, condition, description, publisher, productImage, playerRange, esrb)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING *`,
      [
        productName,
        genre,
        delivery,
        price,
        stock,
        condition,
        description,
        publisher,
        productImage,
        playerRange,
        esrb,
        created_at,
        modified_at,
      ]
    );

    return game;
  } catch (err) {
    throw err;
  }
};

// async function updateGame(id, fields = {}) {
//   /*
//     This function was adapted from the function of same name from gamestore project
//     This line of code creates a comma-separated string of key-value pairs
//     in the format of `"key"=$index`, where key is a property name from
//     the fields object (this is the request body that is passed as the second parameter in api/videogames.js),
//     and $index represents a placeholder for a parameter, starting index from 1 and incrementing
//     each key so that each following entry has an appropriate id
//     */

//   fields.created_at = Math.floor((new Date()).getTime() / 1000);
//    fields.modified_at = Math.floor((new Date()).getTime() / 1000);

//     console.log(fields);
//   const setString = Object.keys(fields)
//     .map((key, index) => `"${key}"=$${index + 1}`)
//     .join(", ");
//   // above ultimately results in: (name, description, price, inStock, isPopular, imgUrl)

//   // return early if this is called without fields
//   if (setString.length === 0) {
//     return;
//   }
//   console.log(id);
//   console.log(setString);
//   console.log(fields);

//   try {
//     const {
//       rows: [game],
//     } = await db.query(
//       `
//       UPDATE games
//       SET ${setString}
//       WHERE id=${id}
//       RETURNING *;
//       `,
//       //below is the same as if it was body.name, body.description, etc. but shorthand
//       Object.values(fields)
//     );
//     return game;
//   } catch (error) {
//     throw error;
//   }
// }

async function updateGame(id, fields = {}) {
  /*
    This function was adapted from the function of same name from gamestore project
    This line of code creates a comma-separated string of key-value pairs 
    in the format of `"key"=$index`, where key is a property name from 
    the fields object (this is the request body that is passed as the second parameter in api/videogames.js),
    and $index represents a placeholder for a parameter, starting index from 1 and incrementing 
    each key so that each following entry has an appropriate id 
    */

  fields.created_at = Math.floor(new Date().getTime() / 1000);
  fields.modified_at = Math.floor(new Date().getTime() / 1000);

  console.log(fields);
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  // above ultimately results in: (name, description, price, inStock, isPopular, imgUrl)

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }
  console.log(id);
  console.log(setString);
  console.log(fields);

  try {
    const {
      rows: [game],
    } = await db.query(
      `
      UPDATE games SET 
      "productname"=productname, 
      "genre"="genre", 
      "delivery"="delivery", 
      "price"="price", 
      "stock"="stock", 
      "condition"="condition", 
      "description"="description", 
      "publisher"= "publisher", 
      "productimage"= "productimage", 
      "playerrange"="playerrange", 
      "esrb"="esrb", 
      "created_at"="created_at", 
      "modified_at"="modified_at" 
      WHERE id=${id}
      RETURNING *;
      `,
      //below is the same as if it was body.name, body.description, etc. but shorthand
      Object.values(fields)
    );
    return game;
  } catch (error) {
    throw error;
  }
}

async function deleteGame(id) {
  try {
    const {
      rows: [delVideoGame],
    } = await db.query(
      `
        DELETE FROM games
        WHERE id=$1
        RETURNING *;
        `,
      [id]
    );
    return delVideoGame;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame,
};
