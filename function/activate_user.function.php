<?php
/**
 * 
 * Function for updating user status
 * @param array $data with user id
 * @return string It returns json encoded array 
 */
function activate_user($data){
    $user = new User();
    $data_from_db = $user->get_data($data['id']);

    if ($data_from_db[0]['validation_code'] == $data['token']) {
        $status = [
            "email_confirm" => "1"
        ];
        //Send welcome email
        $email = new Email($data_from_db[0]['email'], "welcome_email", "");
        $email->send();
        
        
        if ($user->change_data($status, $data['id']) == true) {
            $niz = [
                "valid" => 1,
                "url" => "./index?msg=You successfuly activated your account. Please login :D"
            ];
            return $niz;
        }
    }
}