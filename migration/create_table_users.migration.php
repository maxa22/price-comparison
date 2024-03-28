<?php
    $database = new Database();
    echo $database->query("CREATE TABLE user 
    (id INT(11) AUTO_INCREMENT PRIMARY KEY, 
    fullname VARCHAR(100) NOT NULL, 
    username VARCHAR(255),
    email VARCHAR(150) NOT NULL, 
    phone_number VARCHAR(20), 
    validation_code VARCHAR(155), 
    password VARCHAR(255), 
    status SET('0','1','2','3','4','5','6','7','8','9'),
    role SET('0','1','2','3','4','5','6','7','8','9'),
    email_confirm SET('0','1'),
    country VARCHAR(155), 
    city VARCHAR(155), 
    address VARCHAR(155), 
    zip_code INT(11),
    image_id INT(11),
    file_id INT(11),
    expires TIMESTAMP NOT NULL DEFAULT CURRENT_DATE(),
    datetime TIMESTAMP NOT NULL DEFAULT CURRENT_DATE())");
