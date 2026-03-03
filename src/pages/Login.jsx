import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./Login.module.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await loginUser(form);
      localStorage.setItem("userId", user.id);
      navigate("/bicycles");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.heading}>Login</h2>

        <input className={styles.input}
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input className={styles.input}
          type="password"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button className={styles.button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </>
  );
}

export default Login;