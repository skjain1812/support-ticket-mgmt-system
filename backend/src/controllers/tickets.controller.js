const ticketService = require('../services/ticket.service');
const statusTransitionService = require('../services/statusTransition.service');
const commentService = require('../services/comment.service');
const { resolveActorUserId } = require('../context/requestUser');

async function createTicket(req, res) {
  const createdBy = resolveActorUserId(req, req.body);
  const ticket = await ticketService.createTicket({ ...req.body, createdBy });
  res.status(201).json(ticket);
}

async function listTickets(req, res) {
  const result = await ticketService.listTickets({
    search: req.query.search,
    status: req.query.status,
  });
  res.status(200).json(result);
}

async function getTicketById(req, res) {
  const ticket = await ticketService.getTicketById(req.params.id);
  res.status(200).json(ticket);
}

async function updateTicket(req, res) {
  const ticket = await ticketService.updateTicket(req.params.id, req.body);
  res.status(200).json(ticket);
}

async function changeTicketStatus(req, res) {
  const ticket = await statusTransitionService.transitionTicketStatus(
    req.params.id,
    req.body.status
  );
  res.status(200).json(ticket);
}

async function addComment(req, res) {
  const createdBy = resolveActorUserId(req, req.body);
  const comment = await commentService.addComment(req.params.id, {
    ...req.body,
    createdBy,
  });
  res.status(201).json(comment);
}

module.exports = {
  createTicket,
  listTickets,
  getTicketById,
  updateTicket,
  changeTicketStatus,
  addComment,
};
