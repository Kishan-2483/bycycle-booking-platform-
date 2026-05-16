import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./Login.module.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
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
    <div className="page-enter">
      <Navbar />
      <div className={styles.wrapper}>
        {/* Background decorations */}
        <div className={styles.bgDecor}>
          <div className={styles.bgOrb1}></div>
          <div className={styles.bgOrb2}></div>
        </div>

        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.icon}>⚡</span>
            <h2 className={styles.heading}>Welcome Back</h2>
            <p className={styles.subheading}>Sign in to your RideOn Wheels account</p>
          </div>

          <div className={`${styles.formGroup} ${focusedField === 'email' ? styles.focused : ''}`}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className={`${styles.formGroup} ${focusedField === 'password' ? styles.focused : ''}`}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              placeholder="••••••••"
              value={form.password}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            className={styles.button}
            onClick={handleLogin}
            disabled={loading || !form.email || !form.password}
          >
            {loading ? <span className={styles.spinner}></span> : (
              <>Sign In <span className={styles.btnArrow}>→</span></>
            )}
          </button>

          <p className={styles.switchText}>
            Don't have an account? <Link to="/signup" className={styles.switchLink}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;