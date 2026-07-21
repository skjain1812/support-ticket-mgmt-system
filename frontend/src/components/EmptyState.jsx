function EmptyState({ message, action }) {
  return (
    <div className="empty-state card" role="status">
      <p>{message}</p>
      {action && <div className="state-actions">{action}</div>}
    </div>
  );
}

export default EmptyState;
