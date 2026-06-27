import { useState } from "react";
import axios from "axios";

function InputBox({ onResult }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/classify",
        { text }
      );
      onResult({ ...response.data, inputText: text });
    } catch (error) {
      console.error(error);
      alert("Failed to classify. Make sure the server is running.");
    }
    setLoading(false);
  };

  return (
    <div className="input-wrapper">
      <textarea
        placeholder="Paste a news headline or article..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="analyze-btn"
        onClick={handleSubmit}
        disabled={loading || !text.trim()}
      >
        {loading ? "Analysing..." : "Analyse"}
      </button>
    </div>
  );
}

export default InputBox;