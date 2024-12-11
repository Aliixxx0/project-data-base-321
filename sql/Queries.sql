-- Search for Trains
SELECT Train.Train_ID, Train.Arabic_Name, Train.English_Name, Trip.TDate, Trip.Departing_Station, Trip.Arrival_Station
FROM Train
JOIN Trip ON Train.Train_ID = Trip.Train_ID
WHERE Trip.TDate = '2024-12-12'; -- Replace with desired date

-- Book Seats
INSERT INTO Reservation (Reservation_ID, Reserve_Date, Cost, ID_Documents, RStatus, TripNo, Managed_By)
VALUES (101, CURRENT_DATE, 150, 'DocumentBlob', 'B', 12, 200); -- Replace with appropriate values

-- Complete Payment
INSERT INTO Bill (BStatus, Method, Number, Reservation_ID)
VALUES ('P', 'Credit Card', 301, 101); -- Replace with appropriate values

-- Retrieve Ticket with Seat Numbers
SELECT Seat.Number, Seat.Class
FROM Seat
WHERE Seat.Reservation_ID = 101; -- Replace with Reservation_ID

-- Add Reservation
INSERT INTO Reservation (Reservation_ID, Reserve_Date, Cost, ID_Documents, RStatus, TripNo, Managed_By)
VALUES (102, CURRENT_DATE, 200, 'DocumentBlob', 'B', 15, 300); -- Replace with values

-- Edit Reservation
UPDATE Reservation
SET Cost = 180, RStatus = 'C'
WHERE Reservation_ID = 101; -- Replace with desired Reservation_ID

-- Cancel Reservation
INSERT INTO Canceled_Reservation (Request_Date, Reservation_ID)
VALUES (CURRENT_DATE, 101); -- Replace with Reservation_ID

-- Assign Staff to Train
INSERT INTO AssignedStaff (Assiging_Date, Train_ID, National_ID)
VALUES (CURRENT_DATE, 1, 201); -- Replace with Train_ID and Staff National_ID

-- Promote Waitlisted Passenger
UPDATE Reservation
SET RStatus = 'B' -- Change status from waitlisted ('W') to booked ('B')
WHERE Reservation_ID = 103 AND RStatus = 'W'; -- Replace with Reservation_ID

-- Send Email Reminders to Passengers Who Did Not Pay
SELECT Passenger.National_ID, Passenger.Fname, Passenger.Lname, Passenger.Phone
FROM Passenger
JOIN PassengerReservations ON Passenger.National_ID = PassengerReservations.National_ID
JOIN Reservation ON PassengerReservations.Reservation_ID = Reservation.Reservation_ID
WHERE Reservation.RStatus = 'W'; -- 'W' indicates waiting for payment

-- Trigger: Send Message 3 Hours Before Departure
CREATE TRIGGER NotifyBeforeDeparture
AFTER INSERT ON Trip
FOR EACH ROW
BEGIN
    INSERT INTO Notification (Notification_ID, Type, NDate, SysID)
    VALUES (NEW.TripNo, 'M', CURRENT_DATE, '01');
END;

-- Login
SELECT National_ID
FROM Passenger
WHERE National_ID = 123 AND Phone = '0123456789'; -- Replace with credentials

-- Logout
-- Typically handled by application logic by invalidating session tokens

-- Current Active Trains on Their Way Today
SELECT Train.Train_ID, Train.English_Name, Trip.TDate, Trip.Departing_Time, Trip.Arrival_Time
FROM Train
JOIN Trip ON Train.Train_ID = Trip.Train_ID
WHERE Trip.TDate = CURRENT_DATE AND Trip.Departing_Time <= CURRENT_TIME AND Trip.Arrival_Time >= CURRENT_TIME;

-- List Stations for Each Train
SELECT Train.Train_ID, Station.Station_Name, Station.City
FROM Train
JOIN Trip ON Train.Train_ID = Trip.Train_ID
JOIN Station ON Station.Station_ID = Trip.Departing_Station OR Station.Station_ID = Trip.Arrival_Station;

-- Reservation Details Given Passenger ID
SELECT Reservation.Reservation_ID, Reservation.Reserve_Date, Reservation.Cost, Trip.TripNo, Trip.TDate
FROM Passenger
JOIN PassengerReservations ON Passenger.National_ID = PassengerReservations.National_ID
JOIN Reservation ON PassengerReservations.Reservation_ID = Reservation.Reservation_ID
JOIN Trip ON Reservation.TripNo = Trip.TripNo
WHERE Passenger.National_ID = 123; -- Replace with Passenger National_ID

-- Waitlisted Loyalty Passengers in Each Class Given Train Number
SELECT Passenger.National_ID, Passenger.Fname, Passenger.Lname, Seat.Class, Reservation.RStatus
FROM Passenger
JOIN PassengerReservations ON Passenger.National_ID = PassengerReservations.National_ID
JOIN Reservation ON PassengerReservations.Reservation_ID = Reservation.Reservation_ID
JOIN Seat ON Reservation.Reservation_ID = Seat.Reservation_ID
JOIN Trip ON Reservation.TripNo = Trip.TripNo
WHERE Trip.Train_ID = 1 AND Reservation.RStatus = 'W'; -- Replace with Train_ID
