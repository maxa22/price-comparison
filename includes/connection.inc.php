<?php

try {
    $connection = new mysqli(DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT);
    $connection->set_charset('utf8mb4');  // utf8mb4 is recommended over utf8 for full Unicode support
    if ($connection->connect_error) {
        $error = new Error("34");
    }
}catch (mysqli_sql_exception $e) {
    die("Connection failed: " . $e);
} 