<?php
    $database = new Database();
    echo $database->query("CREATE TABLE file 
    (id INT(11) AUTO_INCREMENT PRIMARY KEY,
    link VARCHAR(255),
    user_id INT(11),
    status SET('0','1','2','3','4','5','6','7','8','9'),
    datetime TIMESTAMP NOT NULL DEFAULT CURRENT_DATE())");
?>