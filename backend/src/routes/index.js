const express = require('express');
const healthRoutes = require('./health.routes');
const usersRoutes = require('./users.routes');
const ticketsRoutes = require('./tickets.routes');

const router = express.Router();

router.use(healthRoutes);
router.use('/users', usersRoutes);
router.use('/tickets', ticketsRoutes);

module.exports = router;
