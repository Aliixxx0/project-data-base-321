INSERT INTO Luggage (Luggage_ID, Weight, Dimensions, Luggage_Fee) VALUES
(1, 10, 100, 25),
(2, 15, 150, 30),
(3, 20, 200, 35),
(4, 30, 250, 50),
(5, 5, 50, 15),
(6, 8, 80, 20),
(7, 12, 120, 28),
(8, 18, 180, 40),
(9, 25, 300, 60),
(10, 22, 220, 55);
INSERT INTO ESystem (System_Name, SysID) VALUES
('Saudi Railways System', 'SR'),
('Makkah Reservation System', 'MR'),
('Riyadh Online Booking', 'RO');
INSERT INTO Staff (National_ID, Fname, Lname, DOB, Phone) VALUES
(301, 'Adel', 'Al-Zahrani', '1980-05-05', '506789012'),
(302, 'Sarah', 'Al-Shehri', '1988-11-11', '507890123'),
(303, 'Abdullah', 'Al-Aseeri', '1975-01-20', '508901234'),
(304, 'Fahd', 'Al-Qhatani', '1992-02-10', '509012345'),
(305, 'Aisha', 'Al-Sharif', '1985-08-13', '501122334'),
(306, 'Nawaf', 'Al-Faraj', '1991-05-17', '501234432'),
(307, 'Salma', 'Al-Harbi', '1993-09-23', '506789923'),
(308, 'Mubarak', 'Al-Hamdan', '1982-01-30', '504567891'),
(309, 'Said', 'Al-Sultan', '1987-12-25', '501122333'),
(310, 'Najla', 'Al-Jubair', '1990-03-13', '502345678');
INSERT INTO Train (Train_ID, Arabic_Name, English_Name) VALUES
(501, 'قطار الشمال', 'Qitar Al-Shamal'),
(502, 'قطار الجنوب', 'Qitar Al-Janub'),
(503, 'قطار المدينة', 'Qitar Al-Madina'),
(504, 'قطار الرياض', 'Qitar Al-Riyadh'),
(505, 'قطار مكة', 'Qitar Makkah'),
(506, 'قطار الدمام', 'Qitar Al-Dammam'),
(507, 'قطار الخبر', 'Qitar Al-Khobar'),
(508, 'قطار الطائف', 'Qitar Al-Taif'),
(509, 'قطار جدة', 'Qitar Jeddah'),
(510, 'قطار القصيم', 'Qitar Al-Qassim');
INSERT INTO Station (Station_ID, Station_Name, City) VALUES
(1, 'Riyadh Station', 'Riyadh'),
(2, 'Jeddah Station', 'Jeddah'),
(3, 'Dammam Station', 'Dammam'), 
INSERT INTO Passenger (National_ID, Phone, Fname, Lname, DOB) VALUES
(101, '501234567', 'Adel', 'Al-Zahrani', '1985-03-25'),
(102, '502345678', 'Sarah', 'Al-Shehri', '1990-06-10'),
(103, '503456789', 'Ali', 'Ahmed', '1995-07-20'),
(104, '504567890', 'Salman', 'Al-Ateibi', '1980-02-20'),
(105, '505678901', 'Nora', 'Al-Khulaifi', '1995-12-30'),
(106, '506789012', 'Abdullah', 'Al-Shahri', '1991-01-05'),
(107, '507890123', 'Ali', 'Al-Maliki', '1987-07-15'),
(108, '508901234', 'Fatima', 'Al-Sultan', '1993-10-25'),
(109, '509012345', 'Khaled', 'Al-Anazi', '1988-04-11'),
(110, '501122334', 'Miriam', 'Al-Abdullah', '1996-06-07');
INSERT INTO Dependent (Name, Relationship, Guardian_ID) VALUES
('Miriam', 'Daughter', 101),
('Ali', 'Son', 102),
('Khaled', 'Brother', 103),
('Sarah', 'Sister', 104),
('Abdullah', 'Son', 105),
('Fatima', 'Mother', 106),
('Saleh', 'Brother', 107),
('Layla', 'Sister', 108),
('Hani', 'Son', 109),
('Miriam', 'Daughter', 110);
INSERT INTO AssignedStaff (Assiging_Date, Train_ID, National_ID) VALUES
('2024-12-11', 501, 301),
('2024-12-12', 502, 302),
('2024-12-13', 503, 303),
('2024-12-14', 504, 304),
('2024-12-15', 505, 305),
('2024-12-16', 506, 306),
('2024-12-17', 507, 307),
('2024-12-18', 508, 308),
('2024-12-19', 509, 309),
('2024-12-20', 510, 310);
INSERT INTO Notification (Notification_ID, Type, NDate, SysID) VALUES
(1, 'R', '2024-12-10', 1),
(2, 'R', '2024-12-11', 1),
(3, 'N', '2024-12-12', 2),
(4, 'N', '2024-12-13', 2);
INSERT INTO Reservation (Reservation_ID, Reserve_Date, Cost, RStatus, TripNo, Managed_By) VALUES
(201, '2024-12-01', 120, 'C', 1, 301),
(202, '2024-12-02', 100, 'W', 2, 302),
(203, '2024-12-03', 90, 'N', 3, 303),
(204, '2024-12-04', 150, 'W', 4, 304),
(205, '2024-12-05', 110, 'C', 5, 305),
(206, '2024-12-06', 170, 'W', 6, 306),
(207, '2024-12-07', 105, 'C', 7, 307),
(208, '2024-12-08', 120, 'W', 1, 301),
(209, '2024-12-09', 100, 'N', 2, 302),
(210, '2024-12-10', 90, 'C', 3, 303);
INSERT INTO Seat (Number, Class, Reservation_ID, TripNo) VALUES
(1, 'Business', 201, 1),
(2, 'Business', 202, 2),
(3, 'Business', 203, 3),
(4, 'Business', 204, 4),
(5, 'Economy', 205, 5),
(6, 'Economy', 206, 6),
(7, 'Economy', 207, 7),
(8, 'Economy', 208, 1),
(9, 'Economy', 209, 2),
(10, 'Economy', 210, 3);
INSERT INTO Canceled_Reservation (Request_Date, Reservation_ID) VALUES
('2024-12-03', 203),
('2024-12-09', 209);
INSERT INTO Under_processing_Reservation (Expire_Date, Reservation_ID) VALUES
('2024-12-14', 202),
('2024-12-15', 204),
('2024-12-14', 206),
('2024-12-16', 208);
INSERT INTO Bill (BStatus, Method, Number, Reservation_ID) VALUES
('P', 'Credit Card', 1, 201),
('U', 'Cash', 2, 202),
('N', 'N/A', 3, 203),
('U', 'Credit Card', 4, 204),
('P', 'Cash', 5, 205),
('N', 'Cash', 6, 206),
('P', 'Credit Card', 7, 207),
('U', 'Cash', 8, 208),
('N', 'N/A', 9, 209),
('P', 'Credit Card', 10, 210);
INSERT INTO Creates (Reservation_ID, Notification_ID) VALUES
(201, 1),
(202, 2),
(203, 3),
(204, 4),
(205, 5),
(206, 6),
(207, 7),
(208, 8),
(209, 9),
(210, 10);
xNéon — Today at 3:06 AM
INSERT INTO PassengerReservations (National_ID, Reservation_ID) VALUES
(101, 201),
(102, 202),
(103, 203),
(104, 204),
(105, 205),
(106, 206),
(107, 207),
(108, 208),
(109, 209),
(110, 210);
INSERT INTO Trip (TripNo, Train_ID, TDate, Departing_Time, Arrival_Time, Departing_Station, Arrival_Station, Duration, Miles, Cost) VALUES
(1, 501, '2024-12-14', '10:00:00', '14:00:00', 1, 2, 3, 400, 120),
(2, 502, '2024-12-14', '15:00:00', '20:00:00', 3, 4, 4, 350, 100),
(3, 503, '2024-12-15', '06:00:00', '09:00:00', 4, 5, 3, 350, 90),
(4, 504, '2024-12-16', '16:00:00', '20:00:00', 2, 1, 3, 400, 150),
(5, 505, '2024-12-16', '08:00:00', '11:00:00', 5, 4, 3, 350, 110),
(6, 506, '2024-12-16', '14:00:00', '18:00:00', 1, 3, 8, 900, 170),
(7, 507, '2024-12-17', '09:00:00', '13:00:00', 3, 2, 5, 500, 105),
(8, 508, '2024-12-17', '10:00:00', '14:00:00', 2, 3, 5, 500, 115);
INSERT INTO Carries (Reservation_ID, Luggage_ID, TripNo) VALUES
(201, 1, 1),
(202, 2, 2),
(203, 3, 3),
(204, 4, 4),
(205, 5, 5),
(206, 6, 6),
(207, 7, 7),
(208, 8, 1),
(209, 9, 2),
(210, 10, 3);
SELECT COUNT(*) AS Confirmed_Reservations
FROM PassengerReservations PR
JOIN Reservation R ON PR.Reservation_ID = R.Reservation_ID
WHERE PR.National_ID = <Your_National_ID> AND R.RStatus = 'Confirmed';