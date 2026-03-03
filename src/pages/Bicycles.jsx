import { useEffect, useState } from "react";
import { getBicycles } from "../api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./Bicycles.module.css";

function Bicycles() {
  const [bikes, setBikes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBicycles().then(setBikes);
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>Available Bicycles</h2>

        <div className={styles.grid}>
          {bikes.map((bike) => (
            <div key={bike.id} className={styles.card}>
              <h3>{bike.brand} {bike.model}</h3>
              <p>₹{bike.pricePerHour}/hour</p>
              <p>Available: {bike.count}</p>

              <button
                disabled={bike.count <= 0}
                onClick={() => navigate("/book", { state: bike })}
              >
                {bike.count > 0 ? "Book Now" : "Out of Stock"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Bicycles;