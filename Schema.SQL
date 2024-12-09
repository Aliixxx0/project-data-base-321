CREATE TABLE TrainSystem
(
  SysID INT NOT NULL,
  System_Name VARCHAR(20) NOT NULL,
  PRIMARY KEY (SysID)
);

CREATE TABLE Notification
(
  Notification_ID INT NOT NULL,
  Type VARCHAR(15) NOT NULL,
  Date DATE NOT NULL,
  SysID INT NOT NULL,
  PRIMARY KEY (Notification_ID),
  FOREIGN KEY (SysID) REFERENCES TrainSystem(SysID)
);
CREATE TABLE Train
(
  Train_ID INT NOT NULL,
  Arabic_name VARCHAR(30) NOT NULL,
  English_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (Train_ID)
);

CREATE TABLE Seat
(
  Number INT NOT NULL,
  Class VARCHAR(15) NOT NULL,
  Train_ID INT NOT NULL,
  FOREIGN KEY (Train_ID) REFERENCES Train(Train_ID),
  UNIQUE (Number)
);

CREATE TABLE Luggage
(
  Weight INT NOT NULL,
  Dimensions INT NOT NULL,
  Luggage_ID INT NOT NULL,
  Luggage_Fee INT NOT NULL,
  PRIMARY KEY (Luggage_ID)
);

CREATE TABLE Station
(
  Station_ID INT NOT NULL,
  Station_Name VARCHAR(30) NOT NULL,
  City VARCHAR(30) NOT NULL,
  PRIMARY KEY (Station_ID)
);

CREATE TABLE Trip
(
  TripNo INT NOT NULL,
  Date DATE NOT NULL,
  Duration INT NOT NULL,
  Miles INT NOT NULL,
  Cost INT NOT NULL,
  Train_ID INT NOT NULL,
  Depart_From INT NOT NULL,
  Arrive_At INT NOT NULL,
  PRIMARY KEY (TripNo),
  FOREIGN KEY (Train_ID) REFERENCES Train(Train_ID),
  FOREIGN KEY (Depart_From) REFERENCES Station(Station_ID),
  FOREIGN KEY (Arrive_At) REFERENCES Station(Station_ID)
);

CREATE TABLE Passenger
(
  National_ID INT NOT NULL,
  Phone INT NOT NULL,
  Fname INT NOT NULL,
  Lname INT NOT NULL,
  DOB DATE NOT NULL,
  PRIMARY KEY (National_ID)
);

CREATE TABLE Staff
(
  National_ID INT NOT NULL,
  Phone INT NOT NULL,
  Fname INT NOT NULL,
  Lname INT NOT NULL,
  DOB DATE NOT NULL,
  Role VARCHAR(15) NOT NULL,
  PRIMARY KEY (National_ID)
);

CREATE TABLE Dependent
(
  Name INT NOT NULL,
  Relationship INT NOT NULL,
  Guardian_ID INT NOT NULL,
  FOREIGN KEY (Guardian_ID) REFERENCES Passenger(National_ID)
);

CREATE TABLE Confirmed_Reservation
(
  Reservation_ID INT NOT NULL,
  Reserve_date DATE NOT NULL,
  TripNo INT NOT NULL,
  Cost INT NOT NULL,
  ID_Documents BLOB NOT NULL,
  PRIMARY KEY (Reservation_ID),
  FOREIGN KEY (TripNo) REFERENCES Trip(TripNo)
);

CREATE TABLE Canceled_Reservation
(
  Reservation_ID INT NOT NULL,
  Reserve_date DATE NOT NULL,
  TripNo INT NOT NULL,
  Cost INT NOT NULL,
  ID_Documents BLOB NOT NULL,
  Canceled_By VARCHAR(15) NOT NULL, 
  PRIMARY KEY (Reservation_ID),
  FOREIGN KEY (TripNo) REFERENCES Trip(TripNo)
);

CREATE TABLE Under_processing_Reservation
(
    Reserve_date DATE NOT NULL,
  TripNo INT NOT NULL,
  Cost INT NOT NULL,
  ID_Documents BLOB NOT NULL,
  Reservation_ID INT NOT NULL,
  Expire_Date DATE NOT NULL,
  PRIMARY KEY (Reservation_ID)
);
