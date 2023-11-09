const db = require("./client");

const createHardware = async({stripe_id, productName, type, manufacturer, price, stock, condition, description, delivery, productImage, featured}) => {
    try {
        const { rows: [ hardware ] } = await db.query(`
        INSERT INTO hardware(stripe_id, productName, type, manufacturer, price, stock, condition, description, delivery, productImage,featured)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *`, [stripe_id, productName, type, manufacturer, price, stock, condition, description, delivery, productImage, featured]);
        return hardware;
    } catch (err) {
        throw err;
    }
}

// GET - /api/hardware - get all hardware
async function getAllHardware() {
    try {
        const { rows } = await db.query(`
            SELECT * FROM hardware;  
        `);
        return rows;
    } catch (error) {
        throw new Error("Make sure you have replaced the REPLACE_ME placeholder.")
    }
}

// GET - /api/hardware/:id - get a single hardware by id
async function getHardwareById(id) {
    try {
        const { rows: [hardware] } = await db.query(`
            SELECT * FROM hardware
            WHERE id = $1;
        `, [id]);
        return hardware;
    } catch (error) {
        throw error;
    }
}

// PUT - /api/hardware/:id - update a single hardware by id
async function updateHardware(id, fields = {}) {
    // build the set string
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');

    // return early if this is called without fields
    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [hardware] } = await db.query(`
      UPDATE hardware
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `, Object.values(fields));

        return hardware;
    } catch (error) {
        throw error;
    }
}

// DELETE - /api/hardware/:id - delete a single hardware by id
async function deleteHardware(id) {
    try {
        const { rows: [hardware] } = await db.query(`
      DELETE FROM hardware
      WHERE id=$1
      RETURNING *;
    `, [id]);
        return hardware;
    } catch (error) {
        throw error;
    }
}

module.exports ={
    createHardware,
    getAllHardware,
    getHardwareById,
    updateHardware,
    deleteHardware
}