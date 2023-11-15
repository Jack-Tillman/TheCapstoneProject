const express = require("express");
const hardwareRouter = express.Router();
const { requireUser, requireAdmin } = require("./utils");

const {
  getAllHardware,
  getHardwareById,
  createHardware,
  updateHardware,
  deleteHardware,
} = require("../db/hardware");

// GET - /api/hardware - get all hardware
hardwareRouter.get("/", async (req, res, next) => {
  try {
    const hardware = await getAllHardware();
    console.log(hardware);
    res.send(hardware);
  } catch (error) {
    next(error);
  }
});

// GET - /api/hardware/:id - get a single hardware by id
hardwareRouter.get("/:id", async (req, res, next) => {
  try {
    const hardware = await getHardwareById(req.params.id);
    res.send(hardware);
  } catch (error) {
    next(error);
  }
});

// POST - /api/hardware - create a new hardware
hardwareRouter.post("/", requireAdmin, async (req, res, next) => {
  try {
    const postHardware = await createHardware(req.body);
    if (postHardware) {
      res.send(postHardware);
    } else {
      next({
        name: "HardwareCreationError",
        message: "There was an error creating your hardware. Please try again.",
      });
    }
  } catch (error) {
    next(error);
  }
});

// PUT - /api/hardware/:id - update a single hardware by id
hardwareRouter.put("/:id", requireAdmin, async (req, res, next) => {
  try {
    const hardware = await updateHardware(req.params.id, req.body);
    if (hardware) {
      res.send(hardware);
    } else {
      next({
        name: "HardwareUpdateError",
        message: "There was an error updating your hardware. Please try again.",
      });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE - /api/hardware/:id - delete a single hardware by id
hardwareRouter.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const hardware = await deleteHardware(req.params.id);
    if (hardware) {
      res.send("Successfully deleted your hardware.");
    } else {
      next({
        name: "HardwareDeletionError",
        message: "There was an error deleting your merch. Please try again.",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = hardwareRouter;
