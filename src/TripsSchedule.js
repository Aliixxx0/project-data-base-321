import React, { useState, useEffect } from "react";

function TripsSchedule() {
  const [trips, setTrips] = useState([]); // State to store trips
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch trip schedule from the backend
  const fetchTripsSchedule = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/trip_list");
      if (!response.ok) {
        throw new Error("Failed to fetch trip schedule");
      }
      const data = await response.json();
      setTrips(data); // Update trips state with fetched data
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTripsSchedule(); // Fetch trips when the component mounts
  }, []);

  return (
    <section className="card">
      <h2>Trips Schedule</h2>
      <button onClick={fetchTripsSchedule}>Refresh Trips Schedule</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && trips.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Trip No</th>
              <th>Date</th>
              <th>Duration (mins)</th>
              <th>Miles</th>
              <th>Cost</th>
              <th>Departing Time</th>
              <th>Arrival Time</th>
              <th>Train ID</th>
              <th>Departing Station</th>
              <th>Arrival Station</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip.TripNo}>
                <td>{trip.TripNo}</td>
                <td>{trip.TDate}</td>
                <td>{trip.Duration}</td>
                <td>{trip.Miles}</td>
                <td>{trip.Cost}</td>
                <td>{trip.Departing_Time}</td>
                <td>{trip.Arrival_Time}</td>
                <td>{trip.Train_ID}</td>
                <td>{trip.Departing_Station}</td>
                <td>{trip.Arrival_Station}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && trips.length === 0 && !error && <p>No trips available.</p>}
    </section>
  );
}

export default TripsSchedule;
