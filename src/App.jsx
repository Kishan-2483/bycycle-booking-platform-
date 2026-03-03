import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Bicycles from "./pages/Bicycles";
import BookBicycle from "./pages/BookBicycle";
import MyBookings from "./pages/MyBookings";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bicycles" element={<Bicycles />} />
        <Route path="/book" element={<BookBicycle />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/profile" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;