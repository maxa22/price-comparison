<?php

function login($data)
{
    $user = new User();
    $clean_array = [];
    foreach ($data as $key => $value) {
        $clean_array[$key] = Security::clean($value);
        $clean_array[$key] = Security::escape($value);
    }

    return $user->login($clean_array['email'], $clean_array['password'], $clean_array['remember']);
}
