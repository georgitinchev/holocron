import React, { useState } from "react";
import { login, register } from "./api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isRegistering && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      if (isRegistering) {
        await register(username, password);
        alert("Registration successful! Please log in.");
        setIsRegistering(false);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      } else {
        const data = await login(username, password);
        onLogin(data.access_token);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5" style={{
      background: "rgba(20, 20, 30, 0.95)",
      borderRadius: "16px",
      boxShadow: "0 0 24px #00ffe7, 0 0 8px #005566 inset",
      padding: "2rem 2.5rem",
      maxWidth: 480
    }}>
      <h2 className="mb-4" style={{
        fontFamily: 'Orbitron, "Star Jedi", Arial, sans-serif',
        color: "#00ffe7",
        letterSpacing: "2px",
        textShadow: "0 0 8px #00ffe7, 0 0 2px #fff"
      }}>{isRegistering ? "Register for Holocron" : "Login to Holocron"}</h2>
      <form onSubmit={handleSubmit} className="w-100 mx-auto">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
          style={{ background: "#181828", color: "#00ffe7", border: "1px solid #00ffe7" }}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ background: "#181828", color: "#00ffe7", border: "1px solid #00ffe7" }}
        />
        {isRegistering && (
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ background: "#181828", color: "#00ffe7", border: "1px solid #00ffe7" }}
          />
        )}
        <button type="submit" className="btn btn-primary w-100 mb-3" style={{ background: "#00ffe7", border: "none", color: "#181828", fontWeight: 700, letterSpacing: "1px" }}>
          {isRegistering ? "Register" : "Login"}
        </button>
        {error && <p className="text-danger" style={{ color: "#ff3366", textShadow: "0 0 4px #ff3366" }}>{error}</p>}
      </form>
      <div className="text-center">
        <button
          className="btn btn-link"
          style={{ color: "#00ffe7", textShadow: "0 0 4px #00ffe7" }}
          onClick={() => {
            setError("");
            setIsRegistering(!isRegistering);
            setConfirmPassword("");
          }}
        >
          {isRegistering
            ? "Already have an account? Log in"
            : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
}
