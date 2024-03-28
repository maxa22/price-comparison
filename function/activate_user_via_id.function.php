<?php

function activate_user_via_id($data){
    $user = new User();
    
    if ($user->change_data(['status' => '1'], $data['id'])) {
        $niz = [
            "valid" => 1,
            "msg" => Language::get("toastr", "success")
        ];
        return json_encode($niz);
    }else{
        $niz = [
            "valid" => 0,
            "msg" => Language::get("toastr", "error")
        ];
        return json_encode($niz);
    }
}