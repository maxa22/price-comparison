function hideErrorMessagesFromInputs(container) {
  let errorMessages = container.querySelectorAll(".registration-form__error");
  for (let errorMessage of errorMessages) {
    errorMessage.innerHTML = "";
  }
}

function setInputsBorderColor(container, color) {
  let inputs = container.querySelectorAll("input, textarea");
  for (let input of inputs) {
    input.style.borderColor = color;
  }
}

function removeInputValues(container = document.body) {
  let inputs = container.querySelectorAll("input, textarea");
  for (let input of inputs) {
    input.value = "";
  }
}

function disableInputFields(container) {
  let inputs = container.querySelectorAll("input, textarea");
  inputs.forEach((input) => input.setAttribute("disabled", "true"));
}

function getInputValues(inputFieldsArray) {
  let inputValuesArray = [];
  for (let input of inputFieldsArray) {
    const value = input.getAttribute("value");
    inputValuesArray.push(value);
  }
  return inputValuesArray;
}

function returnInitialValueToInputFields(inputFieldsArray, inputValueArray) {
  for (let i = 0; i < inputFieldsArray.length; i++) {
    inputFieldsArray[i].value = inputValueArray[i];
  }
}

function removeErrorMessagesOnInput(e) {
  const container = e.target.parentElement;
  if (
    !container ||
    container.querySelector(".registration-form__error").innerHTML === ""
  )
    return;
  container.querySelector(".registration-form__error").innerHTML = "";
  e.target.style.borderColor =
    window
      .getComputedStyle(document.body, null)
      .getPropertyValue("background-color") == "rgb(255, 255, 255)"
      ? "rgba(51, 51, 51, 0.5)"
      : "rgba(238, 238, 238, 0.5)";
}

export {
  setInputsBorderColor,
  hideErrorMessagesFromInputs,
  removeInputValues,
  disableInputFields,
  getInputValues,
  returnInitialValueToInputFields,
  removeErrorMessagesOnInput,
};
