<?php

/**
 * 
 * Function for updating user profile info
 * @param array $data with key value pairs that correspond with those in the user table
 * @return string It returns json encoded array 
 */
require "validate_email.function.php";
require "validate_phone.function.php";
require "check_pass_in_db.function.php";
function edit_profile($data)
{
    $clean_array = [];
    foreach ($data as $key => $value) {
        $clean_array[$key] = Security::clean($value);
        $clean_array[$key] = Security::escape($value);
    }
    
    $user = new User();
    //Check db for duplicate phone
    if (isset($clean_array['phone_number'])) {
        $phone_array = [
            "phone_number" => $clean_array['phone_number']
        ];
        $validate_phone = json_decode(validate_phone($phone_array), true);
        if ($validate_phone['valid'] == 0) {
            return json_encode($validate_phone);
        }
    }

    if (isset($clean_array['password'])) {
        $validate_pass = json_decode(check_pass_in_db($data), true);
        if ($validate_pass['valid'] == 0) {
            return json_encode($validate_pass);
        }else{
            unset($clean_array['password']);
            unset($clean_array['undefined']);
        }
    } /* else {
        $niz = [
            'valid' => 0,
            'msg' => Language::get("toastr", "invalid_pass")
        ];

        return json_encode($niz);
    } */
    if (!empty($data)) {
        //If is set email in $data array check it in db for duplicate
        if (isset($clean_array['email'])) {
            //Array for validation of email in db
            $email_array = [
                "check_db" => "",
                "email" => $clean_array["email"]
            ];
            if (json_decode(validate_email($email_array), true)["valid"] == 1) {
                $user_id = "";
                if(isset($clean_array['id'])){
                    $user_id = $clean_array['id'];
                    unset($clean_array['id']);
                }
                if ($execute = $user->change_data($data, $user_id)) {
                    $niz = [
                        'valid' => 1,
                        'msg' => Language::get("toastr", "success")
                    ];

                    return json_encode($niz);
                } else {
                    $niz = [
                        'valid' => 0,
                        'msg' => Language::get("toastr", "error")
                    ];

                    return json_encode($niz);
                }
            } else {
                $niz = [
                    'valid' => 0,
                    'msg' => Language::get("toastr", "invalid_email")
                ];

                return json_encode($niz);
            }
        } else {
            $user_id = "";
            if(isset($clean_array['id'])){
                $user_id = $clean_array['id'];
                unset($clean_array['id']);
            }
            if ($execute = $user->change_data($data, $user_id)) {
                $niz = [
                    'valid' => 1,
                    'msg' => Language::get("toastr", "success")
                ];

                return json_encode($niz);
            } else {
                $niz = [
                    'valid' => 0,
                    'msg' => Language::get("toastr", "error")
                ];

                return json_encode($niz);
            }
        }
    }
}
