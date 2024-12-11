import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import TrainImage from "./assets/train.webp"; // Import your train image
import Booking from "./passenger/Booking"; // Updated import
import Login from "./Login";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Homepage Route */}
          <Route
            path="/"
            element={
              <div className="homepage">
                <header className="homepage-header">
                  <h1>Saudi Railways Management System</h1>
                </header>
                <main className="homepage-main">
                  <img src={TrainImage} alt="Train" className="train-image" />
                  <p className="homepage-tagline">
                    Experience the most advanced railway system in Saudi Arabia.
                  </p>
                  <div className="homepage-buttons">
                    <Link to="/login" className="button">Login</Link>
                    <Link to="/trips-schedule" className="button">View Schedule</Link>
                  </div>
                </main>
                <footer className="homepage-footer">
                  <p>&copy; 2024 Saudi Railways</p>
                </footer>
              </div>
            }
          />

          {/* Other Routes */}
          <Route path="Booking" element={<Booking />} />
          {/* Add Login route */}
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;