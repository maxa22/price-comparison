<?php
function get_products($data)
{
    session_start();

    $column_names = [1];
    $operators = ['='];
    $column_values = [1];
    if ($data['category']) {
        $column_names = ['product.category_id'];
        $operators = ['='];
        $column_values = [$data['category']];
    }
    if ($data['name'] ) {
        array_push($column_names, 'product.name');
        array_push($operators, 'LIKE');
        array_push($column_values, '%' . $data['name'] . '%');
    }
    $page = (int) $data['page'];
    $offset = ($page - 1) * 20;
    $product_table = new Database('price');
    $products_data = $product_table->inner_join('product', 'price.product_id', 'product.id')->inner_join('store', 'price.store_id', 'store.id')->group_by('price.product_id')->limit(20)->offset($offset)->where($column_names, $operators, $column_values)->select('product.id', 'product.name', 'product.image', 'JSON_ARRAYAGG(JSON_OBJECT("price", price.price, "storeLogo", store.image, "store", store.name)) AS product_details'); 
    // query
    // return json_encode($products_data);
    if (!$products_data) return json_encode([]);
    // get prices, stores and store logos as arrays
    for ($i=0; $i < count($products_data) ; $i++) {
        $products_data[$i]['product_details'] = json_decode($products_data[$i]['product_details']);
        if (count($products_data[$i]['product_details']) === 1) {
            $products_data[$i]['min'] = $products_data[$i]['product_details'][0];
            continue;
        }
        $min = 100000;
        foreach ($products_data[$i]['product_details'] as $item) {
            if ($item->price < $min) {
                $products_data[$i]['min'] = $item;
                $min = $item->price;
            }
        } 
    }
    
    return json_encode($products_data);
}
