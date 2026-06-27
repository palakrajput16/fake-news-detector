function HistoryList({ history }) {
  const getClass = (verdict) => {
    if (verdict === "Likely Real") return "real";
    if (verdict === "Likely Fake") return "fake";
    return "uncertain";
  };

  return (
    <div className="history-section">
      <h3>Recent Predictions</h3>
      {history.length === 0 ? (
        <p className="history-empty">No predictions yet.</p>
      ) : (
        history.map((item, index) => (
          <div key={index} className="history-item">
            <span className={`history-verdict ${getClass(item.verdict)}`}>
              {item.verdict}
            </span>
            <span className="history-text">
              {item.inputText?.slice(0, 60)}...
            </span>
            <span className="history-confidence">
              {item.confidence}%
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default HistoryList;