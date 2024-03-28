<?php

function register($data){
    $user = new User();
    $clean_array = [];
    foreach ($data as $key => $value) {
        $clean_array[$key] = Security::clean($value);
        $clean_array[$key] = Security::escape($value);
    }
    return $user->register($clean_array['fullname'], $clean_array['email'], $clean_array['password'], $clean_array['password_repeat'], $clean_array['status'], $clean_array["role"]);

}