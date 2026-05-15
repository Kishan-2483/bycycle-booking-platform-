import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./LandingPage.module.css";

function LandingPage() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.glowOrb1}></div>
          <div className={styles.glowOrb2}></div>
          <div className={styles.gridOverlay}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            Eco-Friendly Urban Mobility
          </div>
          <h1 className={styles.heroTitle}>
            Ride the Future with
            <span className={styles.highlight}> RideOn Wheels</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Book premium electric bicycles in seconds. Fast, affordable, and sustainable 
            transportation for modern cities. Join thousands of riders today.
          </p>
          <div className={styles.heroCta}>
            {userId ? (
              <button className={styles.primaryBtn} onClick={() => navigate("/bicycles")}>
                Browse Bicycles
                <span className={styles.btnArrow}>→</span>
              </button>
            ) : (
              <>
                <button className={styles.primaryBtn} onClick={() => navigate("/signup")}>
                  Start Riding Free
                  <span className={styles.btnArrow}>→</span>
                </button>
                <button className={styles.secondaryBtn} onClick={() => navigate("/login")}>
                  Sign In
                </button>
              </>
            )}
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Bicycles</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>10K+</span>
              <span className={styles.statLabel}>Happy Riders</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Locations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featuresInner}>
          <h2 className={styles.sectionTitle}>Why Choose RideOn Wheels?</h2>
          <p className={styles.sectionSubtitle}>Experience the best bicycle booking platform built for modern riders</p>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3>Instant Booking</h3>
              <p>Book your ride in under 30 seconds. No waiting, no hassle — just pick and go.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🛡️</div>
              <h3>Secure & Safe</h3>
              <p>Every bicycle is GPS-tracked and insured. Ride with complete peace of mind.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💰</div>
              <h3>Best Prices</h3>
              <p>Affordable hourly rates with no hidden charges. Pay only for what you ride.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🌿</div>
              <h3>Eco-Friendly</h3>
              <p>Zero emissions, zero pollution. Every ride helps make the planet greener.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <div className={styles.howItWorksInner}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <p className={styles.sectionSubtitle}>Get started in three simple steps</p>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>01</div>
              <h3>Create Account</h3>
              <p>Sign up for free in just a few seconds with your email.</p>
            </div>
            <div className={styles.stepConnector}></div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>02</div>
              <h3>Choose a Bicycle</h3>
              <p>Browse available bicycles and pick one that suits your ride.</p>
            </div>
            <div className={styles.stepConnector}></div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>03</div>
              <h3>Book & Ride</h3>
              <p>Confirm your booking, pick up the bike, and enjoy your ride!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <span className={styles.footerLogo}>⚡ RideOn<span>Wheels</span></span>
            <p>Premium electric bicycle booking platform for modern cities.</p>
          </div>
          <div className={styles.footerCopy}>
            <p>© 2026 RideOn Wheels. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;