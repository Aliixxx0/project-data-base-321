const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection Setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Your MySQL username
  password: "", // Your MySQL password
  database: "railways_db" // Your database name
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
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
