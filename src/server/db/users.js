const db = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;
const { JWT_SECRET } = process.env;

const createUser = async ({ name, email, password, isAdmin }) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  //if isAdmin is undefined/null, set to false
  if (!isAdmin){
    isAdmin=false;
  }
  
  //if name is null, set to same as email
  if (!name){
    name=email;
  }


  try {
    const {
      rows: [user],
    } = await db.query(
      `
        INSERT INTO users(name, email, password, isAdmin)
        VALUES($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`,
      [name, email, hashedPassword, isAdmin]
    );
    return user;
  } catch (err) {
    throw err;
  }
};

const getUser = async ({ email, password }) => {
  if (!email || !password) {
    return;
  }
  try {
    const user = await getUserByEmail(email);
    if (!user) return;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch){
      return;
    } else {
      delete user.password;
    }
    return user;
  } catch (err) {
    throw err;
  }
};

const getUserByEmail = async (email) => {
  try {
    const {
      rows: [user],
    } = await db.query(
      `
        SELECT * 
        FROM users
        WHERE email=$1;`,
      [email]
    );

    if (!user) {
      return;
    }
    return user;
  } catch (err) {
    throw err;
  }
};

const getUserById = async (id) => {
  try {
    const {
      rows: [user],
    } = await db.query(`
        SELECT id, name, email
        FROM users
        WHERE id=${id};
        `);
    //quickly escape function if user does not exist
    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    throw error;
  }
};

async function getAllUsers() {
  try {
    const { rows } = await db.query(`
    SELECT id, name, email, isAdmin
    FROM users;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
};
