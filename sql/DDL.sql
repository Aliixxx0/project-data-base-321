CREATE TABLE Train
(
  Train_ID INT NOT NULL,
  Arabic_Name VARCHAR(50) NOT NULL,
  English_Name VARCHAR(50) NOT NULL,
  PRIMARY KEY (Train_ID)
);

CREATE TABLE Station
(
  Station_ID INT NOT NULL,
  Station_Name VARCHAR(50) NOT NULL,
  City VARCHAR(50) NOT NULL,
  PRIMARY KEY (Station_ID)
);

CREATE TABLE Passenger
(
  National_ID INT NOT NULL,
  Phone VARCHAR(10) NOT NULL,
  Fname VARCHAR(40) NOT NULL,
  Lname VARCHAR(40) NOT NULL,
  DOB DATE NOT NULL,
  PRIMARY KEY (National_ID)
);

CREATE TABLE Trip
(
  TDate DATE NOT NULL,
  Duration INT NOT NULL,
  TripNo INT NOT NULL,
  Miles INT NOT NULL,
  Cost INT NOT NULL,
  Departing_Time TIME NOT NULL,
  Arrival_Time TIME NOT NULL,
  Train_ID INT NOT NULL,
  Departing_Station INT NOT NULL,
  Arrival_Station INT NOT NULL,
  PRIMARY KEY (TripNo),
  FOREIGN KEY (Train_ID) REFERENCES Train(Train_ID),
  FOREIGN KEY (Departing_Station) REFERENCES Station(Station_ID),
  FOREIGN KEY (Arrival_Station) REFERENCES Station(Station_ID)
);

CREATE TABLE ESystem
(
  System_Name VARCHAR(50) NOT NULL,
  SysID VARCHAR(2) NOT NULL,
  PRIMARY KEY (SysID)
);

CREATE TABLE Luggage
(
  Weight INT NOT NULL,
  Dimensions INT NOT NULL,
  Luggage_ID INT NOT NULL,
  Luggage_Fee INT NOT NULL,
  PRIMARY KEY (Luggage_ID)
);

CREATE TABLE Staff
(
  National_ID INT NOT NULL,
  Fname VARCHAR(40) NOT NULL,
  Lname VARCHAR(40) NOT NULL,
  DOB DATE NOT NULL,
  Phone VARCHAR(10) NOT NULL,
  PRIMARY KEY (National_ID)
);

CREATE TABLE AssignedStaff
(
  Train_ID INT NOT NULL,
  National_ID INT NOT NULL,
  Assiging_Date DATE NOT NULL,
  FOREIGN KEY (Train_ID) REFERENCES Train(Train_ID),
  FOREIGN KEY (National_ID) REFERENCES Staff(National_ID)
);

CREATE TABLE Notification
(
  Notification_ID INT NOT NULL,
  Type VARCHAR(1) NOT NULL,
  NDate DATE NOT NULL,
  SysID VARCHAR(2) NOT NULL,
  PRIMARY KEY (Notification_ID),
  FOREIGN KEY (SysID) REFERENCES ESystem(SysID)
);

CREATE TABLE Reservation
(
  Reservation_ID INT NOT NULL,
  Reserve_Date DATE NOT NULL,
  Cost INT NOT NULL,
  ID_Documents VARCHAR(30),
  RStatus VARCHAR(1) NOT NULL,
  TripNo INT NOT NULL,
  Managed_By INT NOT NULL,
  PRIMARY KEY (Reservation_ID),
  FOREIGN KEY (TripNo) REFERENCES Trip(TripNo),
  FOREIGN KEY (Managed_By) REFERENCES Staff(National_ID)
);

CREATE TABLE Dependent
(
  Name VARCHAR(50) NOT NULL,
  Relationship VARCHAR(50) NOT NULL,
  Guardian_ID INT NOT NULL,
  FOREIGN KEY (Guardian_ID) REFERENCES Passenger(National_ID)
);

CREATE TABLE Seat
(
  Number INT NOT NULL,
  Class VARCHAR(1) NOT NULL,
  Reservation_ID INT NOT NULL,
  TripNo INT NOT NULL,
  FOREIGN KEY (Reservation_ID) REFERENCES Reservation(Reservation_ID),
  FOREIGN KEY (TripNo) REFERENCES Trip(TripNo),
  UNIQUE (Number)
);

CREATE TABLE Canceled_Reservation
(
  Request_Date DATE NOT NULL,
  Reservation_ID INT NOT NULL,
  PRIMARY KEY (Reservation_ID),
  FOREIGN KEY (Reservation_ID) REFERENCES Reservation(Reservation_ID)
);

CREATE TABLE Under_processing_Reservation
(
  Expire_Date DATE NOT NULL,
  Reservation_ID INT NOT NULL,
  PRIMARY KEY (Reservation_ID),
  FOREIGN KEY (Reservation_ID) REFERENCES Reservation(Reservation_ID)
);

CREATE TABLE Bill
(
  BStatus VARCHAR(1) NOT NULL,
  Method INT NOT NULL,
  Number INT NOT NULL,
  Reservation_ID INT NOT NULL,
  PRIMARY KEY (Number),
  FOREIGN KEY (Reservation_ID) REFERENCES Reservation(Reservation_ID)
);

CREATE TABLE Carries
(
  Reservation_ID INT NOT NULL,
  Luggage_ID INT NOT NULL,
  TripNo INT NOT NULL,
  FOREIGN KEY (Reservation_ID) REFERENCES Reservation(Reservation_ID),
  FOREIGN KEY (Luggage_ID) REFERENCES Luggage(Luggage_ID),
  FOREIGN KEY (TripNo) REFERENCES Trip(TripNo)
);

CREATE TABLE Creates
(
  Reservation_ID INT NOT NULL,
  Notification_ID INT NOT NULL,
  FOREIGN KEY (Reservation_ID) REFERENCES Reservation(Reservation_ID),
  FOREIGN KEY (Notification_ID) REFERENCES Notification(Notification_ID)
);

CREATE TABLE PassengerReservations
(
  National_ID INT NOT NULL,
  Reservation_ID INT NOT NULL,
  FOREIGN KEY (National_ID) REFERENCES Passenger(National_ID),
  FOREIGN KEY (Reservation_ID) REFERENCES Reservation(Reservation_ID)
);