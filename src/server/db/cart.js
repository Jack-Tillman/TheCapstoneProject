const db = require("./client");

/*

* Set up routes within users since cart is always attached to a user 
Need to make the function that takes the cart ID and filter through the shopping_cart_item table to 
grab and return all the game/merch/hardware ids that have a matching cartId. Then, grab the product details 
using that id 

*/
const getAllCarts = async () => {
  try {
    const { rows } = await db.query(`
            SELECT * FROM shopping_cart;
            `);
    return rows;
  } catch (err) {
    throw err;
  }
};
//below only returns 1 cart even if there is more than 1 cart in the DB 
const getCartById = async (id) => {
  try {
    console.log("id passed to getCartById is:" + id);
    const {
      rows: cart,
    } = await db.query(
      `
        SELECT * FROM shopping_cart
        WHERE user_id = $1;
        `,
      [id]
    );
    return cart;
  } catch (error) {
    throw error;
  }
};
//functional; using const { rows: [contents], } would only return the first matching cart item
const getCartContentsById = async (id) => {
  try {
    console.log(id);
      const {
        rows: contents,
      } = await db.query(
        `
          SELECT *
          FROM shopping_cart_item 
          WHERE cart_id=$1;`,[id]
      );
      console.log(`contents are: `);
      console.log(contents);
      return contents;
  } catch (error) {
    throw error;
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
    console.log("cart created!");
    return cart;
  } catch (err) {
    throw err;
  }
};

const getAllCartItems = async () => {
  try {
    const { rows } = await db.query(`
            SELECT * FROM shopping_cart_items;
            `);
    return rows;
  } catch (err) {
    throw err;
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
    if (!games_item_id) {
      games_item_id = null;
    }
    if (!merch_item_id) {
      merch_item_id = null;
    }
    if (!hardware_item_id) {
      hardware_item_id = null;
    }

    const {
      rows: item,
    } = await db.query(
      `
        INSERT INTO shopping_cart_item(cart_id, games_item_id, merch_item_id, hardware_item_id, quantity)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;`,
      [cart_id, games_item_id, merch_item_id, hardware_item_id, quantity]
    );
    console.log(item);
    return item;
  } catch (err) {
    console.error("Error creating cart item data for cart items");
    throw err;
  }
};

async function updateCartContents(cartId, fields = {}) {
  /*
    This function was adapted from the function of same name from gamestore project
    This line of code creates a comma-separated string of key-value pairs
    in the format of `"key"=$index`, where key is a property name from
    the fields object (this is the request body that is passed as the second parameter in api/videogames.js),
    and $index represents a placeholder for a parameter, starting index from 1 and incrementing
    each key so that each following entry has an appropriate id
    */
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  // above ultimately results in: (name, description, price, inStock, isPopular, imgUrl)

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [item],
    } = await db.query(
      `
      UPDATE shopping_cart_item
      SET ${setString}
      WHERE id=${cartId}
      RETURNING *;
      `,
      //below is the same as if it was body.name, body.description, etc. but shorthand
      Object.values(fields)
    );
    return item;
  } catch (error) {
    throw error;
  }
};

async function deleteCartContents(cartId) {
  try {
    const {
      rows: [delContent],
    } = await db.query(
      `
        DELETE FROM shopping_cart_item
        WHERE id=$1
        RETURNING *;
        `,
      [cartId]
    );
    return delContent;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCart,
  getAllCarts,
  getCartById,
  createCartItem,
  getAllCartItems,
  getCartContentsById,
  updateCartContents,
  deleteCartContents
};
