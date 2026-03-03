import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./Signup.module.css";

function Signup() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const user = await registerUser(form);
      localStorage.setItem("userId", user.id);
      navigate("/bicycles");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2>Create Account</h2>
        <input placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button onClick={handleSubmit}>Signup</button>
      </div>
    </>
  );
}

export default Signup;