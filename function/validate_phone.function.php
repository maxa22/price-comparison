<?php

function validate_phone($data){
    $database = new Database();
    $clean_array = [];
    foreach ($data as $key => $value) {
        $clean_array[$key] = Security::clean($value);
        $clean_array[$key] = Security::escape($value);
    }
    $data_from_db = $database->select("user", "phone_number", "phone_number", $clean_array['phone_number'])->output();

    if (Validation::phone($clean_array['phone_number']) && $data_from_db == null) {
        $niz = [
            'valid' => 1,
            'msg' => Language::get("toastr", "valid_phone")
        ];

        return json_encode($niz);
    } else {
        $niz = [
            'valid' => 0,
            'msg' => Language::get("toastr", "invalid_phone")
        ];

        return json_encode($niz);
    }
}