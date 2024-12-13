const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const Lport = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "",
  database: "ics321",
  port: 3306, // Explicitly specify the port
});

// Queries Passenger
app.get("/trips", (req, res) => {
  const { departing_station, destination, date } = req.query; // Extract query parameters

  // SQL Query with dynamic variables
  const tripsQ = `SELECT TripNo, English_Name, Departing_Time, Arrival_Time, Cost
    FROM Trip tr
    JOIN Train t ON tr.Train_ID = t.Train_ID
    JOIN Station dep ON tr.Departing_Station = dep.Station_ID
    JOIN Station arr ON tr.Arrival_Station = arr.Station_ID
    WHERE dep.Station_Name = ?
      AND arr.Station_Name = ?
      AND tr.TDate = ?
    ORDER BY tr.TDate, tr.Departing_Time;`;

  // Execute query with parameterized inputs to prevent SQL injection
  db.query(tripsQ, [departing_station, destination, date], (err, results) => {
    if (err) {
      console.error("Database query failed:", err.message);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.status(200).json(results);
  });
});

app.get("/reservations", (req, res) => {
  const { departing_station, destination, date } = req.query; // Extract query parameters

  // SQL Query with dynamic variables
  const reservationsList = `SELECT Reservation_ID,`;

  // Execute query with parameterized inputs to prevent SQL injection
  db.query(reservationsList, [departing_station, destination, date], (err, results) => {
    if (err) {
      console.error("Database query failed:", err.message);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.status(200).json(results);
  });
});

///////////////////////////////////////////////////////
db.connect((err) => {
  if (err) throw err;
  console.log('Database Connected');
});

app.listen(Lport, () => {
  console.log(`Server running on port ${Lport}`);
});