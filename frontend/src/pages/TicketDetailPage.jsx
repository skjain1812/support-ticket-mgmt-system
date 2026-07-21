import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, ApiError } from '../services/api';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import { PRIORITY_OPTIONS, formatDate, formatStatus, getNextStatuses } from '../utils/ticketHelpers';
import { getErrorMessage } from '../utils/errorMessages';

function DetailField({ label, children }) {
  return (
    <div className="detail-field">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function TicketDetailPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignedTo: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadCount, setReloadCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [commentMessage, setCommentMessage] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentError, setCommentError] = useState('');
  const [commentFieldErrors, setCommentFieldErrors] = useState({});
  const [submittingComment, setSubmittingComment] = useState(false);
  const [statusSelection, setStatusSelection] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError('');

      try {
        const [ticketResponse, usersResponse] = await Promise.all([
          api.getTicket(id),
          api.getUsers(),
        ]);

        if (cancelled) return;

        setTicket(ticketResponse);
        setUsers(usersResponse.data || []);
        setComments(ticketResponse.comments || []);
        setForm({
          title: ticketResponse.title,
          description: ticketResponse.description || '',
          priority: ticketResponse.priority,
          assignedTo: ticketResponse.assignedTo || '',
        });
        setCommentAuthor(
          ticketResponse.createdBy || usersResponse.data?.[0]?.id || ''
        );
        setCommentMessage('');
        setCommentError('');
        setCommentFieldErrors({});
        setFieldErrors({});
        setSaveError('');
        setStatusSelection('');
      } catch (err) {
        if (cancelled) return;

        if (
          err instanceof ApiError &&
          (err.status === 404 || err.status === 400)
        ) {
          setError('Ticket not found');
        } else {
          setError(
            getErrorMessage(err, 'Unable to load ticket. Check if the server is running.')
          );
        }
        setTicket(null);
        setComments([]);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [id, reloadCount]);

  async function handleFieldUpdate(updates) {
    if (!ticket) return;

    const hasChange = Object.entries(updates).some(([key, value]) => {
      if (key === 'description') {
        return value !== (ticket.description || '');
      }
      if (key === 'assignedTo') {
        return (value || null) !== (ticket.assignedTo || null);
      }
      return value !== ticket[key];
    });

    if (!hasChange) return;

    setSaveError('');
    setFieldErrors({});
    setSaving(true);

    try {
      const updated = await api.updateTicket(id, updates);
      setTicket((current) => ({ ...current, ...updated }));
      setForm({
        title: updated.title,
        description: updated.description || '',
        priority: updated.priority,
        assignedTo: updated.assignedTo || '',
      });
    } catch (err) {
      if (err instanceof ApiError) {
        setSaveError(err.message);
        const nextErrors = {};
        err.details.forEach((detail) => {
          if (detail.field) {
            nextErrors[detail.field] = detail.message;
          }
        });
        setFieldErrors(nextErrors);
        setForm({
          title: ticket.title,
          description: ticket.description || '',
          priority: ticket.priority,
          assignedTo: ticket.assignedTo || '',
        });
      } else {
        setSaveError(getErrorMessage(err, 'Failed to update ticket.'));
      }
    } finally {
      setSaving(false);
    }
  }

  function handleTitleBlur() {
    const title = form.title.trim();
    if (!title) {
      setFieldErrors({ title: 'Title is required' });
      setForm((current) => ({ ...current, title: ticket.title }));
      return;
    }
    handleFieldUpdate({ title });
  }

  function handleDescriptionBlur() {
    handleFieldUpdate({ description: form.description.trim() });
  }

  function handlePriorityChange(event) {
    const priority = event.target.value;
    setForm((current) => ({ ...current, priority }));
    handleFieldUpdate({ priority });
  }

  function handleAssigneeChange(event) {
    const assignedTo = event.target.value || null;
    setForm((current) => ({ ...current, assignedTo: event.target.value }));
    setFieldErrors((current) => ({ ...current, assignedTo: '' }));
    handleFieldUpdate({ assignedTo });
  }

  async function handleStatusChange(event) {
    const nextStatus = event.target.value;
    if (!ticket || !nextStatus || nextStatus === ticket.status) {
      setStatusSelection('');
      return;
    }

    setSaveError('');
    setSaving(true);

    try {
      const updated = await api.updateTicketStatus(id, nextStatus);
      setTicket((current) => ({ ...current, ...updated }));
      setStatusSelection('');
    } catch (err) {
      setStatusSelection('');
      setSaveError(
        err instanceof ApiError
          ? err.message
          : getErrorMessage(
              err,
              `Cannot change status from ${formatStatus(ticket.status)} to ${formatStatus(nextStatus)}`
            )
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleAddComment(event) {
    event.preventDefault();
    setCommentError('');
    setCommentFieldErrors({});

    const message = commentMessage.trim();
    if (!message) {
      setCommentFieldErrors({ message: 'Message is required' });
      return;
    }

    if (!commentAuthor) {
      setCommentFieldErrors({ createdBy: 'Comment author is required' });
      return;
    }

    setSubmittingComment(true);

    try {
      const comment = await api.addComment(id, {
        message,
        createdBy: commentAuthor,
      });
      setComments((current) => [...current, comment]);
      setCommentMessage('');
    } catch (err) {
      if (err instanceof ApiError) {
        setCommentError(err.message);
        const nextErrors = {};
        err.details.forEach((detail) => {
          if (detail.field) {
            nextErrors[detail.field] = detail.message;
          }
        });
        setCommentFieldErrors(nextErrors);
      } else {
        setCommentError(getErrorMessage(err, 'Failed to add comment.'));
      }
    } finally {
      setSubmittingComment(false);
    }
  }

  const nextStatuses = getNextStatuses(ticket?.status);

  if (loading) {
    return <LoadingState message="Loading ticket..." />;
  }

  if (error || !ticket) {
    const isNotFound = error === 'Ticket not found';

    return (
      <section>
        <ErrorState
          message={error || 'Ticket not found'}
          onRetry={isNotFound ? undefined : () => setReloadCount((count) => count + 1)}
          action={
            <Link to="/tickets" className="btn btn-secondary">
              Back to ticket list
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
          <h1>{form.title || ticket.title}</h1>
          <div className="detail-badges">
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
            {saving && <span className="detail-saving">Saving...</span>}
          </div>
        </div>
        <Link to="/tickets" className="btn btn-secondary">
          Back to list
        </Link>
      </div>

      {saveError && (
        <div className="alert alert-error" role="alert">
          {saveError}
        </div>
      )}

      <div className="card detail-section">
        <h2>Details</h2>

        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={(e) => {
              setForm((current) => ({ ...current, title: e.target.value }));
              setFieldErrors((current) => ({ ...current, title: '' }));
              setSaveError('');
            }}
            onBlur={handleTitleBlur}
            maxLength={200}
            disabled={saving}
            aria-invalid={Boolean(fieldErrors.title)}
          />
          {fieldErrors.title && (
            <span className="form-error">{fieldErrors.title}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={(e) => {
              setForm((current) => ({ ...current, description: e.target.value }));
              setSaveError('');
            }}
            onBlur={handleDescriptionBlur}
            rows={5}
            disabled={saving}
          />
          {fieldErrors.description && (
            <span className="form-error">{fieldErrors.description}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handlePriorityChange}
            disabled={saving}
            aria-invalid={Boolean(fieldErrors.priority)}
          >
            {PRIORITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {fieldErrors.priority && (
            <span className="form-error">{fieldErrors.priority}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <div className="status-control">
            <StatusBadge status={ticket.status} />
            {nextStatuses.length > 0 ? (
              <select
                id="status"
                value={statusSelection}
                onChange={handleStatusChange}
                disabled={saving}
                aria-label="Change ticket status"
              >
                <option value="">
                  Change status
                </option>
                {nextStatuses.map((status) => (
                  <option key={status} value={status}>
                    {formatStatus(status)}
                  </option>
                ))}
              </select>
            ) : (
              <span className="status-hint">No further transitions available</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="assignedTo">Assignee</label>
          <select
            id="assignedTo"
            name="assignedTo"
            value={form.assignedTo}
            onChange={handleAssigneeChange}
            disabled={saving}
            aria-invalid={Boolean(fieldErrors.assignedTo)}
          >
            <option value="">Unassigned</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {fieldErrors.assignedTo && (
            <span className="form-error">{fieldErrors.assignedTo}</span>
          )}
        </div>

        <dl className="detail-meta">
          <DetailField label="Created by">
            {ticket.createdByName || 'Unknown'}
          </DetailField>
          <DetailField label="Created">
            {formatDate(ticket.createdAt)}
          </DetailField>
          <DetailField label="Last updated">
            {formatDate(ticket.updatedAt)}
          </DetailField>
        </dl>
      </div>

      <div className="card detail-section">
        <h2>Comments ({comments.length})</h2>

        {comments.length === 0 ? (
          <EmptyState message="No comments on this ticket yet." />
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

        <form className="comment-form" onSubmit={handleAddComment} noValidate aria-busy={submittingComment}>
          {submittingComment && (
            <LoadingState message="Adding comment..." />
          )}

          {commentError && (
            <div className="alert alert-error" role="alert">
              {commentError}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="commentAuthor">Comment as</label>
            <select
              id="commentAuthor"
              value={commentAuthor}
              onChange={(e) => {
                setCommentAuthor(e.target.value);
                setCommentFieldErrors((current) => ({ ...current, createdBy: '' }));
                setCommentError('');
              }}
              disabled={submittingComment}
              aria-invalid={Boolean(commentFieldErrors.createdBy)}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {commentFieldErrors.createdBy && (
              <span className="form-error">{commentFieldErrors.createdBy}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="comment">Add comment *</label>
            <textarea
              id="comment"
              value={commentMessage}
              onChange={(e) => {
                setCommentMessage(e.target.value);
                setCommentFieldErrors((current) => ({ ...current, message: '' }));
                setCommentError('');
              }}
              placeholder="Write a comment..."
              rows={4}
              disabled={submittingComment}
              aria-invalid={Boolean(commentFieldErrors.message)}
            />
            {commentFieldErrors.message && (
              <span className="form-error">{commentFieldErrors.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={submittingComment}
          >
            {submittingComment ? 'Adding...' : 'Add Comment'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default TicketDetailPage;
