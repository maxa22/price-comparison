<?php
function get_product($data)
{

    $product_table = new Database('price');
    $id = $data['id'];
    $product = $product_table->inner_join('product', 'price.product_id', 'product.id')->inner_join('store', 'price.store_id', 'store.id')->group_by('price.product_id')->where('product.id', '=', $id)->select('product.id', 'product.name', 'product.image', 'JSON_ARRAYAGG(JSON_OBJECT("price", price.price, "storeLogo", store.image, "store", store.name)) AS product_details'); 

    return json_encode($product);

}
