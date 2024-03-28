<?php 

    // $id = $_GET['q'];
    // $name = $_GET['name'] ?? '';
    // $product = new Database('product');
    // if ($name !== '') {
    //     $product->where('id', '=', $id)->update(['konzum_name' => $name]);
    // }

    // print_r($_GET);

?>

<header>
    <div></div>
    <a href="./products" class="header-text-main">Products</a>
    <div></div>
    <a href="./cart" class="header-cart">
        <img src="./uploads/images/shopping-cart.png" class="header-cart-image" alt="">
        <span class="header-cart-quantity"></span>
    </a>
</header>
<!-- <form action="" >
    <input type="text" name="q" value="<?= $id; ?>">
    <input type="text" name="name" id="name">
    <button>Add</button>
</form> -->
<div class="single-product-container">

</div>
<div class="single-product-container">
<h3 class="product-subheading">Price history</h3>
<canvas id="priceChart" class="chart">

</canvas>
</div>
<div class="loader-container">
    <span class="product-loader loader"></span>
</div>
