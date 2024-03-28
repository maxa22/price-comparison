<div class="min-height-100vh bg-black d-flex justify-content-center align-items-center">
    <div class="container-small">
        <img src="./uploads/images/forster-rohner-logo.png" alt="Forster Rohner logo" class="w-100 mb-8">
        <div class="form-container">
            <h1 class="form-container__heading">
                Set new password
            </h1>
            <p class="d-none" id="uid">
                <?php echo $_GET['id'] ?? '';?>
            </p>
            <p class="d-none" id="token">
                <?php echo $_GET['token'] ?? '';?>
            </p>
            <div class="input-container">
                <label for="password" class="input-container__label">New password</label>
                <input type="password" id="password" class="input-container__field new_password" />
                <img src="./uploads/images/icon_lock.png" class="input-container__icon">
            </div>
            <span class="input-container__info">Your password must be 8-20 characters long and contain letters and
                numbers. It must not contain spaces, special characters and emojis.</span>
            <div class="input-container">
                <label for="password_confirm" class="input-container__label">Repeat new password</label>
                <input type="password" id="password_confirm" class="input-container__field repeat_new_password" />
                <img src="./uploads/images/icon_lock.png" class="input-container__icon">
            </div>
            <div class="mb-2"></div>
            <div class="form-error">
                <span class="form-error__icon">
                    <img src="./uploads/images/error.png" alt="">
                </span>
                <p class="form-error__message"></p>
            </div>
            <button type="button" id="change_password" class="btn btn-primary w-100"> Confirm </button>
        </div>
    </div>
</div>