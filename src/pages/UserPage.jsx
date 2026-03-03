import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "./UserPage.module.css";

function UserPage() {
  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!userId) return;

    // Fetch User Details
    fetch(`http://localhost:8081/api/auth/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data));

    // Fetch Booking Details
    fetch(`http://localhost:8081/api/bookings/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, [userId]);

  if (!userId) {
    return <h2>Please Login</h2>;
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2>User Profile</h2>

        {user && (
          <div className={styles.card}>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        )}

        <h3>My Bookings</h3>

        {bookings.map((b) => (
          <div key={b.id} className={styles.card}>
            <p>Bicycle: {b.bicycle.model}</p>
            <p>Status: {b.status}</p>
            <p>Total Price: ₹{b.totalPrice}</p>
            {console.log(b)}
          </div>
        ))}
      </div>
    </>
  );
}

export default UserPage;
