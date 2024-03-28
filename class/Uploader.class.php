<?php

class Uploader
{
	public static function image_upload($files, $dimensions = NULL, $limit = NULL, $upload_folder = "images")
	{

		$files = array_filter($files);
		/* $total = count($files['upload']['name']); */
		$total = count($files);
		$limit = (isset($limit) && !empty($limit) && !is_null($limit)) ? $limit : 10000000;
		$return_array = array();

		for ($i = 0; $i < $total; $i++) {
			if ($i < $limit) {
				//$tmpPath = $files['upload']['tmp_name'][$i];
				$tmpPath = $files['upload']['tmp_name'];
				if ($tmpPath != "") {
					//$newPath = APP . '/uploads/' . $upload_folder . "/" . $files['upload']['name'][$i];
					$newPath = '../uploads/' . $upload_folder . "/" . $files['upload']['name'];
					if (move_uploaded_file($tmpPath, $newPath)) {
						$return_array[] = $newPath;


						if (is_array($dimensions) && $dimensions != NULL) {
							try {
								for ($j = 0; $j < count($dimensions); $j++) {
									$image = new Imager($newPath);
									$addition = explode(",", $dimensions[$j]);
									if (count($addition) == 2) {
										if ($addition[1] == "*" || $addition[1] == " *" || $addition[1] == " * " || $addition[1] == "* ") {
											$addition[1] = "";
										}
									}
									$edit_path = '../uploads/' . $upload_folder . "/" . $addition[0] . "x" . $addition[1] . "-" . $files['upload']['name'][$i];
									$image->edit("resize", $dimensions[$j])->toFile($edit_path);
								}
							} catch (Exception $e) {
								return false;
							}
						}
					} else {
						return false;
					}
				}
			}
		}
		if (is_array($return_array) && !empty($return_array)) {
			return $return_array;
		}

		return false;
	}

	/**
	 * Static method for uploading files inside the upload folder
	 */
	public static function file_upload($files, $upload_folder = "files", $limit = NULL)
	{
		$files = array_filter($files);
		// $total = count($files['upload']['name']);
		$total = count($files);
		$limit = (isset($limit) && !empty($limit) && !is_null($limit)) ? $limit : 10000000;
		$return_array = array();

		for ($i = 0; $i < $total; $i++) {
			if ($i < $limit) {
				$tmpPath = $files['upload']['tmp_name'];
				if ($tmpPath != "") {
					$newPath = '../uploads/' . $upload_folder . "/"  . $files['upload']['name'];
					$return_array[] = $newPath;

					if (!move_uploaded_file($tmpPath, $newPath)) {
						return false;
					}
				}
			}
		}

		if (is_array($return_array) && !empty($return_array)) {
			return $return_array;
		}

		return false;
	}

	public static function image_upload_redesign($files, $dimensions = NULL, $upload_folder = "images")
	{

		$files = array_filter($files);
		/* $total = count($files['upload']['name']); */
		$return_array = array();

		$tmpPath = $files['upload']['tmp_name'];
		if ($tmpPath != "") {
			//$newPath = APP . '/uploads/' . $upload_folder . "/" . $files['upload']['name'][$i];
			$newPath = '../uploads/' . $upload_folder . "/" . $files['upload']['name'];
			if (move_uploaded_file($tmpPath, $newPath)) {
				$return_array[] = $newPath;


				if (is_array($dimensions) && $dimensions != NULL) {
					try {
						for ($j = 0; $j < count($dimensions); $j++) {
							$image = new Imager($newPath);
							$addition = explode(",", $dimensions[$j]);
							if (count($addition) == 2) {
								if ($addition[1] == "*" || $addition[1] == " *" || $addition[1] == " * " || $addition[1] == "* ") {
									$addition[1] = "";
								}
							}
							$edit_path = '../uploads/' . $upload_folder . "/" . $addition[0] . "x" . $addition[1] . "-" . $files['upload']['name'][$i];
							$image->edit("resize", $dimensions[$j])->toFile($edit_path);
						}
					} catch (Exception $e) {
						return false;
					}
				}
			} else {
				return false;
			}
		}
		if (is_array($return_array) && !empty($return_array)) {
			return $return_array;
		}

		return false;
	}

	/**
	 * Static method for uploading files inside the upload folder
	 */
	public static function file_upload_redesign($files, $files_name = 'upload',  $upload_folder = "files", $name_of_file = "") {
		
		$files = array_filter($files);
		// $total = count($files['upload']['name']);
		$total = count($files);
		$return_array = array();

		$tmpPath = $files[$files_name]['tmp_name'];
		if ($tmpPath != "") {
			if($name_of_file != ""){
				$newPath = '../uploads/' . $upload_folder . "/" . $name_of_file;
			}else{
				$newPath = '../uploads/' . $upload_folder . "/"  . $files[$files_name]['name'];
			}
			$return_array[] = $newPath;

			if (!move_uploaded_file($tmpPath, $newPath)) {
				return false;
			}
		}

		if (is_array($return_array) && !empty($return_array)) {
			return $return_array;
		}

		return false;

	}

}

/* CLASS TESTING 
require "../configuration.php";

if(isset($_FILES['upload'])){
#var_dump(Uploader::image_upload($_FILES, ["200, *", "300, *"]));
var_dump(Uploader::file_upload($_FILES));
}

?>

<form action="" method="POST" enctype="multipart/form-data">
	<input type="file" name="upload[]" multiple="multiple">
	<input type="submit" value="Upload">
</form>
*/