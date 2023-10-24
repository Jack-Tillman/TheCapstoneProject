const db = require("./client");

const createHardware = async({productName, type, manufacturer, price, stock, condition, description, delivery, productImage}) => {
    try {
        const { rows: [hardware ] } = await db.query(`
        INSERT INTO hardware(productName, type, manufacturer, price, stock, condition, description, delivery, productImage)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`, [productName, type, manufacturer, price, stock, condition, description, delivery, productImage]);

        return hardware;
    } catch (err) {
        throw err;
    }
}

module.exports ={
    createHardware
}