CREATE SCHEMA `main` ;
CREATE TABLE `main`.`person` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fname` VARCHAR(100) NULL,
  `lname` VARCHAR(100) NULL,
  `email` VARCHAR(100) NULL,
  `phone` VARCHAR(100) NULL,
  PRIMARY KEY (`id`));

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'welcome$$123';

CREATE TABLE `main`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  PRIMARY KEY (`id`));

INSERT INTO `main`.`product` (event_ind) VALUES ('Yearly Membership');
INSERT INTO `main`.`product` (event_ind) VALUES ('Monthly Membership');
INSERT INTO `main`.`product` (event_ind) VALUES ('Salsa');
INSERT INTO `main`.`product` (event_ind) VALUES ('Bachata');

CREATE TABLE event
(
    id int PRIMARY KEY AUTO_INCREMENT,
    type int NOT NULL,
    startdate datetime NOT NULL,
    enddate datetime
);
