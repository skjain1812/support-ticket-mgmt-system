import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import { STATUS_OPTIONS, formatDate } from '../utils/ticketHelpers';
import { getErrorMessage } from '../utils/errorMessages';

function TicketListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || '';
  const hasFilters = Boolean(search || status);
  const isInitialLoad = loading && tickets.length === 0 && !error;

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
          setError(
            getErrorMessage(err, 'Unable to connect. Check if the server is running.')
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    const timeoutId = setTimeout(loadTickets, search ? 300 : 0);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [search, status, retryCount]);

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next);
  }

  function clearFilters() {
    setSearchParams({});
  }

  if (isInitialLoad) {
    return <LoadingState message="Loading tickets..." />;
  }

  if (error && tickets.length === 0) {
    return (
      <section>
        <ErrorState
          message={error}
          onRetry={() => setRetryCount((count) => count + 1)}
          action={
            <Link to="/tickets/new" className="btn btn-primary">
              Create Ticket
            </Link>
          }
        />
      </section>
    );
  }

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Tickets</h1>
          {!loading && (
            <p className="page-subtitle">
              {tickets.length} ticket{tickets.length === 1 ? '' : 's'}
              {hasFilters ? ' matching your filters' : ''}
            </p>
          )}
        </div>
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
          aria-label="Search tickets"
        />
        <select
          value={status}
          onChange={(e) => updateParam('status', e.target.value)}
          aria-label="Filter by status"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value || 'all'} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {hasFilters && (
          <button type="button" className="btn btn-secondary" onClick={clearFilters}>
            Clear filters
          </button>
        )}
      </div>

      {error && (
        <div className="alert alert-error" role="alert">
          {error}
          <button
            type="button"
            className="btn btn-secondary"
            style={{ marginLeft: '0.75rem' }}
            onClick={() => setRetryCount((count) => count + 1)}
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <LoadingState message="Updating ticket list..." />
      ) : tickets.length === 0 ? (
        <EmptyState
          message={
            hasFilters
              ? 'No tickets match your search or status filter.'
              : 'No tickets yet. Create one to get started.'
          }
          action={
            hasFilters ? (
              <button type="button" className="btn btn-secondary" onClick={clearFilters}>
                Clear filters
              </button>
            ) : (
              <Link to="/tickets/new" className="btn btn-primary">
                Create your first ticket
              </Link>
            )
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
