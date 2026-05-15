import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("userId");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={styles.navbar}>
      <div className={styles.navInner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>⚡</span>
          <span className={styles.logoText}>RideOn<span className={styles.logoAccent}>Wheels</span></span>
        </Link>

        <div className={styles.links}>
          <Link to="/" className={`${styles.navLink} ${isActive("/") ? styles.active : ""}`}>Home</Link>
          <Link to="/bicycles" className={`${styles.navLink} ${isActive("/bicycles") ? styles.active : ""}`}>Bicycles</Link>

          {userId ? (
            <>
              <Link to="/profile" className={`${styles.navLink} ${isActive("/profile") ? styles.active : ""}`}>Profile</Link>
              <Link to="/bookings" className={`${styles.navLink} ${isActive("/bookings") ? styles.active : ""}`}>Bookings</Link>
              <button className={styles.logoutBtn} onClick={logout}>
                <span className={styles.logoutIcon}>⏻</span>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={`${styles.navLink} ${isActive("/login") ? styles.active : ""}`}>Login</Link>
              <Link to="/signup" className={styles.signupBtn}>Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;