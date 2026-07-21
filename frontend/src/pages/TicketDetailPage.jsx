import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, ApiError } from '../services/api';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import {
  PRIORITY_OPTIONS,
  formatDate,
  getNextStatuses,
} from '../utils/ticketHelpers';

function TicketDetailPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [commentMessage, setCommentMessage] = useState('');
  const [saving, setSaving] = useState(false);

  async function loadTicket() {
    setLoading(true);
    setError('');

    try {
      const [ticketResponse, usersResponse] = await Promise.all([
        api.getTicket(id),
        api.getUsers(),
      ]);

      setTicket(ticketResponse);
      setComments(ticketResponse.comments || []);
      setUsers(usersResponse.data || []);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        setError('Ticket not found');
      } else {
        setError(
          err instanceof ApiError
            ? err.message
            : 'Unable to load ticket. Check if the server is running.'
        );
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTicket();
  }, [id]);

  async function handleFieldUpdate(updates) {
    setActionError('');
    setSaving(true);

    try {
      const updated = await api.updateTicket(id, updates);
      setTicket((current) => ({ ...current, ...updated }));
    } catch (err) {
      setActionError(
        err instanceof ApiError
          ? err.message
          : 'Failed to update ticket.'
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(event) {
    const nextStatus = event.target.value;
    if (!ticket || !nextStatus || nextStatus === ticket.status) {
      return;
    }

    setActionError('');
    setSaving(true);

    try {
      const updated = await api.updateTicketStatus(id, nextStatus);
      setTicket((current) => ({ ...current, ...updated }));
    } catch (err) {
      setActionError(
        err instanceof ApiError
          ? err.message
          : `Cannot change status from ${ticket.status} to ${nextStatus}`
      );
      event.target.value = ticket.status;
    } finally {
      setSaving(false);
    }
  }

  async function handleAddComment(event) {
    event.preventDefault();
    setActionError('');

    if (!commentMessage.trim()) {
      setActionError('Comment message is required');
      return;
    }

    if (!ticket?.createdBy) {
      setActionError('Unable to determine comment author');
      return;
    }

    setSaving(true);

    try {
      const comment = await api.addComment(id, {
        message: commentMessage.trim(),
        createdBy: ticket.createdBy,
      });
      setComments((current) => [...current, comment]);
      setCommentMessage('');
    } catch (err) {
      setActionError(
        err instanceof ApiError ? err.message : 'Failed to add comment.'
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <LoadingState message="Loading ticket..." />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={error === 'Ticket not found' ? undefined : loadTicket}
      />
    );
  }

  const nextStatuses = getNextStatuses(ticket.status);

  return (
    <section>
      <div className="page-header">
        <h1>{ticket.title}</h1>
        <Link to="/tickets" className="btn btn-secondary">
          Back to list
        </Link>
      </div>

      {actionError && <div className="alert alert-error">{actionError}</div>}

      <div className="card" style={{ marginBottom: '1rem' }}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={ticket.title}
            onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
            onBlur={(e) => handleFieldUpdate({ title: e.target.value.trim() })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={ticket.description || ''}
            onChange={(e) =>
              setTicket({ ...ticket, description: e.target.value })
            }
            onBlur={(e) =>
              handleFieldUpdate({ description: e.target.value.trim() })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={ticket.priority}
            onChange={(e) => handleFieldUpdate({ priority: e.target.value })}
            disabled={saving}
          >
            {PRIORITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="assignedTo">Assignee</label>
          <select
            id="assignedTo"
            value={ticket.assignedTo || ''}
            onChange={(e) =>
              handleFieldUpdate({
                assignedTo: e.target.value || null,
              })
            }
            disabled={saving}
          >
            <option value="">Unassigned</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <StatusBadge status={ticket.status} />
            {nextStatuses.length > 0 ? (
              <select
                id="status"
                defaultValue=""
                onChange={handleStatusChange}
                disabled={saving}
              >
                <option value="" disabled>
                  Change status
                </option>
                {nextStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            ) : (
              <span>No further transitions</span>
            )}
          </div>
        </div>

        <p>
          <strong>Priority:</strong> <PriorityBadge priority={ticket.priority} />
        </p>
        <p>
          <strong>Created by:</strong> {ticket.createdByName || 'Unknown'}
        </p>
        <p>
          <strong>Created:</strong> {formatDate(ticket.createdAt)}
        </p>
        <p>
          <strong>Updated:</strong> {formatDate(ticket.updatedAt)}
        </p>
      </div>

      <div className="card">
        <h2>Comments</h2>
        {comments.length === 0 ? (
          <p className="empty-state">No comments yet. Add the first one below.</p>
        ) : (
          <ul className="comment-list">
            {comments.map((comment) => (
              <li key={comment.id} className="comment-item">
                <div className="comment-meta">
                  {comment.createdByName || 'Unknown'} · {formatDate(comment.createdAt)}
                </div>
                <div>{comment.message}</div>
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleAddComment} style={{ marginTop: '1rem' }}>
          <div className="form-group">
            <label htmlFor="comment">Add comment</label>
            <textarea
              id="comment"
              value={commentMessage}
              onChange={(e) => setCommentMessage(e.target.value)}
              placeholder="Write a comment..."
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Add Comment'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default TicketDetailPage;
