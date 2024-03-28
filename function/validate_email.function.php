<?php

function validate_email($data)
{
    $clean_array = [];
    foreach ($data as $key => $value) {
        $clean_array[$key] = Security::clean($value);
        $clean_array[$key] = Security::escape($value);
    }
    $database = new Database();
    $email = $database->select("user", "email", "email", $clean_array['email'])->output();
    if (isset($clean_array['check_db'])) {
        if (Validation::email($clean_array['email']) && $email == null) {
            $niz = [
                'valid' => 1,
                'msg' => Language::get("toastr", "valid_email")
            ];

            return json_encode($niz);
        } else {
            $niz = [
                'valid' => 0,
                'msg' => Language::get("toastr", "invalid_email")
            ];

            return json_encode($niz);
        }
    } else {
        if (Validation::email($clean_array['email'])) {
            $niz = [
                'valid' => 1,
                'msg' => Language::get("toastr", "valid_email")
            ];

            return json_encode($niz);
        } else {
            $niz = [
                'valid' => 0,
                'msg' => Language::get("toastr", "invalid_email")
            ];

            return json_encode($niz);
        }
    }
}
