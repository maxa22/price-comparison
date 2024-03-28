<?php


class Imager extends SimpleImage{
	protected $_file;
	protected $_extension;
	public static $return;
	
	/*
	 *** Constructor in which we can get the image without the from() method ***
	 */
	public function __construct($image = null){
		parent::__construct($image);
	}
	

	public function from($image, $path = NULL, $from = "file"){
		try{
			# Set path file just for $image->fromFile() method: if $path is NULL then just use $image -> it will contain path and image name, else combine home_path, user path and image name
			$this->_file = ($path != NULL) ? APP . $path . $image : $image;
			switch($from){
				case "string":
					# Get the image from the string using File.class.php (if $path is NULL, then it will try to get the image from 'file_path')
					$this->fromString(File::get_custom($image, 'uploads/images/'));
					break;
				case "uri":
					# Get the image from the URL (Just input the image URL)
					$this->fromDataUri($image);
					break;
				case "file":
				default:
					# Get the image from the file (using _file)
					$this->fromFile($this->_file);
					break;
			}
			
			# Return object with loaded image if success
			return $this;
		}catch(Exception $e){
			return false;	
		}
		
	}
	

	public function edit($method, $values){
		$values = explode(",", $values);
		if(count($values) == 2){
			if($values[1] == "*" || $values[1] == " *"){
				$values[1] = "";
			}
		}

		try{
			switch($method){
				case "resize":
					$this->resize($values[0], $values[1]);
					break;
				case "orient":
					$this->autoOrient();
					break;
				case "fit":
					$this->bestFit($values[0], $values[1]);
					break;
				case "crop":
					$this->crop($values[0], $values[1], $values[2], $values[3]);
					break;
				case "flip":
					$this->flip($values[0]);
					break;
				case "colors":
					$this->maxColors($values[0], $values[1]);
					break;
				case "rotate":
					$this->rotate($values[0], $values[1]);
					break;
				case "thumbnail":
					$this->thumbnail($values[0], $values[1], $values[2]);
					break;
				default:
					break;
			}		
			
			return $this;
		}catch(Exception $e){
			return false;		
		}
	}
	

	public function filter($filter, $values){
		try{
			switch($filter){
				case "blur":
					$this->blur($values[0], $values[1]);
					break;
				case "brighten":
					$this->brighten($values[0]);
					break;
				case "colorize":
					$this->colorize($values[0]);
					break;
				case "contrast":
					$this->contrast($values[0]);
					break;
				case "darken":
					$this->darken($values[0]);
					break;
				case "desaturate":
					$this->desaturate();
					break;
				case "opacity":
					$this->opacity($values[0]);
					break;
				default:
					break;
			}
			
			return $this;
		}catch(Exception $e){
			return false;	
		}
	}

	public function export($type = "file", $file = NULL, $path = NULL, $mimeType = NULL, $quality = NULL){
		try{
			$this->_extension = $this->getMimeType();
			$this->_extension = explode("/", $this->_extension);
			$this->_extension = $this->_extension[1];
			
			switch($type){
				case "uri":
					$this->toDataUri($mimeType, $quality);
					break;
				case "download":
					$this->toDownload($file . "." . $this->_extension, $mimeType, $quality);
					break;
				case "screen":
					$this->toScreen($mimeType, $quality);
					break;
				case "string":
					$this->toString($mimeType, $quality);
					break;
				case "file":
				default:
					# Set path file just for $image->fromFile() method: if $path is NULL then just use $image -> it will contain path and image name, else combine home_path, user path and image name
					$this->_file = ($path != NULL) ? $path . $file : $file;
					$this->toFile($this->_file . "." .$this->_extension, $mimeType, $quality);
					break;
			}	
			
			return $this;
		}catch(Exception $e){
			return false;	
		}	
	}
}










