const express = require('express');
const apiRouter = express.Router();

const volleyball = require('volleyball')
apiRouter.use(volleyball)

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

apiRouter.use((err, req, res, next) => {
    res.status(500).send(err)
  })

module.exports = apiRouter;