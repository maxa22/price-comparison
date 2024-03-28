<?php

/**
 * TEMPORARY DOCS
 * Don't create quieries here, call database for that
 * User these methods to do native user stuff here
 *
 */

class User
{
    private $database;
    private $session;
    private $router;

    public function __construct()
    {
        $this->database = new Database();
        $this->session = new Session();
        $this->router = new Router();
    }

    public function register($fullname, $email, $password, $password_confirm, $status, $role)
    {
        $arr = [
            "function" => "validate_email",
            "email" => $email
        ];
        $check_db_email = json_decode($this->router->ajax($arr), true);

        if (Validation::fullname($fullname) && Validation::password($password) && $check_db_email['valid'] == 1 && $password === $password_confirm) {
            $hash_password = Security::hash_password($password);
            $token = Security::hash($email);
            $current_datetime = date("Y-m-d h:i:s");
            $query =  $this->database->insert("user", ["fullname", "email", "validation_code", "password", "datetime", "status", "role"], [$fullname, $email, $token, $hash_password, $current_datetime, $status, $role], true);
            $link = URL . "/get?token=" . $token . "&id=" . $query . "&function=activate_user";

            $email = new Email($email, "welcome_email", $link);
            if ($email->send() && !empty($query)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function activate()
    {
    }

    public function login($email, $password, $remember_me = false)
    {

        $data_from_db;
        //Email and password from database
        /* Treba se dodati poslije jos "status" ali kad se zavrsi mailer radi aktivacije */
        $search_column = filter_var($email, FILTER_VALIDATE_EMAIL) ? 'email' : 'login';

        $data_from_db = $this->database->select("user", ["login", "password", "uid", "enabled", "email", "vorname", "new_password", "status"], $search_column, $email)->output();

        if (!$data_from_db) {
            return json_encode(array('status' => 'error', "msg" => "Oops, something went wrong. Please check your e-mail and password or click Forget password."));

        }

        if ($data_from_db[0]['enabled'] == 0) {
            return json_encode(array('status' => 'error', "msg" => "Account deactivated"));
        }

        $login_from_db = $data_from_db[0][$search_column];
        $password_from_db = $data_from_db[0]['password'];
        $new_password_from_db = $data_from_db[0]['new_password'];

        // if ($data_from_db[0]['email_confirm'] == '0') {
        //     $niz = [
        //         "valid" => 0,
        //         "msg" => Language::get("toastr", "activate_email")
        //     ];
        //     return json_encode($niz);
        // }
        if (($email != $login_from_db)
        || (!$new_password_from_db && $password != $password_from_db)
        || ($new_password_from_db && !Security::verify_password($password, $new_password_from_db))) {
            $niz = [
                "valid" => 0,
                "msg" => "Oops, something went wrong. Please check your e-mail and password or click Forget password."
            ];
            return json_encode($niz);
        }

        $this->session->add('login', true)
            ->add('status', '1')
            ->add('uid', $data_from_db[0]['uid'])
            ->add('name', $data_from_db[0]['vorname']);
        Cookie::set("id", $data_from_db[0]['uid'], "month", "/");
        if ($remember_me == true) {
            // we have to redefine the enabled field in users for this to work
            $string = $data_from_db[0]['status'].",".$data_from_db[0]['uid'];
            // $string = "1," . $data_from_db[0]['uid'];
            Cookie::set("remember", $string, "month", "/");
        }

        $niz = [
            "valid" => 1,
            "msg" => ""
        ];
        return json_encode($niz);
        
    }

    public function reset_password()
    {
    }

    public function get_all_users()
    {
        $data_from_db = $this->database->select("user", "*", "", "")->output();
        return $data_from_db;
    }

    public function get_data($user_id)
    {
        $data_from_db = $this->database->select("user", "*", "uid", $user_id)->output();
        return $data_from_db;
    }

    public function insert_data()
    {
    }

    public function change_data($data, $id = "")
    {
        if ($id == "") {
            $execute = $this->database->update("user", array_keys($data), array_values($data), "uid", $this->session->get("uid"));
        } else {
            $execute = $this->database->update("user", array_keys($data), array_values($data), "uid", $id);
        }

        if ($execute) {
            return true;
        } else {
            return false;
        }
    }

    public function delete_data()
    {
    }

    public function get_data_image()
    {
    }

    public function get_status()
    {
    }

    public function change_status()
    {
    }
}
