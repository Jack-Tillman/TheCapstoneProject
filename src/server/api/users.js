const express = require("express");
const usersRouter = express.Router();

const {
  createUser,
  getUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
  getAllCarts,
  getCartById,
  getCartContentsById,
  createCartItem,
} = require("../db");

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

/*
USER SPECIFIC 
*/

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.send({
      users,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//Get User By Id
usersRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const users = await getUserById(id);
    if (!users) {
      res.send({
        name: "No user found",
        message: "Error - a user with that ID could not be found.",
      });
    } else {
      res.send({
        users,
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//Log in
usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both an email and password",
    });
  }
  try {
    const user = await getUser({ email, password });
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          email,
          password,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );

      res.send({
        message: "Login successful!",
        token,
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Email or password is incorrect",
      });
    }
  } catch (err) {
    next(err);
  }
});

//User Registration
usersRouter.post("/register", async (req, res, next) => {
  const { name, email, password, isAdmin } = req.body;

  try {
    const _user = await getUserByEmail(email);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user with that email already exists",
      });
    }
    const user = await createUser({
      name,
      email,
      password,
      isAdmin,
    });

    const token = jwt.sign(
      {
        id: user.id,
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );
    //createCart and associate it with the userId that is made from account creation
    res.send({
      message: "Sign up successful!",
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

/*
CART-SPECIFIC 
*/

//Get cart by userId
usersRouter.get("/:id/cart", async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const cart = await getCartById(id);
    console.log(cart);
    if (!cart) {
      res.send({
        name: "No cart found",
        message: "Error - a cart for the user with that ID does not exist.",
      });
    } else {
      res.send({
        cart,
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//get cart contents by userId
usersRouter.get("/:id/cart/contents", async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const cartContents = await getCartContentsById(id);
    console.log(`cartContents is: ${cartContents}`);
    console.log(cartContents);
    if (!cartContents) {
      res.send({
        name: "No cart found",
        message: "Error - a cart for the user with that ID does not exist.",
      });
    } else {
      res.send({
        cartContents,
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//UNFINISHED    get cart total with userId
// * Remove id and user_id from returned object from getCartById, then convert to number
usersRouter.get("/:id/cart/total", async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const cart = await getCartById(id);
    console.log(cart);

    if (!cart) {
      res.send({
        name: "No userId found",
        message: "Error - a user with that ID does not exist.",
      });
    } else {
      const { total } = cart;
      console.log(total);
      res.send({
        cart,
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//Add new item to cart
usersRouter.post("/:id/cart/contents", async (req, res, next) => {
  const { cart_id, games_item_id, merch_item_id, hardware_item_id, quantity } =
    req.body;
  console.log(req.body);
  //potentially unnecessary check that user isn't adding an item with quantity 0
  if (!quantity) {
    next({
      name: "MissingCredentialsError",
      message: "Please add at least 1 item to the cart",
    });
  }
  try {
    const cart_item = await createCartItem({
      cart_id,
      games_item_id,
      merch_item_id,
      hardware_item_id,
      quantity,
    });
    if (cart_item) {
      console.log(cart_item);
      res.send({
        name: "Item successfully added",
        message: "Your item has been added to the cart!",
      });
    } else {
      next({
        name: "Add Item Error",
        message: "Error adding item to cart",
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
