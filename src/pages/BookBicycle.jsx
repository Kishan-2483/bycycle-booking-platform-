import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { bookBicycle } from "../api";
import Navbar from "../components/Navbar";
import styles from "./BookBicycle.module.css";

function BookBicycle() {
  const { state: bike } = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleBooking = async () => {
    try {
      await bookBicycle(userId, bike.id, start, end);
      alert("Booking Successful 🎉");
      navigate("/bookings");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.card}>
          <h2>{bike.brand} {bike.model}</h2>
          <p>₹{bike.pricePerHour}/hour</p>

          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />

          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />

          <button onClick={handleBooking}>
            Pay & Confirm
          </button>
        </div>
      </div>
    </>
  );
}

export default BookBicycle;