<?php
function clean_array($array)
{
    $sanitizedData = [];

    foreach ($array as $key => $value) {
        if (is_array($value)) {
            $sanitizedData[$key] = clean_array($array[$key]);
            continue;
        }
        $sanitizedData[$key] = Security::escape($array[$key]);
        $sanitizedData[$key] = Security::clean($array[$key]);
    }

    return $sanitizedData;

}
