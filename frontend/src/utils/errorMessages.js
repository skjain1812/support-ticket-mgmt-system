import { ApiError } from '../services/api';

export function getErrorMessage(err, fallback = 'Something went wrong. Please try again.') {
  if (err instanceof ApiError) {
    return err.message;
  }
  return fallback;
}
