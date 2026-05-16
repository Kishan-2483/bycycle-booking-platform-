import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./Signup.module.css";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const user = await registerUser(form);
      localStorage.setItem("userId", user.id);
      navigate("/bicycles");
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Password strength
  const getStrength = () => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 10) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return Math.min(score, 4);
  };

  const strength = getStrength();
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["", "#ef4444", "#f59e0b", "#06b6d4", "#10b981"];

  return (
    <div className="page-enter">
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.bgDecor}>
          <div className={styles.bgOrb1}></div>
          <div className={styles.bgOrb2}></div>
        </div>

        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.icon}>🚲</span>
            <h2 className={styles.heading}>Create Account</h2>
            <p className={styles.subheading}>Join RideOn Wheels and start riding today</p>
          </div>

          <div className={`${styles.formGroup} ${focusedField === 'name' ? styles.focused : ''}`}>
            <label className={styles.label}>Full Name</label>
            <input
              className={styles.input}
              placeholder="John Doe"
              value={form.name}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
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
              onChange={(e) => setForm({ ...form, email: e.target.value })}
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
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {form.password && (
              <div className={styles.strengthBar}>
                <div className={styles.strengthTrack}>
                  <div
                    className={styles.strengthFill}
                    style={{
                      width: `${(strength / 4) * 100}%`,
                      background: strengthColors[strength],
                    }}
                  ></div>
                </div>
                <span className={styles.strengthLabel} style={{ color: strengthColors[strength] }}>
                  {strengthLabels[strength]}
                </span>
              </div>
            )}
          </div>

          <button
            className={styles.button}
            onClick={handleSubmit}
            disabled={loading || !form.name || !form.email || !form.password}
          >
            {loading ? <span className={styles.spinner}></span> : (
              <>Create Account <span className={styles.btnArrow}>→</span></>
            )}
          </button>

          <p className={styles.switchText}>
            Already have an account? <Link to="/login" className={styles.switchLink}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;