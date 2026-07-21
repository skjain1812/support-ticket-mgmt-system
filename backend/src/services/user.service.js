const { User } = require('../models');

async function listUsers() {
  const users = await User.find().sort({ name: 1 }).lean();

  return users.map((user) => ({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  }));
}

module.exports = {
  listUsers,
};
