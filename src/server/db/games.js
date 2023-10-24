const db = require('./client');

const createGame = async({productName, price, productImage, genre, playerRange, esrb, condition, publisher, description, delivery}) => {
    try {
        const { rows: [game ] } = await db.query(`
        INSERT INTO games(productName, price, productImage, genre, playerRange, esrb, condition, publisher, description, delivery)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *`, [productName, price, productImage, genre, playerRange, esrb, condition, publisher, description, delivery]);

        return game;
    } catch (err) {
        throw err;
    }
}

module.exports ={
    createGame
}