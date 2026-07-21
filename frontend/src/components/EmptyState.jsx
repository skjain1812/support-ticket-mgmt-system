function EmptyState({ message, action }) {
  return (
    <div className="empty-state card">
      <p>{message}</p>
      {action}
    </div>
  );
}

export default EmptyState;
