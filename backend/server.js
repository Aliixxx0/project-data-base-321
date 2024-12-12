const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const Lport = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password', // Replace with your MySQL password
  database: 'train_reservation_system',
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

db.connect((err) => {
  if (err) throw err;
  console.log('Database Connected');
});

// Routes
// Search for Trains
app.get('/api/trains/search', (req, res) => {
  const { name } = req.query;
  db.query('SELECT * FROM Trains WHERE name LIKE ?', [`%${name}%`], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Book Seat
app.post('/api/reservations/book', (req, res) => {
  const { user_id, train_id, seat_number } = req.body;
  db.query(
    'INSERT INTO Reservations (user_id, train_id, seat_number, payment_status) VALUES (?, ?, ?, "completed")',
    [user_id, train_id, seat_number],
    (err, result) => {
      if (err) return res.status(500).send(err);
      db.query('UPDATE Trains SET seats_available = seats_available - 1 WHERE train_id = ?', [train_id]);
      res.send({ message: 'Reservation successful', reservationId: result.insertId });
    }
  );
});

// Promote Waitlist
app.post('/api/waitlist/promote', (req, res) => {
  const { user_id, train_id } = req.body;
  db.query('UPDATE Waitlist SET status = "promoted" WHERE user_id = ? AND train_id = ?', [user_id, train_id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Waitlisted passenger promoted' });
  });
});

// Active Trains Report
app.get('/api/trains/active', (req, res) => {
  db.query('SELECT * FROM Trains WHERE active = TRUE', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Average Load Factor
app.get('/api/reports/load-factor', (req, res) => {
  const { date } = req.query;
  db.query(
    'SELECT name, (total_seats - seats_available) / total_seats * 100 AS load_factor FROM Trains',
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
// Start Server
app.listen(Lport, () => {
  console.log(`Server is running on http://localhost:${Lport}`);
});
