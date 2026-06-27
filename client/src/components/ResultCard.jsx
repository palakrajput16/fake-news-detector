function ResultCard({ result }) {
  const getClass = () => {
    if (result.verdict === "Likely Real") return "real";
    if (result.verdict === "Likely Fake") return "fake";
    return "uncertain";
  };

  const cls = getClass();

  return (
    <div className={`result-card ${cls}`}>
      <div className="verdict">{result.verdict}</div>
      <div className={`verdict-tag ${cls}`}>
        {cls === "fake" ? "Misinformation detected" : cls === "real" ? "Credible" : "Uncertain"}
      </div>
      <div className="confidence-label">
        Confidence — {result.confidence}%
      </div>
      <div className="confidence-bar-wrapper">
        <div
          className="confidence-bar"
          style={{ width: `${result.confidence}%` }}
        />
      </div>
      <p className="disclaimer">
        This tool uses a machine learning model and should not replace professional fact-checking.
      </p>
    </div>
  );
}

export default ResultCard;