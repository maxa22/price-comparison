<?php

/* Can't do anything without configuration in the application! */
require 'configuration.php';

$router = new Router();
$session = new Session();
if (Cookie::get("remember") !== false) {
    $arr = Cookie::get("remember");
    // Exploding user array to get user session and other data
    list($status, $uid) = explode(',', $arr);

    $session->add('login', true)
                ->add('status', $status)
                ->add('uid', $uid);
    Cookie::set("id", $uid, "month", "/");
}

if (isset($_GET['page'])) {
    $router->load($_GET['page']);
} else {
    $router->load('index');
}
