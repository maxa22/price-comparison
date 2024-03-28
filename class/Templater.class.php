<?php

class Templater{
    public $template;

    /**
     * 
     * Method which we use to get template from the file system
     * @param string $template_name The name of the template to get from the file system
     * @return object It returns this object to allow method chaining
     * 
     */
    public function get($template_name){
		if($this->template = File::get("template", $template_name)){
            return $this;
        }

        return false;
    }



    /**
     * 
     * Method for decoding variables from the template and replacing them with the data
     * @param array $search Array which contains name of variables inside the template (in regular format, without "{{" "}}")
     * @param array $replace Array which contains values which will replace variable inside the tempalte
     * @return object It returns this object to allow method chaining, while template is saved in object's field "template"
     * 
     */
	public function decode($search, $replace){
        if((is_array($search) && !empty($search)) && (is_array($replace) && !empty($replace))){

            # Add {{ and }} to search values array
            foreach($search as &$value){
                $value = "{{" . $value . "}}";
            }
            
            # Replace search array with replace array
            $this->template = str_replace($search, $replace, $this->template);
            
            # Return this object
            return $this;
        }

		return false;
	}



    /**
     * 
     * Method for returning the whole decoded template to the output
     * @return string It returns decoded template
     * 
     */
    public function output(){
        return $this->template;
    }
	
    

    /**
     * 
     * Method for setting template created somewhere else inside the file on the file system
     * @param string $template_name Name of the template to be saved (this will construct the name of the file: $template_name.template.php)
     * @param string $content Whole email template with variables for the data
     * @return object It return this object to allow method chaining on success, otherwise it returns false.
     * 
     */
	public function set($template_name, $content){
		if(!empty($template_name) && !empty($content)){
            if(File::set("template", $template_name, $content)){
                return $this;
            }
        }

        return false;
	}
}


/* Class Testing 

require "../configuration.php";

$templater = new Templater();
echo $templater->get("welcome_email")->decode(["test", "test2"],["Pozdrav", "Ovo je poruka!"])->output();

*/

/**
 * NOTES
 * @status FINISHED
 * @add_later ADD LOGGING LATER
 */