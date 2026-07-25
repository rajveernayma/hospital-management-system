import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Automatically choose backend
  const API_URL = import.meta.env.DEV
    ? "http://localhost:8000"
    : "https://hospital-management-system-lvu6.onrender.com";

  async function login() {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log("Login Response:", data);

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));

        window.location.reload();
      } else {
        alert(data.message || "Invalid Email or Password");
      }
    } catch (error) {
      console.error(error);
      alert("Cannot connect to backend.");
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>🏥 MediFlow</h1>

        <h3>Login Portal</h3>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default Login;