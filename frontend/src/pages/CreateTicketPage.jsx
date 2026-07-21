import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, ApiError } from '../services/api';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { PRIORITY_OPTIONS } from '../utils/ticketHelpers';

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

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await api.getUsers();
        const userList = response.data || [];
        setUsers(userList);
        if (userList.length > 0) {
          setForm((current) => ({ ...current, createdBy: userList[0].id }));
        }
      } catch (err) {
        setLoadError(
          err instanceof ApiError
            ? err.message
            : 'Unable to load users. Check if the server is running.'
        );
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

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
        setSubmitError('Unable to create ticket. Check if the server is running.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <LoadingState message="Loading form..." />;
  }

  if (loadError) {
    return <ErrorState message={loadError} />;
  }

  return (
    <section>
      <div className="page-header">
        <h1>Create Ticket</h1>
        <Link to="/tickets" className="btn btn-secondary">
          Back to list
        </Link>
      </div>

      <form className="card" onSubmit={handleSubmit}>
        {submitError && <div className="alert alert-error">{submitError}</div>}

        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            maxLength={200}
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            {PRIORITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="createdBy">Created by *</label>
          <select
            id="createdBy"
            name="createdBy"
            value={form.createdBy}
            onChange={handleChange}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="assignedTo">Assignee</label>
          <select
            id="assignedTo"
            name="assignedTo"
            value={form.assignedTo}
            onChange={handleChange}
          >
            <option value="">Unassigned</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
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
