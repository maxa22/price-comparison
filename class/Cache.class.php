<?php

class Cache{

    /**
     * Method for getting page with output defined throught parameter
     * @param string $page_name Page to be loaded, through Page class
     * @param string $output Define what kind of output we want inside the page (which modules to include: header, footer, etc.)
     * @return bool It returns true if cache is created and false if cache is not created for some reason
     */
    public function create(string $page_name, string $output){
        $page = new Page();
        $content = $page->load($page_name)->output($output);

        if($this->check_lock($page_name) === "unlocked"){

            if($this->set_lock($page_name)){

                if(File::set("cache", $page_name, $content)){
                    
                    if($html_file = $this->create_cache($page_name)){

                        if(File::set("cache", $page_name, $html_file, "html")){
                            // Remove page lock and allow to get it
                            $this->remove_lock($page_name);
                            // Set additional data inside the cache log file
                            $this->set_in_log($page_name, "cached", "true")
                                ->set_in_log($page_name, "datetime", date("d-m-Y h:i:s"))
                                ->set_in_log($page_name, "output", $output);

                            return true;
                        }
                    }

                }
            }
        }else{
            $this->create($page_name, $output);
        }

        return false;
    }

    /**
     * 
     * Method for getting cached page from the server.
     * @param string $page_name Name of the page to retrieve from the server.
     * @return string|false It returns content of the cached page if it exists, false otherwise.
     * 
     */
    public function get(string $page_name){
        if($content = File::get("cache", $page_name, "html")){
            return $content;
        }

        return false;
    }

    /**
     * 
     * Method for real cache creating using output buffering of the create .php file of the page and returning it back to be saved in the HTML file
     * @param string $page_name Page to be loaded and executed from the cache folder so we can return its content back
     * @return string It returns contented of the executed page
     * 
     */
    public function create_cache($page_name){
        ob_start();
        require APP . "/cache/" . $page_name . ".cache.php";
        $content = ob_get_contents();
        ob_clean();
        return $content;
    }
    

    // Srediti fatal error koji se javlja kada se upadne u petlju kad je page zaključan
    public function regenerate(){
        $data = $this->get_in_log();

        $pages = array_keys($data);
        $page_data = $data;

        foreach($pages as $page){
            $this->create($page, $page_data[$page]['output']);
        }

        return $this;

    }

    /**
     * 
     * Method for checking lock status of the current page we provide.
     * @param string $page_name Page for which we need to check lock status.
     * 
     */
    public function check_lock($page_name){
        $log = File::get_custom("cache.log.json", "cache/", true);
        if(array_key_exists("lock", $log[$page_name])){
            if($log[$page_name]['lock'] === "true"){
                return "locked";
            }
        }

        return "unlocked";
    }

    /**
     * 
     * Method for setting lock for the provided page while creating the cache file (so we don't need to worry about concurrent access.)
     * @param string $page_name Page for which we need to set lock status.
     * 
     */
    public function set_lock($page_name){
        if($this->edit_in_log($page_name, "lock", "true")){
            return $this;
        }
        return false;
    }

    /**
     * 
     * Method for removing lock for the provided page when we finish creating the cache file (so we don't need to worry about concurrent access.)
     * @param string $page_name Page for which we need to remove lock status.
     * 
     */
    public function remove_lock($page_name){
        if($this->edit_in_log($page_name, "lock", "false")){
            return $this;
        }
        return false;
    }

    /**
     * 
     * Method for adding new data in the cache log file.
     * @param string $page_name Page for which we need to add data in the log.
     * @param string $parameter Key to be added in the log file for the new Page.
     * @param string $value Value to be added in the log file for the new Page using key in the $parameter.
     * @return object It returns dynamic object to allow method chaining. 
     * 
     */
    public function set_in_log($page_name, $parameter, $value){
        $log = File::get_custom("cache.log.json", "cache/", true);
        $log[$page_name][$parameter] = $value;
        if(File::set_custom("cache.log.json", "cache/", $log, true)){
            return $this;
        }

        return false;
    }

    /**
     * 
     * Method for editing data in the cache log file.
     * @param string $page_name Page for which we need to edit data in the log.
     * @param string $parameter Key to be edited in the log file for the Page.
     * @param string $value Value to be edited in the log file for the Page using key in the $parameter.
     * @return object It returns dynamic object to allow method chaining.
     * 
     */
    public function edit_in_log($page_name, $parameter, $value){
        // There is nothing special in editing here, so we just call set_in_log and use this as a alias.
        // If needed special logic can be added here so we don't have a need after that to call set_in_log.
        $this->set_in_log($page_name, $parameter, $value);
        return $this;
    }

    /**
     * 
     * Method for deleting data in the cache log file.
     * @param string $page_name Page for which we need to delete data in the log.
     * @param string $parameter Key to be delete in the log file for the Page.
     * @return object It returns dynamic object to allow method chaining.
     * 
     */
    public function remove_in_log($page_name, $parameter){
        $log = File::get_custom("cache.log.json", "cache/", true);

        if(array_key_exists($parameter, $log[$page_name])){
            unset($log[$page_name][$parameter]);
        }

        if(File::set_custom("cache.log.json", "cache/", $log, true)){
            return $this;
        }

        return false;
    }

    /**
     * 
     * Method for getting the data from the log file. If both parameters are ommited the whole array will be returned.
     * @param string $page_name Page for which we need to get data from the log. If empty all pages with parameters will be returned.
     * @param string $parameter Specific key to get from the log file. If empty, all parameters for the page will be returned
     * @return array It returns content on sucess, false otherwise.
     * 
     */
    public function get_in_log($page_name = "", $parameter = ""){
        $log = File::get_custom("cache.log.json", "cache/", true);

        if($page_name != ""){
            if(array_key_exists($page_name, $log)){
                if($parameter != ""){
                    if(array_key_exists($parameter, $log[$page_name])){
                        $log = $log[$page_name][$parameter];
                    }
                }else{
                    $log = $log[$page_name];
                }
            }
        }

        return $log;
    }
}

/* Class Testing */

require "../configuration.php";

$cache = new Cache();
#echo $cache->create("index", "full");
#echo $cache->get("index");
#$cache->regenerate();
#var_dump($cache->set_in_log("index", "lock", "true")->set_in_log("error", "lock", "true")->set_in_log("index", "cached", "today"));
#var_dump($cache->edit_in_log("index", "lock", "false")->remove_in_log("index", "cached")->remove_in_log("index", "test")->set_in_log("index", "cached", "now"));

#var_dump($cache->remove_in_log("index", "lock")->set_in_log("index", "lock", "true")->remove_in_log("index", "cached")->edit_in_log("error", "lock", "true"));
#var_dump($cache->get_in_log());
#echo $cache->check_lock("error");
var_dump($cache->regenerate());