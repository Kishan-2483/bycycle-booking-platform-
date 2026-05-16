import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import ParticleField from "../components/ParticleField";
import useScrollReveal from "../hooks/useScrollReveal";
import useCountUp from "../hooks/useCountUp";
import styles from "./LandingPage.module.css";

function LandingPage() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // Scroll reveal
  useScrollReveal();

  // Animated counters
  const bikes = useCountUp(500, 2000, "+");
  const riders = useCountUp(10, 2000, "K+");
  const locations = useCountUp(50, 2000, "+");

  // Typing effect for hero subtitle
  const [typedText, setTypedText] = useState("");
  const fullText = "Book premium electric bicycles in seconds. Fast, affordable, and sustainable transportation for modern cities.";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 25);
    return () => clearInterval(timer);
  }, []);

  // Mouse parallax for hero
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      {/* Hero Section */}
      <section
        className={styles.hero}
        ref={heroRef}
        onMouseMove={handleMouseMove}
      >
        <div className={styles.heroBg}>
          <div
            className={styles.glowOrb1}
            style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
          ></div>
          <div
            className={styles.glowOrb2}
            style={{ transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)` }}
          ></div>
          <div
            className={styles.glowOrb3}
            style={{ transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.4}px)` }}
          ></div>
          <div className={styles.gridOverlay}></div>
          <ParticleField particleCount={60} color="26, 115, 232" maxOpacity={0.5} />
        </div>

        {/* Floating decorative elements */}
        <div className={styles.floatingElements}>
          <div className={styles.floatingShape1}></div>
          <div className={styles.floatingShape2}></div>
          <div className={styles.floatingShape3}></div>
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
            {typedText}
            <span className={styles.cursor}>|</span>
          </p>
          <div className={styles.heroCta}>
            {userId ? (
              <button className={styles.primaryBtn} onClick={() => navigate("/bicycles")}>
                <span className={styles.btnContent}>Browse Bicycles</span>
                <span className={styles.btnArrow}>→</span>
                <span className={styles.btnShine}></span>
              </button>
            ) : (
              <>
                <button className={styles.primaryBtn} onClick={() => navigate("/signup")}>
                  <span className={styles.btnContent}>Start Riding Free</span>
                  <span className={styles.btnArrow}>→</span>
                  <span className={styles.btnShine}></span>
                </button>
                <button className={styles.secondaryBtn} onClick={() => navigate("/login")}>
                  Sign In
                </button>
              </>
            )}
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem} ref={bikes.ref}>
              <span className={styles.statNumber}>{bikes.display}</span>
              <span className={styles.statLabel}>Bicycles</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem} ref={riders.ref}>
              <span className={styles.statNumber}>{riders.display}</span>
              <span className={styles.statLabel}>Happy Riders</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem} ref={locations.ref}>
              <span className={styles.statNumber}>{locations.display}</span>
              <span className={styles.statLabel}>Locations</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollMouse}>
            <div className={styles.scrollWheel}></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featuresInner}>
          <div className="reveal">
            <span className={styles.sectionLabel}>Why Us</span>
            <h2 className={styles.sectionTitle}>Why Choose RideOn Wheels?</h2>
            <div className={styles.titleUnderline}></div>
            <p className={styles.sectionSubtitle}>Experience the best bicycle booking platform built for modern riders</p>
          </div>

          <div className={styles.featureGrid}>
            {[
              { icon: "⚡", title: "Instant Booking", desc: "Book your ride in under 30 seconds. No waiting, no hassle — just pick and go.", delay: 0 },
              { icon: "🛡️", title: "Secure & Safe", desc: "Every bicycle is GPS-tracked and insured. Ride with complete peace of mind.", delay: 0.1 },
              { icon: "💰", title: "Best Prices", desc: "Affordable hourly rates with no hidden charges. Pay only for what you ride.", delay: 0.2 },
              { icon: "🌿", title: "Eco-Friendly", desc: "Zero emissions, zero pollution. Every ride helps make the planet greener.", delay: 0.3 },
            ].map((feature, i) => (
              <div
                key={i}
                className={`${styles.featureCard} reveal`}
                style={{ transitionDelay: `${feature.delay}s` }}
              >
                <div className={styles.featureIconWrapper}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <div className={styles.featureIconGlow}></div>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
                <div className={styles.featureCardShine}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <div className={styles.howItWorksInner}>
          <div className="reveal">
            <span className={styles.sectionLabel}>Getting Started</span>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <div className={styles.titleUnderline}></div>
            <p className={styles.sectionSubtitle}>Get started in three simple steps</p>
          </div>

          <div className={styles.stepsGrid}>
            {[
              { num: "01", title: "Create Account", desc: "Sign up for free in just a few seconds with your email.", icon: "👤" },
              { num: "02", title: "Choose a Bicycle", desc: "Browse available bicycles and pick one that suits your ride.", icon: "🚲" },
              { num: "03", title: "Book & Ride", desc: "Confirm your booking, pick up the bike, and enjoy your ride!", icon: "🎉" },
            ].map((step, i) => (
              <div key={i} className={styles.stepWrapper}>
                {i > 0 && <div className={styles.stepConnector}><div className={styles.connectorDot}></div></div>}
                <div className={`${styles.stepCard} reveal`} style={{ transitionDelay: `${i * 0.15}s` }}>
                  <div className={styles.stepNumber}>{step.num}</div>
                  <div className={styles.stepIcon}>{step.icon}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaInner + " reveal"}>
          <div className={styles.ctaGlow}></div>
          <h2>Ready to Start Riding?</h2>
          <p>Join thousands of happy riders and experience eco-friendly urban mobility today.</p>
          <button
            className={styles.ctaBtn}
            onClick={() => navigate(userId ? "/bicycles" : "/signup")}
          >
            {userId ? "Browse Bicycles" : "Get Started — It's Free"}
            <span className={styles.btnArrow}>→</span>
          </button>
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
    </div>
  );
}

export default LandingPage;