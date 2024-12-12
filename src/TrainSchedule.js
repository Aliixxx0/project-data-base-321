import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrainSchedule = () => {
  const [trains, setTrains] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTrain, setSelectedTrain] = useState(null);

  // Search Trains
  const searchTrains = async () => {
    const response = await axios.get(`/api/trains/search?name=${search}`);
    setTrains(response.data);
  };

  // Book Seat
  const bookSeat = async (train) => {
    const user_id = 1; // Example user
    const seat_number = Math.floor(Math.random() * 100);
    const response = await axios.post('/api/reservations/book', { user_id, train_id: train.train_id, seat_number });
    alert(response.data.message);
  };

  return (
    <div>
      <h1>Search for Trains</h1>
      <input
        type="text"
        placeholder="Train Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={searchTrains}>Search</button>

      <ul>
        {trains.map((train) => (
          <li key={train.train_id}>
            {train.name} - Seats Available: {train.seats_available}
            <button onClick={() => bookSeat(train)}>Book Seat</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainSchedule;

