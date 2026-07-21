function getHealth(req, res) {
  res.status(200).json({
    status: 'ok',
    service: 'support-ticket-api',
  });
}

module.exports = {
  getHealth,
};
