import React from "react";
import "./App.css";
import TripsnSchedule from "./TripsSchedule.js"; // Import the TrainSchedule component

function App() {
  return (
    <div>
      {/* Header */}
      <header>
        <h1>Saudi Railways Management System</h1>
      </header>

      {/* Navigation Bar */}
      <nav>
        <a href="#search-trains">Search Trains</a>
        <a href="#book-ticket">Book Tickets</a>
        <a href="#manage-reservations">Manage Reservations</a>
        <a href="#reports">Reports</a>
      </nav>

      {/* Main Content */}
      <main className="container">
        {/* Search Trains Section */}
        <section id="search-trains" className="card">
          <h2>Search Trains</h2>
          <form action="search_trains.php" method="GET">
            <label htmlFor="origin">Origin Station:</label>
            <select id="origin" name="origin" required>
              <option value="dammam">Dammam</option>
              <option value="ahsaa">Al Ahsa</option>
              <option value="riyadh">Riyadh</option>
              <option value="khobar">Khobar</option>
            </select>
            <br />
            <label htmlFor="destination">Destination Station:</label>
            <select id="destination" name="destination" required>
              <option value="dammam">Dammam</option>
              <option value="ahsaa">Al Ahsa</option>
              <option value="riyadh">Riyadh</option>
              <option value="khobar">Khobar</option>
            </select>
            <br />
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" required />
            <br />
            <button type="submit">Search</button>
          </form>
        </section>

        {/* Book Tickets Section */}
        <section id="book-ticket" className="card">
          <h2>Book Tickets</h2>
          <form action="book_ticket.php" method="POST">
            <label htmlFor="train-id">Train ID:</label>
            <input type="text" id="train-id" name="train_id" required />
            <br />
            <label htmlFor="seat-class">Seat Class:</label>
            <select id="seat-class" name="seat_class">
              <option value="economy">Economy</option>
              <option value="business">Business</option>
            </select>
            <br />
            <button type="submit">Book</button>
          </form>
        </section>

        {/* Manage Reservations Section */}
        <section id="manage-reservations" className="card">
          <h2>Manage Reservations</h2>
          <form action="manage_reservations.php" method="POST">
            <label htmlFor="reservation-id">Reservation ID:</label>
            <input type="text" id="reservation-id" name="reservation_id" required />
            <br />
            <button type="submit">View/Edit</button>
          </form>
        </section>

        {/* Reports Section */}
        <section id="reports" className="card">
          <h2>Reports</h2>
          <ul>
            <li>
              <a href="active_trains.php">View Active Trains</a>
            </li>
            <li>
              <a href="station_list.php">View Station List</a>
            </li>
            <li>
              <a href="reservation_details.php">Reservation Details</a>
            </li>
          </ul>
        </section>

        {/* Train Schedule Section */}
        <TripsnSchedule /> {/* Add the TrainSchedule component */}
      </main>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Saudi Railways</p>
      </footer>
    </div>
  );
}

export default App;
