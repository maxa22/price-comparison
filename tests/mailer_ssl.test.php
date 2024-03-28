<?php

require '../configuration.php';

$email = new Email("web@amarbeslija.com", "welcome_email", "https://testiranje.com");
var_dump($email->send());