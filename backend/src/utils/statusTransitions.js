const VALID_TRANSITIONS = {
  open: ['in_progress', 'cancelled'],
  in_progress: ['resolved', 'cancelled'],
  resolved: ['closed'],
  closed: [],
  cancelled: [],
};

function isValidTransition(fromStatus, toStatus) {
  if (fromStatus === toStatus) {
    return true;
  }

  const allowed = VALID_TRANSITIONS[fromStatus] || [];
  return allowed.includes(toStatus);
}

module.exports = {
  VALID_TRANSITIONS,
  isValidTransition,
};
