<?php

class Validation{

    /**
     * 
     * Static method for validating full name of the user (first name and the last name).
     * @param string $fullname We expect user's full name in the format of the "firstname lastname"
     * @param string $length Opitional parameter where we can increase or decrease the minimal length of the fullname.
     * @return bool It returns true if name is valid, false otherwise.
     * 
     */
    public static function fullname($fullname, $length = 5){
        if (preg_match('/^[A-žÀ-ÿš]+ [A-žÀ-ÿ]+$/', $fullname) > 0 && strlen($fullname) > $length){
            return true;
        }

        return false;
    }

    /**
     * 
     * Static method for validating password of the user
     * @param string $password We expect user's password with minimal of the 8 characters, one upper case letter, one lower case letter, number and special character.
     * @param string $length Optional parameter where we can increase the required length of the password
     * @return bool It returns true if valid, false otherwise.
     * 
     */
    public static function password($password, $length = 8){
        if(preg_match('/^\S*(?=\S{' . $length .',})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])(?=\S*[\W])\S*$/', $password)){
            return true;
        }

        return false;
    }

    /**
     * 
     * Method for validating user email using html_entities function inside the PHP.
     * @param string $email We expect user's email in standard format.
     * @return bool It returns true if valid, false otherwise.
     * 
     */
    public static function email($email){
        if (filter_var(htmlentities($email, ENT_QUOTES), FILTER_VALIDATE_EMAIL)){
            return true;
        }

        return false;
    }

    /**
     * 
     * Method for validating user phone. Checking if number is in number format.
     * @param string $phone We expect user's phone in standard format.
     * @return bool It returns true if valid, false otherwise.
     * 
     */
    public static function phone($phone){
        
        if (preg_match('/^[0-9]+$/', $phone) && strlen($phone) > 5) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Method for validating image. Checking if image is in jpg, png  format.
     * @param string $name We expect user's image in standard format.
     * @return bool It returns true if valid, false otherwise.
     */
    public static function image($name = 'upload'){

        $allowed_extensions = array('jpg', 'jpeg', 'png');
        $extension = pathinfo($_FILES[$name]["name"], PATHINFO_EXTENSION);
        $extension = strtolower($extension);
        if(!in_array($extension, $allowed_extensions) && !empty($extension)) {
            return false;
        } 

        $mimeType = mime_content_type($_FILES[$name]['tmp_name']);
        $mimeTypeAllowed = array('image/jpg', 'image/jpeg', 'image/png');
        if(!in_array($mimeType, $mimeTypeAllowed) && !empty($mimeType)) {
            return false;
        }
        return true;
    }

    /**
     * Method for validating usf file. Checking if file is in usf format
     * @param string $name We expect name of file input.
     * @return bool It returns true if valid, false otherwise.
     */
    public static function usf($name = 'upload'){

        $mimeType = mime_content_type($_FILES[$name]['tmp_name']);
        $mimeTypeAllowed = array('text/plain');
        if(!in_array($mimeType, $mimeTypeAllowed) && !empty($mimeType)) {
            return false;
        }
        return true;
    }

}

/* Class Testing

var_dump(Validation::password("mind134Aasd5!"));
var_dump(Validation::fullname("Ama ar"));
var_dump(Validation::email("amarbeslija@lab387.com"));

*/

