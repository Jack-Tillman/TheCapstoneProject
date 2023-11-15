const db = require("./client");

const createMerch = async (fields = {}) => {
  const newFields = Object.fromEntries(
    Object.entries(fields).map(([key, values]) => [key.toLowerCase(), values])
  );
  // build the set string
  const insertString = Object.keys(newFields)
    .map((key, index) => `$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (insertString.length === 0) {
    return;
  }
  try {
    const {
      rows: [merch],
    } = await db.query(
      `
        INSERT INTO merch(stripe_id, productName, type, delivery, price, stock, condition, description, manufacturer, productImage, featured)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *`,
      Object.values(fields)
    );
    return merch;
  } catch (err) {
    throw err;
  }
};

// GET - /api/merch - get all merchandise
async function getAllMerch() {
  try {
    const { rows } = await db.query(`SELECT * FROM merch;`);
    // taking all video games from the database that we seeded (npm run seed) from seeddata.js. I then call the function in the videoGames.js file in the api folder.
    return rows;
  } catch (error) {
    throw new Error("Can not get merchandise.");
  }
}

// GET - /api/video-games/:id - get a single video game by id
async function getMerchById(id) {
  try {
    const {
      rows: [merch],
    } = await db.query(
      `
              SELECT * FROM Merch
              WHERE id = $1;
          `,
      [id]
    );
    return merch;
  } catch (error) {
    throw error;
  }
}

// PUT - /api/merch/:id - update a single piece of merch by id
async function updateMerch(id, fields = {}) {
  /*
   this helper function takes all the keys from the fields object (what the updated info is, basically) 
   and converts them to lowercase to avoid any SQL field naming issues.
   */
  const newFields = Object.fromEntries(
    Object.entries(fields).map(([key, values]) => [key.toLowerCase(), values])
  );

  const setString = Object.keys(newFields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    console.log(id);
    console.log(setString);
    const {
      rows: [merch],
    } = await db.query(
      `
         UPDATE merch
         SET ${setString}
         WHERE id=${id}
         RETURNING *;
         `,
      Object.values(fields)
    );
    return merch;
  } catch (error) {
    throw error;
  }
}

// DELETE - /api/merch/:id - delete a single piece of merch by id
async function deleteMerch(id) {
  // LOGIC GOES HERE
  try {
    const {
      rows: [merch],
    } = await db.query(
      `
      DELETE FROM merch
      WHERE id=$1
      RETURNING *;
      `,
      [id]
    );
    return merch;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createMerch,
  getAllMerch,
  getMerchById,
  updateMerch,
  deleteMerch,
};
