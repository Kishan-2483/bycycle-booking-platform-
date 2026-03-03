import Navbar from "../components/Navbar";
import styles from "./LandingPage.module.css";

function LandingPage() {
  return (
    <>
      <Navbar />
      <div className={styles.hero}>
        <h1>Welcome to RideOn Wheels</h1>
        <p>Book electric bicycles in seconds.</p>
      </div>
    </>
  );
}

export default LandingPage;