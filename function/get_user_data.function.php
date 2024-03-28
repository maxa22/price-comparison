<?php

function get_user_data($id){
    $user = new User();
    $session = new Session();
    $user_id = $session->get('uid');
    $status = $session->get('status');
    if($status != '2' && $user_id != $id['id']){
        return json_encode(array());
    }
    return json_encode($user->get_data($id['id']));
}