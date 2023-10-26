const db = require('./client');

const createGame = async({productName, genre, delivery, price, stock, condition, description, publisher, productImage, playerRange, esrb}) => {
    try {
        const { rows: [game ] } = await db.query(`
        INSERT INTO games(productName, genre, delivery, price, stock, condition, description, publisher, productImage, playerRange, esrb)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *`, [productName, genre, delivery, price, stock, condition, description, publisher, productImage, playerRange, esrb]);

        return game;
    } catch (err) {
        throw err;
    }
}

module.exports ={
    createGame
}