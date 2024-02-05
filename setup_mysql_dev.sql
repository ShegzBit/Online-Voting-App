-- Prepares the MySQL server for this project
CREATE DATABASE IF NOT EXISTS ovs_dev_db;
CREATE USER IF NOT EXISTS 'ovs_dev'@'localhost' IDENTIFIED BY 'ovs_dev_pwd';
GRANT ALL PRIVILEGES ON `ovs_dev_db`.* TO 'ovs_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'ovs_dev'@'localhost';
FLUSH PRIVILEGES;
