import React, { useState } from "react";
import { getLesson } from "./api";

export default function LessonRequest({ token }) {
  const [topic, setTopic] = useState("");
  const [lesson, setLesson] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLesson(null);

    try {
      const data = await getLesson(topic, token);
      setLesson(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-4 w-50">
      <form onSubmit={handleSubmit}>
        <h2>Request Lesson</h2>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          autoFocus
        />
        <button type="submit" className="btn btn-success w-100 mb-3">
          Get Lesson
        </button>
      </form>

      {error && <p className="text-danger">{error}</p>}

      {lesson && (
        <div className="card p-3">
          <h3>Lesson:</h3>
          <pre>{JSON.stringify(lesson, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
