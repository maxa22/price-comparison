<?php
function get_price_history($data)
{

    $product_table = new Database('price_history');
    $id = $data['id'];
    $product = $product_table->inner_join('store', 'price_history.store_id', 'store.id')->where('price_history.product_id', '=', $id)->order_by('date')->select('price', 'date', 'store.name'); 

    return json_encode($product);

}
