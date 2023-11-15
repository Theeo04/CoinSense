import { useRouter } from "next/router";
import React, { useState } from "react";
import { supabase } from "../../supabase";
// router.push("/homepage");

function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Error signing in:", error.message);
      } else if (data) {
        console.log("User has logged in:", data);
        router.push("/homepage");
        setUser(data);
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <div className="gradient-bg">
      <div className="login-container">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSignIn}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
          <div className="flex">
            <button
              onClick={() => router.push("/register")}
              className="register-butt"
            >
              Don&apos;t have an account? Register Now!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
