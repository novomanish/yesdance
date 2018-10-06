CREATE SCHEMA `main` ;
CREATE TABLE `main`.`customer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fname` VARCHAR(100) NULL,
  `sname` VARCHAR(100) NULL,
  `email` VARCHAR(100) NULL,
  `phone` VARCHAR(100) NULL,
  PRIMARY KEY (`id`));

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'welcome$$123';