<?php

function logout()
{
    $session = new Session();
    if ($session->destroy()) {
        Cookie::delete("remember");
        return true;
    }
}
