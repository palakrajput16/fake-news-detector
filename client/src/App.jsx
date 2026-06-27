import { useState } from "react";
import InputBox from "./components/InputBox";
import ResultCard from "./components/ResultCard";
import HistoryList from "./components/HistoryList";

function App() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const handleResult = (data) => {
    setResult(data);
    setHistory((prev) => [data, ...prev].slice(0, 5));
  };

  return (
    <div className="container">
      <div className="header">
        <h1> Fake News Detector</h1>
        <p>Paste a headline or article and the model will classify it.</p>
      </div>
      <InputBox onResult={handleResult} />
      {result && <ResultCard result={result} />}
      <HistoryList history={history} />
    </div>
  );
}

export default App;