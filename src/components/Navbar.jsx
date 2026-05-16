import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.navInner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>⚡</span>
          <span className={styles.logoText}>RideOn<span className={styles.logoAccent}>Wheels</span></span>
        </Link>

        {/* Hamburger for mobile */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerActive : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`${styles.links} ${menuOpen ? styles.linksOpen : ""}`}>
          <Link to="/" className={`${styles.navLink} ${isActive("/") ? styles.active : ""}`}>
            <span className={styles.navLinkText}>Home</span>
          </Link>
          <Link to="/bicycles" className={`${styles.navLink} ${isActive("/bicycles") ? styles.active : ""}`}>
            <span className={styles.navLinkText}>Bicycles</span>
          </Link>

          {userId ? (
            <>
              <Link to="/profile" className={`${styles.navLink} ${isActive("/profile") ? styles.active : ""}`}>
                <span className={styles.navLinkText}>Profile</span>
              </Link>
              <Link to="/bookings" className={`${styles.navLink} ${isActive("/bookings") ? styles.active : ""}`}>
                <span className={styles.navLinkText}>Bookings</span>
              </Link>
              <button className={styles.logoutBtn} onClick={logout}>
                <span className={styles.logoutIcon}>⏻</span>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={`${styles.navLink} ${isActive("/login") ? styles.active : ""}`}>
                <span className={styles.navLinkText}>Login</span>
              </Link>
              <Link to="/signup" className={styles.signupBtn}>
                <span>Get Started</span>
                <span className={styles.signupArrow}>→</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;