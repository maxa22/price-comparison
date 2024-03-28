<?php


if (isset($_GET)) {
    $router = new Router();
    $data = $_GET;
    if (isset($_GET['function'])) {
        $execute = $router->ajax($data);
        if ($execute['valid'] == 1) {
            header('Location:' . $execute['url']);
        } else {
            header('Location: ./error');
        }
    }
}
