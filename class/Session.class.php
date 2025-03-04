<?php

class Session
{

    /**
     *
     * Method for creating a new session or resuming existing session for the user with no parameters
     * @return none
     *
     */
    public function __construct()
    {
        if (!isset($_SESSION)) {
            session_start();
        }
    }

    /**
     *
     * Method for adding values to the session storage
     * @param string $sesion_name Key for the value stored in the session storage
     * @param string $session_value Value to store in the session storage
     * @return object It returns dynamic object to allow method chaining
     *
     */
    public function add($session_name, $session_value)
    {
        $_SESSION[$session_name] = $session_value;

        return $this;
    }


    /**
     *
     * Method for getting value from the session storage
     * @param string $session_name Key for the value stored in the session storage
     * @return string It returns value found in the session storage
     */
    public function get($session_name)
    {

        if ($result = @$_SESSION[$session_name]) {
            return $result;
        }

        return false;
    }

    /**
     *
     * Method for deleting value from the session storage
     * @param string $session_name Key for the value stored in the session storage
     * @return object It returns dynamic object to allow method chaining
     *
     */
    public function unset($session_name)
    {
        unset($_SESSION[$session_name]);
        return $this;
    }

    /**
     *
     * Method for destroying user session
     * @return It returns dynamic object to allow method chaining if needed to start a new session and/or add new values
     *
     */
    public function destroy()
    {
        // Initialize the session.
        // If you are using session_name("something"), don't forget it now!
        // session_start();

        // Unset all of the session variables.
        $_SESSION = array();

        // If it's desired to kill the session, also delete the session cookie.
        // Note: This will destroy the session, and not just the session data!
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(
                session_name(),
                '',
                time() - 42000,
                $params["path"],
                $params["domain"],
                $params["secure"],
                $params["httponly"]
            );
        }

        // Finally, destroy the session.
        session_destroy();

        return $this;
    }

    /**
     *
     * Static method for getting value from the session storage when don't need to create new session.
     * @param string $session_name Key for the value stored in the session storage
     * @return string It returns value found in the session storage
     */
    public static function get_value($session_name)
    {

        if ($result = @$_SESSION[$session_name]) {
            return $result;
        }

        return false;
    }
}

/**
 *
 * NOTES
 * @status FINISHED
 * @note ALL METHODS EXCEPT get_value() NEEDS INSTANCE. get_value() IS STATIC METHOD AND IT IS USED WHEN NEED TO GET VALUE FROM THE SESSION AND DON'T WANT TO CREATE A NEW SESSION.
 *
 */
