import React, { useEffect, useState } from "react";
import axios from "axios";

function TrainSchedule() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/trains")
      .then((response) => setTrains(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <section id="train-schedule" className="card">
      <h2>Train Schedule</h2>
      <table border="1" style={{ width: "100%", margin: "auto" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure Time</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr key={train.id}>
              <td>{train.id}</td>
              <td>{train.name}</td>
              <td>{train.origin}</td>
              <td>{train.destination}</td>
              <td>{train.departure_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TrainSchedule;
