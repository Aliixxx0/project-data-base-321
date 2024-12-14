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
// Staff Queries 
app.get("/customerReservations", (req, res) => {
  const query = `SELECT 
    r.Reservation_ID AS id, 
    p.Fname AS passenger, 
    t.English_Name AS train,
    dep.Station_Name AS origin, 
    arr.Station_Name AS destination,
    r.Reserve_Date AS date, 
    tr.Departing_Time AS departing_time,
    r.RStatus AS status
FROM Reservation r
JOIN PassengerReservations pr ON r.Reservation_ID = pr.Reservation_ID
JOIN Passenger p ON pr.National_ID = p.National_ID
JOIN Trip tr ON r.TripNo = tr.TripNo
JOIN Train t ON tr.Train_ID = t.Train_ID
JOIN Station dep ON tr.Departing_Station = dep.Station_ID
JOIN Station arr ON tr.Arrival_Station = arr.Station_ID;`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching reservations:", err.message);
      return res.status(500).json({ error: "Error fetching reservations" });
    }
    res.status(200).json(results);
  });
});

// Queries Passenger
app.get("/confirmed-reservations", (req, res) => {
  const { nationalID } = req.query; // Extract the nationalID from query parameters

  // Validate that nationalID is provided
  const query = `SELECT COUNT(*) AS confirmedReservations
    FROM Reservation r
    JOIN PassengerReservations pr ON r.Reservation_ID = pr.Reservation_ID
    WHERE r.RStatus = 'C' 
    AND pr.National_ID =?;`;

  db.query(query, [nationalID], (err, results) => {
    if (err) {
      console.error("Database query failed:", err.message);
      return res.status(500).json({ error: "Database query failed" });
    }

    const confirmedReservations = results[0]?.confirmedReservations;
    // Respond with a well-structured JSON object
    res.status(200).json({ upcomingTrips: confirmedReservations });
  });
});

app.get("/active-trains", (req, res) => {
  const query = `SELECT COUNT(DISTINCT Train_ID) AS activeTrains
    FROM Trip
    WHERE TDate = CURRENT_DATE;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching active trains:", err.message);
      return res.status(500).json({ error: "Error fetching active trains" });
    }
    res.status(200).json(results[0]);
  });
});

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
  const tripsQ = `SELECT 
    tr.TripNo, 
    t.English_Name, 
    tr.Departing_Time, 
    tr.Arrival_Time, 
    tr.Cost
FROM 
    Trip tr
JOIN 
    Train t ON tr.Train_ID = t.Train_ID
JOIN 
    Station dep ON tr.Departing_Station = dep.Station_ID
JOIN 
    Station arr ON tr.Arrival_Station = arr.Station_ID
WHERE 
    dep.Station_Name = ?  
    AND arr.Station_Name = ?
    AND tr.TDate = ? 
ORDER BY 
    tr.Departing_Time;
;`;

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
    Reservation.Reservation_ID, Train.English_Name AS Train_Name,
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
  var lastReservationID = 0; // Initialize with 0 as a default value
  var lastBillNo=0;

  const fetchLastReservationID = () => {
    const query = `SELECT MAX(Reservation_ID) AS lastReservationID FROM Reservation;`;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching last reservation ID:", err.message);
      } else {
        lastReservationID = results[0]?.lastReservationID; // Default to 0 if no reservations exist
        console.log("Last Reservation ID:", lastReservationID);
      }
    });
  };
  
  // Fetch the last reservation ID when the server starts
  fetchLastReservationID();

  const fetchLastBillID = () => {
    const query = `SELECT MAX(Number) AS Number FROM Bill;`;
    db.query(query, (err, results) => {
    if (err) {
    console.error("Error fetching last bill ID:", err.message);
     } else {
    lastBillNo = results[0]?.lastBillNo; // Default to 0 if no reservations exist
    console.log("Last bill ID:", lastBillNo);
     }
     });
    };

    // Fetch the last bill ID when the server starts
    fetchLastBillID();
    console.log(lastBillNo)

  const { nationalID, cost, tripNo } = req.query;
  // Increment the last reservation ID
  lastReservationID++;

  const reserveQuery = `INSERT INTO Reservation (Reservation_ID, Reserve_Date, Total_Cost, RStatus, TripNo, Managed_By)
  VALUES (?, CURRENT_DATE, ?, 'U', ?, 301);`;
  // Execute the first query
  db.query(reserveQuery, [lastReservationID, cost,tripNo], (err, reserveResults) => {
    if (err) {
      console.error("Error inserting into Reservation:", err.message);
      return res.status(500).json({ error: "Error inserting into Reservation" });
    }
    // Insert into PassengerReservations
    const insertPassengerReservationQuery = `
      INSERT INTO PassengerReservations (National_ID, Reservation_ID)
      VALUES (?, ?);
    `;

    db.query(insertPassengerReservationQuery, [nationalID, lastReservationID], (err, results) => {
      if (err) {
        console.error("Error inserting passenger reservation:", err.message);
        return res.status(500).json({ error: "Failed to insert passenger reservation" });
      }

      res.status(200).json({ message: "Reservation created successfully", reservationID: lastReservationID });
    });
  });

  // End of reserve query
});


db.connect((err) => {
  if (err) throw err;
  console.log('Database Connected');
});

app.listen(Lport, () => {
  console.log(`Server running on port ${Lport}`);
});