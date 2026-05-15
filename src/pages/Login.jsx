import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./Login.module.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const user = await loginUser(form);
      localStorage.setItem("userId", user.id);
      navigate("/bicycles");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.icon}>⚡</span>
            <h2 className={styles.heading}>Welcome Back</h2>
            <p className={styles.subheading}>Sign in to your RideOn Wheels account</p>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            className={styles.button}
            onClick={handleLogin}
            disabled={loading || !form.email || !form.password}
          >
            {loading ? <span className={styles.spinner}></span> : "Sign In"}
          </button>

          <p className={styles.switchText}>
            Don't have an account? <Link to="/signup" className={styles.switchLink}>Create one</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;