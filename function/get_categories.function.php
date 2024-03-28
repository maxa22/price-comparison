<?php
function get_categories($data)
{
    $category_table = new Database('category');
    $categories = $category_table->select('name', 'id'); 
    return json_encode($categories);
}
