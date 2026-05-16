import { useEffect, useState } from "react";
import { getBicycles } from "../api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useScrollReveal from "../hooks/useScrollReveal";
import styles from "./Bicycles.module.css";

function Bicycles() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  useScrollReveal();

  useEffect(() => {
    getBicycles()
      .then(setBikes)
      .finally(() => setLoading(false));
  }, []);

  // Tilt effect on card
  const handleMouseMove = (e, index) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "";
    setHoveredCard(null);
  };

  const handleBookClick = (bike) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
    } else {
      navigate("/book", { state: bike });
    }
  };

  return (
    <div className="page-enter">
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.pageLabel}>Our Fleet</span>
          <h1 className={styles.title}>Available Bicycles</h1>
          <div className={styles.titleUnderline}></div>
          <p className={styles.subtitle}>Choose your perfect ride from our premium collection</p>
        </div>

        {loading ? (
          <div className={styles.loadingGrid}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.skeleton}>
                <div className={styles.skeletonIcon}></div>
                <div className={styles.skeletonLine}></div>
                <div className={styles.skeletonLineShort}></div>
              </div>
            ))}
          </div>
        ) : bikes.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🚲</span>
            <h3>No Bicycles Available</h3>
            <p>No bicycles available right now. Check back soon!</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {bikes.map((bike, index) => (
              <div
                key={bike.id}
                className={styles.card}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className={styles.cardGlow}></div>
                <div className={styles.cardBadge}>
                  {bike.count > 0 ? (
                    <span className={styles.available}>
                      <span className={styles.availableDot}></span>
                      Available
                    </span>
                  ) : (
                    <span className={styles.outOfStock}>
                      <span className={styles.outDot}></span>
                      Out of Stock
                    </span>
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
                  onClick={() => handleBookClick(bike)}
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
    </div>
  );
}

export default Bicycles;