const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const Lport = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection Setup
const db = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "",
  database: "ics321",
  port: 3306, // Explicitly specify the port
});

// Query
app.get("/trips", (req, res) => {
  const { date } = req.query; // Get the date from the query parameters
  if (!date) {
    return res.status(400).send({ error: "Date is required" });
  }

  const query = `SELECT * FROM Trip WHERE DATE = ?;`;

  db.query(query, [date], (err, results) => {
    if (err) {
      console.error("Error fetching train schedule:", err);
      res.status(500).send({ error: "Error fetching schedule" });
    } else if (results.length === 0) {
      res.json([]); // Send an empty array if no results are found
    } else {
      res.json(results); // Send the query results as JSON
    }
  });
});

// Connect to MySQL with Retry Logic
const connectWithRetry = () => {
  db.connect((err) => {
    if (err) {
      console.error("Database connection failed. Retrying in 5 seconds...", err);
      setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
    } else {
      console.log("Connected to MySQL database!");
    }
  });
};
connectWithRetry();

// API Endpoint to Fetch All Trains
app.get("/api/trains", (req, res) => {
  const sqlQuery = "SELECT * FROM trains";
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err.message);
      return res.status(500).json({ error: "Error fetching train data" });
    }
    res.status(200).json(results);
  });
});

// Handle Unknown Routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start Server
app.listen(Lport, () => {
  console.log(`Server is running on http://localhost:${Lport}`);
});
