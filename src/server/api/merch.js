const express = require("express");
const merchRouter = express.Router();
const { requireUser, requireAdmin } = require("./utils");

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
merchRouter.post("/", requireAdmin, async (req, res, next) => {
  try {
    const merch = await createMerch(req.body);
    if (merch) {
      res.send(merch);
    } else {
      next({
        name: "MerchCreationError",
        message: "There was an error creating your merch. Please try again.",
      });
    }
  } catch (error) {
    next(error);
  }
});

// PUT - /api/merch/:id - update a single piece of merch by id
merchRouter.put("/:id", requireAdmin, async (req, res, next) => {
  try {
    const updatedMerch = await updateMerch(req.params.id, req.body);
    if (updateMerch) {
      res.send(updatedMerch)
    } else {
      next({
        name: "MerchUpdateError",
        message: "There was an error updating your merch. Please try again.",
      });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE - /api/merchandise/:id - delete a single video game by id
merchRouter.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const merch = await deleteMerch(req.params.id);
    if (merch) {
      res.send("Successfully deleted your merch.");
    } else {
      next({
        name: "MerchDeletionError",
        message: "There was an error deleting your merch. Please try again.",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = merchRouter;
