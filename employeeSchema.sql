DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Rodriguez", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Tupik", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Malia", "Brown", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Lourd", 6, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Tom", "Allen", 7, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Tammer", "Galal", 8, null);




INSERT INTO department (name)
Values ('Sales'), ('Engineering'), ('Finance'), ('Legal');


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1); 
INSERT INTO role (title, salary, department_id)
VALUES("Salesperson", 80000, 1); 
INSERT INTO role (title, salary, department_id)
VALUES("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2); 
INSERT INTO role (title, salary, department_id)
VALUES("Accountant", 125000, 3); 
INSERT INTO role (title, salary, department_id)
VALUES("Legal Team Lead", 250000, 4); 
INSERT INTO role (title, salary, department_id)
VALUES("Lawyer", 190000, 4);
INSERT INTO role (title, salary, department_id)
VALUES("Software Engineer", 120000, 2)