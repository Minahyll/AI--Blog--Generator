import { useState } from "react";
import axios from "axios";

const PlagiarismChecker = () => {
  const [content, setContent] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    if (!content.trim()) {
      setError("Please enter some content to check.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post("/api/plagiarism/check", { content });
      setResult(response.data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 50) return "#ef4444";
    if (score >= 20) return "#f97316";
    return "#22c55e";
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🔍 Plagiarism Checker</h2>
      <p style={styles.subtitle}>Paste your blog content below to check for plagiarism</p>

      <textarea
        style={styles.textarea}
        rows={10}
        placeholder="Paste your blog content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {error && <p style={styles.error}>{error}</p>}

      <button
        style={styles.button}
        onClick={handleCheck}
        disabled={loading}
      >
        {loading ? "Checking..." : "Check Plagiarism"}
      </button>

      {result && (
        <div style={styles.resultBox}>
          <h3 style={{ ...styles.score, color: getScoreColor(result.score) }}>
            Similarity Score: {result.score}%
          </h3>
          <p style={styles.message}>{result.message}</p>

          {result.matches.length > 0 && (
            <div>
              <h4 style={styles.matchTitle}>Matching Blogs:</h4>
              {result.matches.map((match, index) => (
                <div key={index} style={styles.matchCard}>
                  <span style={styles.matchName}>📄 {match.title}</span>
                  <span
                    style={{
                      ...styles.matchScore,
                      color: getScoreColor(match.similarityScore),
                    }}
                  >
                    {match.similarityScore}% match
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "760px",
    margin: "40px auto",
    padding: "32px",
    background: "#0f172a",
    borderRadius: "16px",
    color: "white",
    fontFamily: "'Segoe UI', sans-serif",
    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
  },
  heading: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "6px",
    color: "#e2e8f0",
  },
  subtitle: {
    color: "#94a3b8",
    marginBottom: "20px",
    fontSize: "14px",
  },
  textarea: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #334155",
    // background: "#1e293b",
    background: "#e2e8f0",
    color: "#f1f5f9",
    fontSize: "14px",
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
  },
  error: {
    color: "#f87171",
    marginTop: "8px",
    fontSize: "13px",
  },
  button: {
    marginTop: "16px",
    padding: "12px 28px",
    background: "#6365f1",
    color: "#ffffffea",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  resultBox: {
    marginTop: "28px",
    padding: "20px",
    background: "#2a1e3b",
    borderRadius: "12px",
    border: "1px solid #334155",
  },
  score: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "8px",
  },
  message: {
    color: "#cbd5e1",
    fontSize: "14px",
    marginBottom: "16px",
  },
  matchTitle: {
    color: "#94a3b8",
    fontSize: "14px",
    marginBottom: "10px",
  },
  matchCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 14px",
    background: "#0f172a",
    borderRadius: "8px",
    marginBottom: "8px",
    border: "1px solid #1e293b",
  },
  matchName: {
    fontSize: "14px",
    color: "#e2e8f0",
  },
  matchScore: {
    fontWeight: "700",
    fontSize: "14px",
  },
};

export default PlagiarismChecker;