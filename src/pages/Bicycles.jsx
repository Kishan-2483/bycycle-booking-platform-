import { useEffect, useState } from "react";
import { getBicycles } from "../api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./Bicycles.module.css";

function Bicycles() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getBicycles()
      .then(setBikes)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Available Bicycles</h1>
          <p className={styles.subtitle}>Choose your perfect ride from our premium collection</p>
        </div>

        {loading ? (
          <div className={styles.loadingGrid}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.skeleton}></div>
            ))}
          </div>
        ) : bikes.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🚲</span>
            <p>No bicycles available right now. Check back soon!</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {bikes.map((bike, index) => (
              <div
                key={bike.id}
                className={styles.card}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.cardBadge}>
                  {bike.count > 0 ? (
                    <span className={styles.available}>● Available</span>
                  ) : (
                    <span className={styles.outOfStock}>● Out of Stock</span>
                  )}
                </div>

                <div className={styles.bikeIcon}>🚲</div>

                <h3 className={styles.bikeName}>{bike.brand}</h3>
                <p className={styles.bikeModel}>{bike.model}</p>

                <div className={styles.priceTag}>
                  <span className={styles.currency}>₹</span>
                  <span className={styles.price}>{bike.pricePerHour}</span>
                  <span className={styles.perHour}>/hour</span>
                </div>

                <div className={styles.cardInfo}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Stock</span>
                    <span className={styles.infoValue}>{bike.count} units</span>
                  </div>
                </div>

                <button
                  className={`${styles.bookBtn} ${bike.count <= 0 ? styles.disabledBtn : ""}`}
                  disabled={bike.count <= 0}
                  onClick={() => navigate("/book", { state: bike })}
                >
                  {bike.count > 0 ? (
                    <>Book Now <span className={styles.btnArrow}>→</span></>
                  ) : (
                    "Out of Stock"
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Bicycles;