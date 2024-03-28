<?php

/* Testing class */

require '../configuration.php';

$database = new Project;

$database->query("UPDATE project SET status = '1';");
// $database->query("ALTER TABLE project ADD COLUMN publish_id INT DEFAULT 0");
// $database->query("UPDATE project SET estimated_id = 0;");
// $database->query("UPDATE project SET discussed_id = 0;");
// $database->query("ALTER TABLE project ADD COLUMN estimated_id INT");
// $database->query("ALTER TABLE project ADD COLUMN discussed_id INT");

// $database->query("ALTER TABLE fabric
//     ADD COLUMN lagecode_name VARCHAR(3) DEFAULT 'S';");
// $database->query("ALTER TABLE fabric
// -- ADD COLUMN lagecode_id INT DEFAULT 1,
// -- ADD FOREIGN KEY (lagecode_id) REFERENCES lagecode(id),
// ADD COLUMN arbeitsschritt VARCHAR(10) DEFAULT '0';");

// $dmfr = new Database;
// $dmfr->query("CREATE TABLE `frill` (
// 	`id` INT(11) NOT NULL AUTO_INCREMENT,
// 	`frill_number` VARCHAR(10) NOT NULL DEFAULT '0' COLLATE 'utf16_unicode_ci',
// 	`enabled` SET('0','1') NOT NULL DEFAULT '1' COLLATE 'utf16_unicode_ci',
// 	`dessinnr` VARCHAR(10) NOT NULL DEFAULT '0' COLLATE 'utf16_unicode_ci',
// 	`date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
// 	PRIMARY KEY (`id`)
// )
// COLLATE='utf16_unicode_ci'
// ENGINE=InnoDB");

// $database->query("ALTER TABLE project MODIFY COLUMN status SET('0', '1', '2', '9');");
// $database->query('ALTER TABLE yarn RENAME COLUMN yid TO name;');
// $database->query('ALTER TABLE yarn ADD yid VARCHAR(20) DEFAULT "1410";');
// $database->query('ALTER TABLE project
//                   ADD series_id INT DEFAULT 0,
//                   ADD collection_id INT DEFAULT 0,
//                   ADD article_id INT DEFAULT 0,
//                   ADD theme_id INT DEFAULT 0,
//                   ADD designer_id INT DEFAULT 0,
//                   ADD drawer_id INT DEFAULT 0,
//                   ADD puncher_id INT DEFAULT 0;');


// $database->connection->query('ALTER TABLE user
// ADD status ENUM("1", "2") DEFAULT "1",
// ADD new_password VARCHAR(155) DEFAULT NULL,
// ADD validation_code VARCHAR(155) DEFAULT NULL,
// ADD expires VARCHAR(155) DEFAULT NULL; ');

// $users = $database->select('user', ['login', 'uid'])->output();

// for ($i = 0; $i < count($users); $i++) {
//     $database->update('user', ['validation_code'], [Security::hash($users[$i]['login'])], 'uid', $users[$i]['uid']);
// }
