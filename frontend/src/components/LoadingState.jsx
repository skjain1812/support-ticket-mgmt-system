function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="loading-state card" role="status" aria-live="polite">
      <p>{message}</p>
    </div>
  );
}

export default LoadingState;
