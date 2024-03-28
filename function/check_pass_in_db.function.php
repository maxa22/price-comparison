<?php

/**
 *
 * function for checking is given password from a user in a database
 * @param array $data with a password to check if its in the database
 * @return string It returns json encoded array
 */
function check_pass_in_db($data)
{
    $database = new Database();
    $session = new Session();
 
    $data_from_db = $database->select("user", ["password", "email", "new_password"], "uid", $session->get("uid"))->output();

    if ((!$data_from_db[0]['new_password'] && $data['password'] != $data_from_db[0]['password'])
    || $data_from_db[0]['new_password'] && !Security::verify_password($data['password'], $data_from_db[0]['new_password'])) {
        
        $niz = [
                    'valid' => 0,
                    'msg' => Language::get("toastr", "invalid_pass")
                ];

        return json_encode($niz);
    }
    
    $niz = [
            'valid' => 1,
            'msg' => Language::get("toastr", "valid_pass")
        ];

    return json_encode($niz);

}
