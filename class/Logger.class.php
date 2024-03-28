<?php

class Logger{

    /**
     * 
     * Static method for setting new event inside the main log for the current day
     * @param string $event Event which happend and needs to be logged
     * @param string $description Description of event
     * @return bool It returns true if event is logged, false otherwise.
     * 
     */
    public static function set($event, $description){
        $date = Date("d.m.Y");
        $time = Date("H:i:s");
        $uid = Session::get_value("uid");

        if(!$content = File::get("log", $date, "json", true)){
            $content = array();
        }

        $size = count($content) + 1;

        $content[$size]["time"] = $time;
        $content[$size]["event"] = $event;
        $content[$size]["description"] = $description;
        $content[$size]["uid"] = $uid;

        if(File::set("log", $date, $content, "json", true)){
            return true;
        }

        return false;

    }

    /**
     * 
     * Static method for getting one or all events for the current day
     * @param string $event If we provide this parameter, then we will get only that type of event for the current day.
     * If not, we are going to get all events for the current day.
     * We can search by any value inside events (for example: value of description, value of event, etc.)
     * @return array It return array of events for the current day.
     * 
     */
    public static function get($key = ""){
        $date = Date("d.m.Y");
        if($content = File::get("log", $date, "json", true)){
            if(!empty($key)){
               $content_return = array();
                foreach($content as $one_event){
                    if(in_array($key, $one_event)){
                        $content_return[] = $one_event;
                    }
                }

                return $content_return;

            }

           return $content;
        }
        
    }

    /**
     * 
     * Static method for getting one or all events for every day which is logged
     * @param string $event If we provide this parameter, then we will get only that type of event every day which is logged.
     * If not, we are going to get all events for all logged days.
     * We can search by any value inside events (for example: value of description, value of event, etc.)
     * @return array It return array of events for the every day which is logged.
     * 
     */
    public static function get_all($key = ""){
        $files = glob(APP . "/log/*.json");
        $complete_log = array();
        foreach($files as $file){
            $content = json_decode(file_get_contents($file), true);
            $complete_log = array_merge($complete_log, $content);
        }

        if(!empty($key)){
            $content_return = array();
            foreach($complete_log as $one_event){
                if(in_array($key, $one_event)){
                    $content_return[] = $one_event;
                }
            }

            return $content_return;

        }

        return $complete_log;
    }
}


/* CLASS TESTING */

#require "../configuration.php";
#var_dump(Logger::set("test", "opis"));
#var_dump(Logger::get("1"));
#var_dump(Logger::get_all("opis"));

/**
 * NOTES
 * @status FINISHED FOR NOW
 * @usage INSIDE LOGGER WE NEED TO USE CLEAR DESCRIPTIONS AND NAME OF EVENTS TO BE LOGGED.
 * THEY HAVE TO BE CLEAR AND SAME EVERYWHERE.
 * @add_later ADD METHOD FOR LOGGING DIFFERENT EVENTS BY USING SET METHOD (BASICALLY WE ARE GOING TO CREATE PROXY METHODS SO IT IS EASIER FOR USERS)
 */