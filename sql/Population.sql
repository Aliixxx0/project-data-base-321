INSERT INTO Passenger (National_ID, Phone, Fname, Lname, DOB)
VALUES 
(101, '1234567890', 'John', 'Doe', '1990-01-01'),
(102, '0987654321', 'Jane', 'Smith', '1985-05-15'),
(103, '1122334455', 'Ali', 'Ahmed', '1995-07-20');
INSERT INTO Dependent (Name, Relationship, Guardian_ID)
VALUES 
('Sara', 'Daughter', 101),
('Adam', 'Son', 102);

INSERT INTO Station (Station_ID, Station_Name, City)
VALUES 
(1, 'Station A', 'City X'),
(2, 'Station B', 'City Y'),
(3, 'Station C', 'City Z');
INSERT INTO Train (Train_ID, Arabic_Name, English_Name)
VALUES 
(501, 'Qitar Aljanoub', 'Northern Train'),
(502, 'Qitar Alshamal', 'Southern Train');
INSERT INTO Staff (National_ID, Fname, Lname, DOB, Phone)
VALUES (301, 'John', 'Doe', '1985-05-15', '1234567890'),
(302,'Ahmad','Suleiman', '1992-03-12', '1231231231'),
(303,'Khaled','Ahnad', '1991-12-23', '1211211211');
INSERT INTO AssignedStaff (National_ID, Train_ID, Assiging_Date)
VALUES 
(301, 501, '2024-12-11'),
(302, 502, '2024-12-12');
INSERT INTO Trip (TripNo, Train_ID, TDate, Departing_Time, Arrival_Time, Departing_Station, Arrival_Station, Duration, Miles, Cost)
VALUES 
(1, 501, '2024-12-11', '10:00:00', '14:00:00', '1', '2', 4, 200, 100.00),
(2, 502, '2024-12-12', '15:00:00', '20:00:00', '2', '3', 5, 300, 150.00);
INSERT INTO Reservation (Reservation_ID, TripNo, Reserve_Date, Cost, RStatus, Managed_By)
VALUES 
(201, 1, '2024-12-11', 50.00, 'C', 301),
(202, 2, '2024-12-12', 60.00, 'W', 302),
(203, 1, '2024-12-11', 70.00, 'N', 303);
INSERT INTO Seat (TripNo, Reservation_ID, Number, Class)
VALUES 
(1, 201, 12, 0),
(2, 202, 15, 1),
(1, 203, 22, 0);
INSERT INTO Bill (Reservation_ID, BStatus, Number, Method)
VALUES 
(201, 'C', 1213, 1),
(202, 'P',1211, 2),
(203, 'N',1210, 0);

INSERT INTO PassengerReservations(National_ID, Reservation_ID) Values
(101,201);
