import React, { useState, useEffect } from "react";
import "./Booking.css";

function Booking() {
  const [showTable, setShowTable] = useState(false);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // Fetch trips from the backend
  const fetchTrips = async (date) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/trips?date=${date}`);
      const data = await response.json();
      setTrips(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
      setTrips([]);
    }
    setLoading(false);
  };

  const handleShowTable = (event) => {
    event.preventDefault();
    setShowTable(true);
    fetchTrips(selectedDate); // Fetch trips using the selected date
  };

  const handleBuyTicket = (tripNo) => {
    console.log(`Buying ticket for Trip# ${tripNo}`);
    alert(`Ticket purchased for Trip# ${tripNo}`);
    // Add logic to send the tripNo to the backend
  };

  return (
    <div className="booking-container">
      <div className="booking-card">
        <h2>Select Your Trip</h2>
        <form onSubmit={handleShowTable}>
          <div className="form-group">
            <label htmlFor="origin">Origin Station:</label>
            <select id="origin" name="origin" required>
              <option value="">Select Origin</option>
              <option value="dammam">Dammam</option>
              <option value="ahsaa">Al Ahsa</option>
              <option value="riyadh">Riyadh</option>
              <option value="khobar">Khobar</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination Station:</label>
            <select id="destination" name="destination" required>
              <option value="">Select Destination</option>
              <option value="dammam">Dammam</option>
              <option value="ahsaa">Al Ahsa</option>
              <option value="riyadh">Riyadh</option>
              <option value="khobar">Khobar</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              required
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <button type="submit" className="booking-button">Continue</button>
        </form>
      </div>

      {showTable && (
        <div className="schedule-table">
          <h3>Available Trips</h3>
          {loading ? (
            <p>Loading trips...</p>
          ) : trips.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Trip#</th>
                  <th>Train Name</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Time</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {trips.map((trip) => (
                  <tr key={trip.tripNo}>
                    <td>{trip.tripNo}</td>
                    <td>{trip.trainName}</td>
                    <td>{trip.origin}</td>
                    <td>{trip.destination}</td>
                    <td>{trip.time}</td>
                    <td>{trip.date}</td>
                    <td>
                      <button
                        className="buy-ticket-button"
                        onClick={() => handleBuyTicket(trip.tripNo)}
                      >
                        Buy Ticket
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-trips-message">No trips available for the selected date.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Booking;
