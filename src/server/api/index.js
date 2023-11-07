const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");

const volleyball = require("volleyball");
apiRouter.use(volleyball);

// TO BE COMPLETED - set `req.user` if possible, using token sent in the request header
apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  // if not authorization is found, move on to 
  if (!auth) {

    next();
  } else if (auth.startsWith(prefix)) {
    // header set with Bearer
    const token = auth.slice(prefix.length);
    console.log(token);
    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});


const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const gamesRouter = require("./games");
apiRouter.use("/games", gamesRouter);

const hardwareRouter = require("./hardware");
apiRouter.use("/hardware", hardwareRouter);

const merchRouter = require('./merch');
apiRouter.use('/merch', merchRouter);

apiRouter.use((err, req, res, next) => {
    res.status(500).send(err);
});


module.exports = apiRouter;
