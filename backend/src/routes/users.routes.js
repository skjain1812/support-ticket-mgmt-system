const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const usersController = require('../controllers/users.controller');

const router = express.Router();

router.get('/', asyncHandler(usersController.listUsers));

module.exports = router;
