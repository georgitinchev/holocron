import React, { useState } from "react";
import { login, register } from "./api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegistering) {
        await register(username, password);
        alert("Registration successful! Please log in.");
        setIsRegistering(false);
      } else {
        const data = await login(username, password);
        onLogin(data.access_token);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-100 mb-3">
          {isRegistering ? "Register" : "Login"}
        </button>
        {error && <p className="text-danger">{error}</p>}
      </form>
      <div className="text-center">
        <button
          className="btn btn-link"
          onClick={() => {
            setError("");
            setIsRegistering(!isRegistering);
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
