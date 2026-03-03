import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <h2 className={styles.logo}>🚲 RideOn Wheels</h2>

      <div className={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/bicycles">Bicycles</Link>

        {userId ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/bookings">Bookings</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;