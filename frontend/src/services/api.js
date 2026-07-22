const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiError extends Error {
  constructor(message, status, details = []) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

/** Sends request-scoped actor identity when createdBy is known (Core prep for Stretch auth). */
function actorHeaders(payload = {}) {
  if (payload.createdBy) {
    return { 'X-User-Id': payload.createdBy };
  }
  return {};
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  let data = null;
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  }

  if (!response.ok) {
    throw new ApiError(
      data?.error || 'Request failed',
      response.status,
      data?.details || []
    );
  }

  return data;
}

export const api = {
  getHealth: () => request('/health'),
  getUsers: () => request('/users'),
  getTickets: (params = {}) => {
    const query = new URLSearchParams();

    if (params.search) query.set('search', params.search);
    if (params.status) query.set('status', params.status);

    const queryString = query.toString();
    return request(`/tickets${queryString ? `?${queryString}` : ''}`);
  },
  getTicket: (id) => request(`/tickets/${id}`),
  createTicket: (payload) =>
    request('/tickets', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: actorHeaders(payload),
    }),
  updateTicket: (id, payload) =>
    request(`/tickets/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  updateTicketStatus: (id, status) =>
    request(`/tickets/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  addComment: (id, payload) =>
    request(`/tickets/${id}/comments`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: actorHeaders(payload),
    }),
};

export { ApiError };
