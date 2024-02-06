DROP DATABASE IF EXISTS ovs_test_db;

-- Prepares the MySQL server for this project
CREATE DATABASE IF NOT EXISTS ovs_test_db;
CREATE USER IF NOT EXISTS 'ovs_test'@'localhost' IDENTIFIED BY 'ovs_test_pwd';
GRANT ALL PRIVILEGES ON `ovs_test_db`.* TO 'ovs_test'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'ovs_test'@'localhost';
FLUSH PRIVILEGES;
