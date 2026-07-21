const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const ticketsController = require('../controllers/tickets.controller');

const router = express.Router();

router.get('/', asyncHandler(ticketsController.listTickets));
router.post('/', asyncHandler(ticketsController.createTicket));
router.get('/:id', asyncHandler(ticketsController.getTicketById));
router.post('/:id/comments', asyncHandler(ticketsController.addComment));
router.patch('/:id/status', asyncHandler(ticketsController.changeTicketStatus));
router.patch('/:id', asyncHandler(ticketsController.updateTicket));

module.exports = router;
