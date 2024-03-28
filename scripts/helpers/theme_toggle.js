import { getData } from "./fetch";

const trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition');
    }, 1000);
}

function themeToggle () {
    let checkbox = document.getElementById('theme-toggle');
    if (!checkbox) return;
    let userImage = document.getElementById('theme-image');
    let logoImage = document.getElementById('theme-logo');
    checkbox.addEventListener('click', async () => {
        const result = await getData('include/theme.inc.php');
        if (!result) {
            document.documentElement.setAttribute('data-theme', 'dark');
            logoImage.src = 'images/logo-2.png';
            userImage.src = 'images/default2.png';
            return trans();
        } 
        document.documentElement.setAttribute('data-theme', 'light');
        logoImage.src = 'images/logo.png';
        userImage.src = 'images/default.png';
        trans();
    });
}

export { themeToggle };