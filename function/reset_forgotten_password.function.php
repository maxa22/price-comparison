<?php
require "validate_pass.function.php";

function reset_forgotten_password($data)
{
    $user = new User();
    $currtime = time();

    $data_from_db = $user->get_data($data['id']);
    $time_from_db = strtotime($data_from_db[0]['expires']);
    $timediff = $time_from_db - $currtime;
    $new_password = Security::hash_password($data['password']);

    $update_array = [
        "new_password" => $new_password
    ];

    $arr = [
        "password" => $data['password']
    ];
    $validate_new_password = json_decode(validate_pass($arr), true);

    if ($validate_new_password['valid'] !== 1) {
        $niz = [
                "valid" => 0,
                "msg" => "Your password must be 8-20 characters long and contain letters and numbers. It must not contain spaces, special characters and emojis."
            ];
        return json_encode($niz);

    }

    if ($data_from_db[0]['validation_code'] == $data['token'] &&  $timediff <= 86400) {
        return $user->change_data($update_array, $data['id']);
    } else {
        return "false";
    }
}
