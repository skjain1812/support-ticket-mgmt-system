const userService = require('../services/user.service');

async function listUsers(req, res) {
  const users = await userService.listUsers();
  res.status(200).json({ data: users });
}

module.exports = {
  listUsers,
};
