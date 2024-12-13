import React, { useState } from "react";
import "./TripSearch.css";

function Booking() {
  const [showTable, setShowTable] = useState(false);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helper function to format date as yyyy/MM/dd
  const formatDate = (date) => {
    const selectedDate = new Date(date);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Add leading zero
    const day = String(selectedDate.getDate()).padStart(2, "0"); // Add leading zero
    return `${year}/${month}/${day}`;
  };

  // Fetch trips from the backend
  const fetchTrips = async (departingStation, destinationStation, selectedDate) => {
    setLoading(true);
    try {
      const formattedDate = formatDate(selectedDate); // Format the date
      const response = await fetch(
        `http://localhost:5000/trips?departing_station=${encodeURIComponent(
          departingStation
        )}&destination=${encodeURIComponent(destinationStation)}&date=${encodeURIComponent(
          formattedDate
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch trips");
      }
      const data = await response.json();
      setTrips(data); // Update trips with the response data
    } catch (error) {
      console.error("Error fetching trips:", error);
      setTrips([]);
    }
    setLoading(false);
  };

  const handleShowTable = (event) => {
    event.preventDefault();
    const departingStation = document.getElementById("origin").value;
    const destinationStation = document.getElementById("destination").value;
    const selectedDate = document.getElementById("date").value;
    setShowTable(true);
    fetchTrips(departingStation, destinationStation, selectedDate); // Fetch trips dynamically
  };

  const handleBuyTicket = (tripNo) => {
    console.log(`Buying ticket for Trip# ${tripNo}`);
    alert(`Ticket purchased for Trip# ${tripNo}`);
    // Add logic to send the tripNo to the backend
  };

  // Get today's date in yyyy-MM-dd format for the date input
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="booking-container">
      <div className="booking-card">
        <h2>Select Your Trip</h2>
        <form onSubmit={handleShowTable}>
          <div className="form-group">
            <label htmlFor="origin">Origin Station:</label>
            <select id="origin" name="origin" required>
              <option value="">Select Origin</option>
              <option value="Station A">Station A</option>
              <option value="Station B">Station B</option>
              <option value="Station C">Station C</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination Station:</label>
            <select id="destination" name="destination" required>
              <option value="">Select Destination</option>
              <option value="Station A">Station A</option>
              <option value="Station B">Station B</option>
              <option value="Station C">Station C</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              required
              min={today} // Prevent selecting past dates
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
                  <th>Departing Time</th>
                  <th>Arrival Time</th>
                  <th>Cost</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {trips.map((trip) => (
                  <tr key={trip.TripNo}>
                    <td>{trip.TripNo}</td>
                    <td>{trip.English_Name}</td>
                    <td>{trip.Departing_Time}</td>
                    <td>{trip.Arrival_Time}</td>
                    <td>{trip.Cost}</td>
                    <td>
                      <button
                        className="buy-ticket-button"
                        onClick={() => handleBuyTicket(trip.TripNo)}
                      >
                        Buy Ticket
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-trips-message">No trips available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Booking;