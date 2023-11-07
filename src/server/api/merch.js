const express = require("express");
const merchRouter = express.Router();

const {
  getAllMerch,
  getMerchById,
  createMerch,
  updateMerch,
  deleteMerch,
} = require("../db/merch");

// GET - /api/merch - get all merch
merchRouter.get("/", async (req, res, next) => {
  try {
    const merch = await getAllMerch();
    res.send(merch);
  } catch (error) {
    next(error);
  }
});

// GET - /api/merch/:id - get a single piece of merch by id
merchRouter.get("/:id", async (req, res, next) => {
  try {
    const merch = await getMerchById(req.params.id);
    res.send(merch);
  } catch (error) {
    next(error);
  }
});

// POST - /api/merchandise - create a new piece of merch
merchRouter.post("/", async (req, res, next) => {
  try {
    const merch = await createMerch(req.body);
    res.send(merch);
  } catch (error) {
    next(error);
  }
});

// PUT - /api/merch/:id - update a single piece of merch by id
merchRouter.put("/:id", async (req, res, next) => {
  try {
    const merch = await updateMerch(req.params.id, req.body);
    res.send(merch);
  } catch (error) {
    next(error);
  }
});

// DELETE - /api/merchandise/:id - delete a single video game by id
merchRouter.delete("/:id", async (req, res, next) => {
  try {
    const merch = await deleteMerch(req.params.id);
    res.send(merch);
  } catch (error) {
    next(error);
  }
});

module.exports = merchRouter;
