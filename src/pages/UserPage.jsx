import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import useScrollReveal from "../hooks/useScrollReveal";
import styles from "./UserPage.module.css";

function UserPage() {
  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useScrollReveal();

  useEffect(() => {
    if (!userId) return;

    // Fetch User Details
    fetch(`http://localhost:8081/api/auth/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data));

    // Fetch Booking Details
    fetch(`http://localhost:8081/api/bookings/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .finally(() => setLoading(false));
  }, [userId]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate total price from startTime, endTime and pricePerHour
  const calcTotalPrice = (b) => {
    if (b.totalPrice != null) return b.totalPrice;
    if (b.startTime && b.endTime && b.bicycle?.pricePerHour) {
      const diffMs = new Date(b.endTime) - new Date(b.startTime);
      if (diffMs > 0) {
        const hours = Math.ceil(diffMs / (1000 * 60 * 60));
        return hours * b.bicycle.pricePerHour;
      }
    }
    return null;
  };

  // Calculate total spent
  const totalSpent = bookings.reduce((sum, b) => {
    const price = calcTotalPrice(b);
    return sum + (price || 0);
  }, 0);

  if (!userId) {
    return (
      <div className="page-enter">
        <Navbar />
        <div className={styles.container}>
          <div className={styles.loginPrompt}>
            <span className={styles.lockIcon}>🔒</span>
            <h2>Please Login</h2>
            <p>You need to be logged in to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <Navbar />
      <div className={styles.container}>
        {/* Profile Card */}
        {user && (
          <div className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <div className={styles.profileHeaderBg}></div>
              <div className={styles.avatar}>
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className={styles.profileInfo}>
                <h1 className={styles.userName}>{user.name}</h1>
                <p className={styles.userEmail}>{user.email}</p>
              </div>
            </div>
            <div className={styles.profileMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>🎭</span>
                <span className={styles.metaLabel}>Role</span>
                <span className={styles.metaValue}>{user.role}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>📊</span>
                <span className={styles.metaLabel}>Total Bookings</span>
                <span className={styles.metaValue}>{bookings.length}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>💰</span>
                <span className={styles.metaLabel}>Total Spent</span>
                <span className={styles.metaValueHighlight}>₹{totalSpent}</span>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Section */}
        <div className={styles.bookingsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Booking History</h2>
            <span className={styles.sectionCount}>{bookings.length} rides</span>
          </div>

          {loading ? (
            <div className={styles.loadingList}>
              {[1, 2].map((i) => (
                <div key={i} className={styles.skeleton}></div>
              ))}
            </div>
          ) : bookings.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>📋</span>
              <p>No bookings yet. Start riding today!</p>
            </div>
          ) : (
            <div className={styles.bookingList}>
              {bookings.map((b, index) => {
                const price = calcTotalPrice(b);
                return (
                  <div
                    key={b.id}
                    className={styles.bookingCard}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={styles.bookingHeader}>
                      <div className={styles.bookingBikeInfo}>
                        <span className={styles.bookingIcon}>🚲</span>
                        <div>
                          <h3>{b.bicycle?.brand} {b.bicycle?.model}</h3>
                          <span className={styles.bookingUser}>
                            👤 Booked by: <strong>{b.user?.name || user?.name}</strong>
                          </span>
                        </div>
                      </div>
                      <div className={styles.statusBadge} data-status={b.status?.toLowerCase()}>
                        <span className={styles.statusDot}></span>
                        {b.status}
                      </div>
                    </div>

                    <div className={styles.bookingDetails}>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Start</span>
                        <span className={styles.detailValue}>{formatDate(b.startTime)}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>End</span>
                        <span className={styles.detailValue}>{formatDate(b.endTime)}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Rate</span>
                        <span className={styles.detailValue}>₹{b.bicycle?.pricePerHour}/hr</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Total Price</span>
                        <span className={styles.priceValue}>
                          ₹{price != null ? price : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
