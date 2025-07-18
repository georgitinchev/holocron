import React, { useState, useEffect } from "react";
import Login from "./Login";
import LessonRequest from "./LessonRequest";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh", width: "100vw", background: "none" }}>
      <h1 style={{
        fontFamily: 'Orbitron, "Star Jedi", Arial, sans-serif',
        color: "#00ffe7",
        letterSpacing: "2px",
        textShadow: "0 0 8px #00ffe7, 0 0 2px #fff",
        marginBottom: 32
      }}>Holocron AI Learning</h1>
      <LessonRequest token={token} />
      <button className="btn w-100 mt-3" style={{ maxWidth: 480, background: "linear-gradient(90deg, #ff3366 0%, #ffe81f 100%)", color: "#181828", fontWeight: 700, letterSpacing: "1px", border: "none" }} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default App;
