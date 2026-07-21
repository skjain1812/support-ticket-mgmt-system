function ErrorState({ message, onRetry, action }) {
  return (
    <div className="error-state card" role="alert">
      <p>{message}</p>
      {(onRetry || action) && (
        <div className="state-actions">
          {onRetry && (
            <button type="button" className="btn btn-secondary" onClick={onRetry}>
              Retry
            </button>
          )}
          {action}
        </div>
      )}
    </div>
  );
}

export default ErrorState;
