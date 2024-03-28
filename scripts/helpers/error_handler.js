import { hideErrorMessagesFromInputs, setInputsBorderColor } from "./reset_input";

function handleErrorsFromServer(result, container = document.body) {
    hideErrorMessagesFromInputs(container);
    setInputsBorderColor(container, 'ced4da');
    showErrorMessages(result, container);
}

function isEmpty(inputs) {
    let errorArray = [];
    for(let input of inputs) {
        if (input.id === 'default-firm') continue;
        if(input.value == '') {
            input.style.borderColor = '#a94442';
            input.classList.remove('h-100');
            input.parentElement.querySelector('.registration-form__error').innerHTML = 'Polje ne smije biti prazno';
            errorArray.push('error');
            continue;
        }
        let body = document.querySelector('body');
        let backgroundColor = window.getComputedStyle(body, null).getPropertyValue("background-color");
        input.style.borderColor = backgroundColor == 'rgb(255, 255, 255)' ? 'rgba(51, 51, 51, 0.5)' : 'rgba(238, 238, 238, 0.5)';
        input.parentElement.querySelector('.registration-form__error').innerHTML = '';
    }
    return errorArray;
}

function showErrorMessages(result, container = document.body) {
    for(const [key, value] of Object.entries(result)) {
        let field = container.querySelector(`input[name="${key}"]`) ?
                            container.querySelector(`input[name="${key}"]`) :
                            container.querySelector(`select[name="${key}"]`) ?
                            container.querySelector(`select[name="${key}"]`) :
                            container.querySelector(`textarea[name="${key}"]`) ? 
                            container.querySelector(`textarea[name="${key}"]`) :
                            container.querySelector(`[name="${key}"]`);
        field.style.borderColor = '#a94442';
        field.parentElement.querySelector('.registration-form__error').innerHTML = value;
    }
}

export { handleErrorsFromServer, isEmpty };