<?php

class Router
{

    /**
     * 
     * Method for loading pages inside the application with check for user type/status.
     * @param string $page_name The name of the page which should be loaded inside the application.
     * @return string It returns requested page's content if page is found, otherwise it returns content of the index page.
     * Be aware that all PHP code will be executed before returning the content of the page.
     * 
     */
    public function load(string $page_name)
    {

        //Declare page class
        $page = new Page();
        $session = new Session();

        # If page empty return index
        if ($page_name === '') {
            $page->load("index")->output("full");
            return;
        }

        //Array of all pages by status
        $list_array = File::get("file", "pages", "php", true);

        // We are check is user logged in, because from that depends which pages he can load inside the application (access control)
        if ($session->get('login') !== false) {

            // If user is logged in (we know that through 'login' key stored in session), then we need to check do user has status and which is it
            if ($session->get('status') !== false) {

                //Create a new array with approved pages by status
                $whitelist = $list_array[$session->get('status')];
                if (in_array($page_name, $whitelist)) {
                    $page_conent = $page->load($page_name)->output("full");
                    echo $page_conent;
                } else {
                    $page_conent = $page->load("index")->output("full");
                    echo $page_conent;
                }
            }
        } else {

            // Here we have a whitelist for all pages non-logged in user can access (basically all outer pages which don't require started session)
            //Create a new array with non important pages $key for the array 0
            $whitelist_for_external = $list_array[0];

            if (in_array($page_name, $whitelist_for_external, true) == true) {
                $page_conent = $page->load($page_name)->output("full");
                echo $page_conent;
            } else {
                $page_conent = $page->load("index")->output("full");
                echo $page_conent;
            }
        }
    }


    /**
     * 
     * Method for getting AJAX calls from the frontend (All AJAX calls must go through this method)
     * @param array $data Array of data which is sent from frontend. It must include function parameter so we know what function to call!
     * @return string It returns results of the function we called through AJAX and parameters send to it in the form of the array.
     * 
     */
    public function ajax(array $data)
    {

        // Get PHP function to be called for this particular AJAX request
        $function = $data['function'];

        // Delete function from the array because it is not needed there
        unset($data['function']);

        // Get white list with functions
        if ($functions = File::get("file", "functions", "php", true)) {
            $functions = $functions['functions'];

            // Check is function inside the whitelist and if it is then proceede to require and call
            if (in_array($function, $functions)) {

                // Require function from the file system
                require APP . "/function/" . $function . ".function.php";

                // Call function and send data to it then return value
                return $function($data);
            }
        }

        return false;
    }
}

/* Class Testing */
//require '../configuration.php';

/* $router = new Router();
$data = array("function" => "validate_name", "parametar1" => "prva", "parametar2" => "druga");
var_dump($router->ajax($data));  */