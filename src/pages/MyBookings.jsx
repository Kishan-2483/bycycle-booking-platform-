import { useEffect, useState } from "react";
import { getUserBookings, deleteBooking, getUserProfile } from "../api";
import Navbar from "../components/Navbar";
import styles from "./MyBookings.module.css";

function MyBookings() {
  const userId = localStorage.getItem("userId");
  const [bookings, setBookings] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    // Fetch user name
    getUserProfile(userId).then((user) => {
      setUserName(user.name || user.email);
    });

    // Fetch bookings
    getUserBookings(userId)
      .then(setBookings)
      .finally(() => setLoading(false));
  }, [userId]);

  const cancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    await deleteBooking(id);
    setBookings(bookings.filter((b) => b.id !== id));
  };

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

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Bookings</h1>
          <p className={styles.subtitle}>
            {bookings.length > 0
              ? `You have ${bookings.length} booking${bookings.length > 1 ? "s" : ""}`
              : "No bookings yet"}
          </p>
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
            <h3>No Bookings Yet</h3>
            <p>Start by browsing our bicycles and book your first ride!</p>
          </div>
        ) : (
          <div className={styles.bookingList}>
            {bookings.map((b, index) => {
              const price = calcTotalPrice(b);
              return (
                <div
                  key={b.id}
                  className={styles.card}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={styles.cardLeft}>
                    <div className={styles.bikeIcon}>🚲</div>
                  </div>

                  <div className={styles.cardContent}>
                    <div className={styles.cardTop}>
                      <div>
                        <h3 className={styles.bikeModel}>
                          {b.bicycle?.brand} {b.bicycle?.model}
                        </h3>
                        <div className={styles.bookedBy}>
                          <span className={styles.userBadge}>👤</span>
                          Booked by: <strong>{b.user?.name || userName}</strong>
                        </div>
                      </div>
                      <div className={styles.statusBadge} data-status={b.status?.toLowerCase()}>
                        {b.status}
                      </div>
                    </div>

                    <div className={styles.cardDetails}>
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

                    <div className={styles.cardActions}>
                      <button
                        className={styles.cancelBtn}
                        onClick={() => cancelBooking(b.id)}
                      >
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default MyBookings;