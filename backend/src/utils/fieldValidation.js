const DESCRIPTION_MAX_LENGTH = 5000;
const MESSAGE_MAX_LENGTH = 5000;

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function trimString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

module.exports = {
  DESCRIPTION_MAX_LENGTH,
  MESSAGE_MAX_LENGTH,
  isNonEmptyString,
  trimString,
};
