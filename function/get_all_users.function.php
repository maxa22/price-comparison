<?php

function get_all_users($data){
    $user = new User();
    $users_data = $user->get_all_users();
    
    return json_encode($users_data);
}