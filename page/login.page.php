<?php
if(Session::get_value('login')) {
    header("Location: projects");
}
if (isset($_GET['msg'])) {
    echo "<h1>". $_GET['msg'] ."</h1>";
}
?>
<div class="min-height-100vh bg-black d-flex justify-content-center align-items-center">

    <div class="container-small">
        <?php
        if (isset($_GET['msg'])) {
            echo "<h1 class='text-center color-gray mb-3 font-size-6'>" . $_GET['msg'] . "</h1>";
        }
?>
        <img src="./uploads/images/forster-rohner-logo.png" alt="Forster Rohner logo" class="w-100 mb-8">
        <div class="form-container">
            <h1 class="form-container__heading">
                Please sign in
            </h1>
            <div class="input-container">
                <label for="email" class="input-container__label">E-mail adress</label>
                <input type="text" class="input-container__field email" id="email" />
                <img src="./uploads/images/icon_envelope.png" class="input-container__icon">
            </div>
            <div class="input-container">
                <label for="password" class="input-container__label">Password</label>
                <input type="password" class="input-container__field password" id="password" />
                <img src="./uploads/images/icon_lock.png" class="input-container__icon">
            </div>
            <div class="d-flex justify-content-space-between align-items-center w-100 mb-3">
                <div class="d-flex justify-content-center align-items-center"><input type="checkbox" name="chk"
                        id="remember-me" /><label for="remember-me" class="color-white ml-1">Remember me</label></div>
                <a href="./forgotten_password" type="button" class="color-white"> Forgot your password? </a>
            </div>
            <div class="form-error">
                <span class="form-error__icon">
                    <img src="./uploads/images/error.png" alt="">
                </span>
                <p class="form-error__message"></p>
            </div>
            <button type="button" class="btn btn-primary w-100 login" id="login-button"> Login </button>
        </div>
    </div>
</div>