import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, ApiError } from '../services/api';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { PRIORITY_OPTIONS } from '../utils/ticketHelpers';
import { getErrorMessage } from '../utils/errorMessages';

const initialForm = {
  title: '',
  description: '',
  priority: 'medium',
  createdBy: '',
  assignedTo: '',
};

function CreateTicketPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setLoadError('');

      try {
        const response = await api.getUsers();
        if (cancelled) return;

        const userList = response.data || [];
        setUsers(userList);
        setForm({
          ...initialForm,
          createdBy: userList[0]?.id || '',
        });
      } catch (err) {
        if (!cancelled) {
          setLoadError(
            getErrorMessage(err, 'Unable to load users. Check if the server is running.')
          );
        }
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
  }, [reloadCount]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: '' }));
    setSubmitError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError('');
    setFieldErrors({});

    if (!form.title.trim()) {
      setFieldErrors({ title: 'Title is required' });
      return;
    }

    if (!form.createdBy) {
      setFieldErrors({ createdBy: 'Created by is required' });
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
        createdBy: form.createdBy,
        assignedTo: form.assignedTo || null,
      };

      const ticket = await api.createTicket(payload);
      navigate(`/tickets/${ticket.id}`);
    } catch (err) {
      if (err instanceof ApiError) {
        setSubmitError(err.message);
        const nextErrors = {};
        err.details.forEach((detail) => {
          if (detail.field) {
            nextErrors[detail.field] = detail.message;
          }
        });
        setFieldErrors(nextErrors);
      } else {
        setSubmitError(
          getErrorMessage(err, 'Unable to create ticket. Check if the server is running.')
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <LoadingState message="Loading form..." />;
  }

  if (loadError) {
    return (
      <section>
        <ErrorState
          message={loadError}
          onRetry={() => setReloadCount((count) => count + 1)}
          action={
            <Link to="/tickets" className="btn btn-secondary">
              Back to list
            </Link>
          }
        />
      </section>
    );
  }

  if (users.length === 0) {
    return (
      <section>
        <EmptyState
          message="No users available. Run the database seed script, then try again."
          action={
            <Link to="/tickets" className="btn btn-secondary">
              Back to list
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
          <h1>Create Ticket</h1>
          <p className="page-subtitle">
            New tickets start as <strong>open</strong> with <strong>medium</strong> priority by
            default.
          </p>
        </div>
        <Link to="/tickets" className="btn btn-secondary">
          Back to list
        </Link>
      </div>

      <form className="card" onSubmit={handleSubmit} noValidate aria-busy={submitting}>
        {submitError && (
          <div className="alert alert-error" role="alert">
            {submitError}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            maxLength={200}
            required
            autoFocus
            disabled={submitting}
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
            onChange={handleChange}
            rows={5}
            disabled={submitting}
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
            onChange={handleChange}
            disabled={submitting}
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
          <label htmlFor="createdBy">Created by *</label>
          <select
            id="createdBy"
            name="createdBy"
            value={form.createdBy}
            onChange={handleChange}
            required
            disabled={submitting}
            aria-invalid={Boolean(fieldErrors.createdBy)}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {fieldErrors.createdBy && (
            <span className="form-error">{fieldErrors.createdBy}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="assignedTo">Assignee</label>
          <select
            id="assignedTo"
            name="assignedTo"
            value={form.assignedTo}
            onChange={handleChange}
            disabled={submitting}
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

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Ticket'}
          </button>
          <Link to="/tickets" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}

export default CreateTicketPage;
