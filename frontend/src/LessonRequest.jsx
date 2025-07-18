import React, { useState } from "react";
import { getLesson, getAIGeneratedContent } from "./api";

export default function LessonRequest({ token }) {
  const [topic, setTopic] = useState("");
  const [lesson, setLesson] = useState(null);
  const [error, setError] = useState("");
  const [useAI, setUseAI] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLesson(null);

    try {
      let data;
      if (useAI) {
        data = await getAIGeneratedContent(topic, token);
      } else {
        data = await getLesson(topic, token);
      }
      setLesson(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="container mt-4"
      style={{
        maxWidth: 480,
        background: "rgba(10,10,20,0.92)",
        borderRadius: 18,
        boxShadow: "0 0 32px #00ffe7, 0 0 8px #005566 inset",
        border: "1.5px solid #00ffe7",
      }}
    >
      <form onSubmit={handleSubmit} className="w-100 mx-auto">
        <h2
          style={{
            fontFamily: 'Orbitron, "Star Jedi", Arial, sans-serif',
            color: "#00ffe7",
            letterSpacing: "2px",
            textShadow: "0 0 8px #00ffe7, 0 0 2px #fff",
          }}
        >
          Request Lesson
        </h2>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Topic (e.g. The Force, Jedi, Tatooine)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          autoFocus
          style={{
            background: "#181828",
            color: "#00ffe7",
            border: "1.5px solid #00ffe7",
          }}
        />
        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="aiSwitch"
            checked={useAI}
            onChange={() => setUseAI((v) => !v)}
            style={{ cursor: "pointer" }}
          />
          <label
            className="form-check-label"
            htmlFor="aiSwitch"
            style={{ color: useAI ? "#ffe81f" : "#00ffe7", marginLeft: 8 }}
          >
            {useAI ? "Use AI-generated lesson" : "Use classic lesson"}
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-success w-100 mb-3"
          style={{ fontWeight: 700, letterSpacing: "1px" }}
        >
          Get Lesson
        </button>
      </form>

      {error && (
        <p
          className="text-danger"
          style={{ color: "#ff3366", textShadow: "0 0 4px #ff3366" }}
        >
          {error}
        </p>
      )}

      {lesson && (
        <div
          className="card p-3 mt-3"
          style={{
            background: "rgba(20,20,40,0.95)",
            borderRadius: 14,
            boxShadow: "0 0 16px #00ffe7aa",
            border: "1.5px solid #00ffe7",
            color: "#fff",
          }}
        >
          <h3 style={{ color: "#ffe81f", textShadow: "0 0 8px #ffe81f" }}>
            Lesson:
          </h3>
          <pre
            style={{
              textAlign: "left",
              background: "transparent",
              color: "#00ffe7",
              fontSize: "1.1em",
              border: "none",
            }}
          >
            {lesson.result ? lesson.result : JSON.stringify(lesson, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
