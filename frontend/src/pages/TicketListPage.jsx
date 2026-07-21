import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { api, ApiError } from '../services/api';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import { STATUS_OPTIONS, formatDate } from '../utils/ticketHelpers';

function TicketListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || '';

  useEffect(() => {
    let cancelled = false;

    async function loadTickets() {
      setLoading(true);
      setError('');

      try {
        const response = await api.getTickets({ search, status });
        if (!cancelled) {
          setTickets(response.data || []);
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof ApiError
              ? err.message
              : 'Unable to connect. Check if the server is running.';
          setError(message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    const timeoutId = setTimeout(loadTickets, 300);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [search, status]);

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next);
  }

  if (loading) {
    return <LoadingState message="Loading tickets..." />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={() => setSearchParams(searchParams)}
      />
    );
  }

  return (
    <section>
      <div className="page-header">
        <h1>Tickets</h1>
        <Link to="/tickets/new" className="btn btn-primary">
          Create Ticket
        </Link>
      </div>

      <div className="filters">
        <input
          type="search"
          placeholder="Search by title or description"
          value={search}
          onChange={(e) => updateParam('search', e.target.value)}
        />
        <select
          value={status}
          onChange={(e) => updateParam('status', e.target.value)}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value || 'all'} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {tickets.length === 0 ? (
        <EmptyState
          message="No tickets match your search."
          action={
            <Link to="/tickets/new" className="btn btn-primary">
              Create your first ticket
            </Link>
          }
        />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assignee</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                onClick={() => navigate(`/tickets/${ticket.id}`)}
              >
                <td>{ticket.title}</td>
                <td>
                  <StatusBadge status={ticket.status} />
                </td>
                <td>
                  <PriorityBadge priority={ticket.priority} />
                </td>
                <td>{ticket.assignedToName || 'Unassigned'}</td>
                <td>{formatDate(ticket.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default TicketListPage;
