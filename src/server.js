const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password', // Replace with your MySQL password
  database: 'train_reservation_system',
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
});
