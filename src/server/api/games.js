const express = require("express");
const gamesRouter = express.Router();
const { requireUser, requireAdmin } = require("./utils");

const {
  createGame,
  getAllGames,
  getGameByStripeId,
  getGameById,
  updateGame,
  deleteGame,
} = require("../db/games");

// GET - /api/games - get all video games
gamesRouter.get("/", async (req, res, next) => {
  try {
    const allGames = await getAllGames();
    res.send(allGames);
  } catch (error) {
    next(error);
  }
});

// GET - /api/games get a single video game by id
// pass the id from the url as an argument to getVideoGameById using req.params
gamesRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const idCheck = id.search(/[^0-9]/);
    console.log(id);
    console.log(idCheck);
    if (idCheck > -1){
      const game = await getGameByStripeId(id);
      console.log(game);
      res.send(game);
    } else {
      const game = await getGameById(id);
      console.log(game);
      res.send(game);
    }
  } catch (error) {
    next(error);
  }
});

// POST - /api/games - create a new video game
gamesRouter.post("/", requireAdmin, async (req, res, next) => {
  try {
    const postedGame = await createGame(req.body);
    if (postedGame) {
      res.send(postedGame);
    } else {
      next({
        name: "GameCreationError",
        message: "There was an error creating your game. Please try again.",
      });
    }
  } catch (error) {
    next(error);
  }
});

// PUT - /api/games/:id - update a single video game by id
gamesRouter.put("/:id", requireAdmin, async (req, res, next) => {
  try {
    //take the videogame id from the URL, pass it along with the edited content in the request body as arguments to updateVideoGame
    const updatedGame = await updateGame(req.params.id, req.body);
    if (updatedGame) {
      res.send(updatedGame);
    } else {
      next({
        name: "GameUpdatingError",
        message: "There was an error updating your game. Please try again.",
      });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE - /api/games/:id - delete a single video game by id
gamesRouter.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    //take the game id from the URL and pass it as argument to deleteGame
    const deletedGame = await deleteGame(req.params.id);
    res.send(deletedGame);
  } catch (error) {
    next(error);
  }
});

module.exports = gamesRouter;
