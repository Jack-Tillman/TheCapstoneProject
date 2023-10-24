const db = require("./client");

const createMerch = async({productName, type, delivery, price, stock, condition, description, manufacturer, productImage}) => {
    try {
        const { rows: [merch ] } = await db.query(`
        INSERT INTO merch(productName, type, delivery, price, stock, condition, description, manufacturer, productImage)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`, [productName, type, delivery, price, stock, condition, description, manufacturer, productImage]);

        return merch;
    } catch (err) {
        throw err;
    }
}

module.exports ={
    createMerch
}