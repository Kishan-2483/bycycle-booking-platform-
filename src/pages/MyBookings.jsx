import { useEffect, useState } from "react";
import { getUserBookings, deleteBooking } from "../api";
import Navbar from "../components/Navbar";
import styles from "./MyBookings.module.css";

function MyBookings() {
  const userId = localStorage.getItem("userId");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getUserBookings(userId).then(setBookings);
  }, [userId]);

  const cancelBooking = async (id) => {
    await deleteBooking(id);
    setBookings(bookings.filter((b) => b.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2>My Bookings</h2>

        {bookings.map((b) => (
          <div key={b.id} className={styles.card}>
            <p><strong>{b.bicycle.model}</strong></p>
            <p>Status: {b.status}</p>
            <button onClick={() => cancelBooking(b.id)}>
              Cancel
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default MyBookings;