CREATE TABLE user (
  email varchar(255) PRIMARY KEY,
  firstName varchar(255),
  lastName varchar(255),
  birthDate date,
  createdAt timestamp,
  updatedAt timestamp,
  type varchar(40),
  is_admin BOOLEAN,
  is_active BOOLEAN,
  contact varchar(255),
  gender varchar(10),
  password varchar(255),
  martialStatus varchar(255)
);

CREATE TABLE Address (
  address varchar(255),
  userEmail varchar(255) NULL,
  state varchar(255),
  city varchar(255),
  pincode int,
  createdAt timestamp,
  updatedAt timestamp
);

CREATE TABLE HospitalAddress (
  address varchar(255),
  hospital varchar(255),
  state varchar(255),
  city varchar(255),
  pincode int
);


CREATE TABLE BMI (
  height int,
  Weight int,
  user varchar(255) PRIMARY KEY
);

CREATE TABLE healthIssues (
  name varchar(255) PRIMARY KEY,
  createdAt timestamp,
  updatedAt timestamp
);

CREATE TABLE covidSymptoms (
  name varchar(255) PRIMARY KEY,
  createdAt timestamp,
  updatedAt timestamp
);


CREATE TABLE Hospital (
  adminEmail varchar(255),
  name varchar(255) PRIMARY KEY,
  status BOOLEAN,
  contact varchar(255),
  createdAt timestamp,
  updatedAt timestamp
);

CREATE TABLE Slot (
   id int not null auto_increment PRIMARY KEY,
  userEmail varchar(255),
  hospital varchar(255),
  createdAt varchar(255),
  updatedAt varchar(255),
  status varchar(255),
  is_conformed BOOLEAN,
  bed varchar(255),
  doctor varchar(255)
);

CREATE TABLE EmergencyDetails (
  firstName varchar(255),
  lastName varchar(255),
  relationship varchar(255),
  contact varchar(255),
  slot int ,
  createdAt timestamp,
  updatedAt timestamp,
  CONSTRAINT `EmergencyDetails_ibfk_1` FOREIGN KEY (`slot`) REFERENCES `Slot` (`id`)
);

CREATE TABLE `Health` (
  `height` int DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `medicationStatus` varchar(100) DEFAULT NULL,
  `medicationList` longtext,
  `medicationAllergies` varchar(100) DEFAULT NULL,
  `operationsList` longtext,
  `healthIssuesChecked` longtext,
  slot int,
  CONSTRAINT `Health_ibfk_1` FOREIGN KEY (`slot`) REFERENCES `Slot` (`id`)
);

CREATE TABLE Covid19Questionnaires (
  slot int,
  `covidSymptomsChecked` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  CONSTRAINT `Covid19Questionnaires_ibfk_1` FOREIGN KEY (`slot`) REFERENCES `Slot` (`id`)
);


CREATE TABLE Bed (
  id int not null auto_increment PRIMARY KEY,
  name varchar(255) ,
  type varchar(255),
  available BOOLEAN,
  hospital varchar(255)
);

CREATE TABLE bedType (
  name varchar(255) PRIMARY KEY
);

CREATE TABLE Ambulance (
  number varchar(255) PRIMARY KEY,
  createdAt datetime,
  updatedAta datetime,
  hospital varchar(255),
  name varchar(255)
);

CREATE TABLE Doctor (
  name varchar(255),
  id int,
  userEmail varchar(255),
  hospital varchar(255)
);

CREATE TABLE Test (
  name varchar(255) PRIMARY KEY,
  result BOOLEAN,
  value BOOLEAN,
  userEmail varchar(255)
);

CREATE TABLE prescription (
  id int PRIMARY KEY,
  Medication varchar(255),
  createdAt varchar(255),
  updatedAt varchar(255),
  doctor varchar(255),
  patient varchar(255)
);

CREATE TABLE Medication (
  name varchar(255) PRIMARY KEY,
  info varchar(255),
  hosptial varchar(255)
);

CREATE TABLE Permission (
  user varchar(255),
  name varchar(255) PRIMARY KEY
);

CREATE TABLE Bill (
  user varchar(255),
  docCharge varchar(255),
  roomCharge varchar(255),
  managemtCharge varchar(255),
  payemnt varchar(255)
);

CREATE TABLE payemnt (
  id varchar(255),
  card varchar(255),
  details varchar(255)
);

ALTER TABLE Address ADD FOREIGN KEY (userEmail) REFERENCES user (Email);

ALTER TABLE Slot ADD FOREIGN KEY (userEmail) REFERENCES user (Email);

ALTER TABLE Slot ADD FOREIGN KEY (hospital) REFERENCES Hospital (name);

ALTER TABLE Bed ADD FOREIGN KEY (hospital) REFERENCES Hospital (name);

ALTER TABLE Doctor ADD FOREIGN KEY (hospital) REFERENCES Hospital (name);

ALTER TABLE Doctor ADD FOREIGN KEY (userEmail) REFERENCES user (Email);

ALTER TABLE Slot ADD FOREIGN KEY (doctor) REFERENCES user (Email);

ALTER TABLE Test ADD FOREIGN KEY (name) REFERENCES user (Email);

ALTER TABLE Bill ADD FOREIGN KEY (user) REFERENCES user (Email);

ALTER TABLE BMI ADD FOREIGN KEY (user) REFERENCES user (Email);
