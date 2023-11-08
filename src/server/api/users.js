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
  createCart,
  createCartItem,
  updateCartContents,
  deleteCartContents,
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
usersRouter.get("/:userId", async (req, res, next) => {
  try {
    const id = req.params.userId;
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
      //check to see if cart exists for this user
      const cartExists = await getCartById(user.id);
      console.log(`cartExists is ${cartExists}`);
      //if length > 0, then cart exists 
      if (cartExists.length > 0) {
        console.log('cart does exists!');
      } else {
        //if cart doesn't exist, create one using user's id
        const cart = await createCart({ user_id: user.id, total: 0 });
      }
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
    //grab user_id from recently made user account 
    const user_id = await getUser({ email, password });
    const { id } = user_id;
    //make cart when user registers using the new user's id 
    if (id) {
      const cart = await createCart({ user_id: user.id, total: 0 });
      console.log(`Cart created for user!`);
    } else {
      next({ name, message });
    }

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
usersRouter.get("/:userId/cart", async (req, res, next) => {
  try {
    const id = req.params.userId;
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
usersRouter.get("/:userId/cart/contents", async (req, res, next) => {
  try {
    //use userId to get cartId 
    const cart = await getCartById(req.params.userId);
    //extract cartId from cart object
    const cartId = cart[0].id;
    const cartContents = await getCartContentsById(cartId);
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
usersRouter.get("/:userId/cart/total", async (req, res, next) => {
  try {
    const id = req.params.userId;
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
usersRouter.post("/:userId/cart/contents", async (req, res, next) => {
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

//UNFINISHED - set this up so that only quantity can be edited.
usersRouter.put("/:userId/cart/contents/:cartId", async (req, res, next) => {
  try {
    //take the user id from the URL, pass it along with the edited content in the request body as arguments
    const updatedItem = await updateCartContents(req.params.cartId, req.body);
    res.send(updatedItem);
  } catch (error) {
    next(error);
  }
});

//functional, need to set up authorization so that only admin and the user who owns cart can delete it
usersRouter.delete("/:userId/cart/contents/:cartContentId", async (req, res, next) => {
  try {
    //take the user id from the URL, pass it along with the edited content in the request body as arguments
    const deletedItem = await deleteCartContents(req.params.cartId);
    if (deletedItem) {
      res.send({
        name: "Item successfully deleted",
        message: `Your item has been deleted from the cart!`,
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
