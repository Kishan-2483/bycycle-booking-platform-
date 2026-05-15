import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { bookBicycle, getUserProfile } from "../api";
import Navbar from "../components/Navbar";
import styles from "./BookBicycle.module.css";

function BookBicycle() {
  const { state: bike } = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [totalCost, setTotalCost] = useState(null);
  const [hours, setHours] = useState(0);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch user profile to show "booked by"
  useEffect(() => {
    if (userId) {
      getUserProfile(userId).then((user) => {
        setUserName(user.name || user.email);
      });
    }
  }, [userId]);

  // Calculate total cost when dates change
  useEffect(() => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffMs = endDate - startDate;
      if (diffMs > 0) {
        const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
        setHours(diffHours);
        setTotalCost(diffHours * bike.pricePerHour);
      } else {
        setHours(0);
        setTotalCost(null);
      }
    } else {
      setHours(0);
      setTotalCost(null);
    }
  }, [start, end, bike.pricePerHour]);

  const handleBooking = async () => {
    if (!start || !end) {
      alert("Please select start and end times.");
      return;
    }
    if (new Date(end) <= new Date(start)) {
      alert("End time must be after start time.");
      return;
    }
    setLoading(true);
    try {
      await bookBicycle(userId, bike.id, start, end);
      alert("Booking Successful 🎉");
      navigate("/bookings");
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (!bike) {
    return (
      <>
        <Navbar />
        <div className={styles.container}>
          <p>No bicycle selected. Please go back and choose one.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.bikeEmoji}>🚲</span>
            <h2 className={styles.bikeName}>{bike.brand} {bike.model}</h2>
            <div className={styles.priceTag}>
              <span className={styles.currency}>₹</span>
              <span className={styles.priceValue}>{bike.pricePerHour}</span>
              <span className={styles.perHour}>/hour</span>
            </div>
          </div>

          <div className={styles.divider}></div>

          {/* Booked By Info */}
          <div className={styles.bookedBy}>
            <div className={styles.userIcon}>👤</div>
            <div>
              <span className={styles.bookedLabel}>Booking as</span>
              <span className={styles.bookedName}>{userName || "Loading..."}</span>
            </div>
          </div>

          <div className={styles.divider}></div>

          {/* Date Inputs */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Start Time</label>
            <input
              className={styles.input}
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>End Time</label>
            <input
              className={styles.input}
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>

          {/* Cost Summary */}
          {totalCost !== null && (
            <div className={styles.costSummary}>
              <div className={styles.costRow}>
                <span>Duration</span>
                <span>{hours} hour{hours > 1 ? "s" : ""}</span>
              </div>
              <div className={styles.costRow}>
                <span>Rate</span>
                <span>₹{bike.pricePerHour}/hr</span>
              </div>
              <div className={styles.costDivider}></div>
              <div className={styles.costTotal}>
                <span>Total Amount</span>
                <span className={styles.totalPrice}>₹{totalCost}</span>
              </div>
            </div>
          )}

          <button
            className={styles.confirmBtn}
            onClick={handleBooking}
            disabled={loading || !start || !end}
          >
            {loading ? (
              <span className={styles.spinner}></span>
            ) : (
              <>Confirm & Pay {totalCost ? `₹${totalCost}` : ""}</>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default BookBicycle;