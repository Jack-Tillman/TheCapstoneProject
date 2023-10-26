const express = require('express');
const hardwareRouter = express.Router();

const { getAllHardware,
    getHardwareById,
    createHardware,
    updateHardware,
    deleteHardware } = require('../db/hardware');

// GET - /api/hardware - get all hardware
hardwareRouter.get('/', async (req, res, next) => {
    try {
        const hardware = await getAllHardware();
        console.log(hardware);
        res.send(hardware);
    } catch (error) {
        next(error);
    }
});    

// GET - /api/hardware/:id - get a single hardware by id
hardwareRouter.get('/:id', async (req, res, next) => {
    try {
        const hardware = await getHardwareById(req.params.id);
        res.send(hardware);    
    } catch (error) {
        next(error);
    }
});

// POST - /api/hardware - create a new hardware
hardwareRouter.post('/', async (req, res, next) => {    
    try {
        const postHardware = await createHardware(req.body);
        res.send(postHardware)
    } catch (error) {
        next(error)    
    }    
});    


// PUT - /api/hardware/:id - update a single hardware by id
hardwareRouter.put('/:id', async (req, res, next) => {
    try {
        const hardware = await updateHardware(req.params.id, req.body);
        res.send(hardware);
    } catch (error) {
        next(error);
    }
});

// DELETE - /api/hardware/:id - delete a single hardware by id
hardwareRouter.delete('/:id', async (req, res, next) => {
    try {
        const game = await deleteHardware(req.params.id);
        res.send(game);
    } catch (error) {
        next(error);
    }
});

module.exports = hardwareRouter;
