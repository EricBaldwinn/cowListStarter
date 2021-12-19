-- YOUR CODE GOES HERE
-- CREATE YOUR DATABASE
-- CREATE YOUR TABLES
-- ADD RECORDS TO YOUR TABLE

drop database if exists Cows;

create database Cows;

use Cows

create TABLE cowList (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(25) NOT NULL,
  description VARCHAR(120) NOT NULL
)

