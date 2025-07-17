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
    <div className="container mt-5 text-center">
      <h1>Holocron AI Learning</h1>
      <LessonRequest token={token} />
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default App;
