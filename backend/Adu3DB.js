const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const Lport = 5000;
var reserveNo=100;
var billNo=300;
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
app.get("/tripCost", (req, res) => {
  const { tripNo } = req.query; // Extract query parameters

  // SQL Query with dynamic variables
  const tripC = `SELECT Cost FROM Trip WHERE TripNo=?;`;

  // Execute query with parameterized inputs to prevent SQL injection
  db.query(tripC, [tripNo], (err, results) => {
    if (err) {
      console.error("Database query failed:", err.message);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.status(200).json(results);
  });
});

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
  const { id } = req.query; // Extract query parameters

  // SQL Query with dynamic variables
  const reservationsList = `SELECT 
    Train.English_Name AS Train_Name,
    Reservation.RStatus AS Reservation_Status,
    Departing_Station.Station_Name AS Origin,
    Arrival_Station.Station_Name AS Destination,
    Trip.TDate AS Departure_Date,
    Trip.Departing_Time AS Departure_Time
FROM 
    PassengerReservations
JOIN 
    Reservation ON PassengerReservations.Reservation_ID = Reservation.Reservation_ID
JOIN 
    Trip ON Reservation.TripNo = Trip.TripNo
JOIN 
    Train ON Trip.Train_ID = Train.Train_ID
JOIN 
    Station AS Departing_Station ON Trip.Departing_Station = Departing_Station.Station_ID
JOIN 
    Station AS Arrival_Station ON Trip.Arrival_Station = Arrival_Station.Station_ID
WHERE 
    PassengerReservations.National_ID=?;`;

  // Execute query with parameterized inputs to prevent SQL injection
  db.query(reservationsList, [id], (err, results) => {
    if (err) {
      console.error("Database query failed:", err.message);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.status(200).json(results);
  });
});

app.get("/dependent", (req, res) => {
  const { id } = req.query; // Extract the userId from query parameters

  // SQL Query with dynamic variables
  const dependentList = `SELECT Name, Relationship FROM Dependent WHERE Guardian_ID=?;`;

  // Execute query with parameterized input to prevent SQL injection
  db.query(dependentList, [id], (err, results) => {
    if (err) {
      console.error("Database query failed:", err.message);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.status(200).json(results);
  });
});

app.get("/reserve", (req, res) => {
  const { tripNo,id } = req.query; // Extract the userId from query parameters
  reserveNo++;
  // SQL Query with dynamic variables
  var reserve = `INSERT INTO Reservation (Reservation_ID, Reserve_Date, Cost, RStatus, TripNo, Managed_By)
  VALUES (${reserveNo},CURRENT_DATE,? ,'U',301);`;

  // Execute query with parameterized input to prevent SQL injection
  db.query(reserve, [tripNo], (err, results) => {
    if (err) {
      console.error("Database query failed:", err.message);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.status(200).json(results);
  });
  
  reserve = `INSERT INTO PassengerReservations (National_ID, Reservation_ID) VALUES (?,?)`
  db.query(reserve, [id,tripNo], (err, results) => {
    if (err) {
      console.error("Database query failed:", err.message);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.status(200).json(results);
  });
});

db.connect((err) => {
  if (err) throw err;
  console.log('Database Connected');
});

app.listen(Lport, () => {
  console.log(`Server running on port ${Lport}`);
});