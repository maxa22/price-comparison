const errorMessage = {
  empty: "Polje ne smije biti prazno",
  notNumber: "Dozvoljeni samo brojevi",
  alphanumeric: "Dozvoljeni samo slova, brojevi i razmak",
};

const generateError = (input, key) => {
  input.style.borderColor = "#a94442";
  input.classList.remove("h-100");
  input.parentElement.querySelector(".registration-form__error").innerHTML =
    errorMessage[key];
};

const isInputEmpty = (input) => {
  if (input.value !== "" || input.getAttribute("disabled") === "true")
    return true;
  generateError(input, "empty");
  return false;
};

const isNumeric = (input) => {
  let isNumber = !isNaN(input.value);
  if (isNumber || input.getAttribute("disabled") === "true") return true;
  generateError(input, "notNumber");
  return false;
};

const isAlphanumeric = (input) => {
  const validChars = /^[a-zA-Z\p{L}0-9\s]+$/;
  if (validChars.test(input.value)) return true;
  generateError(input, "alphanumeric");
  return false;
};

const isValidInput = (validation_type, input) => {
  let valid;
  switch (validation_type) {
    case "not-empty":
      valid = isInputEmpty(input);
      break;
    case "number":
      valid = isNumeric(input);
      break;
    case "alphanumeric":
      valid = isAlphanumeric(input);
      break;
    default:
      valid = true;
  }
  return valid;
};

const isValid = (form) => {
  const inputs = form.querySelectorAll("input, select, textarea");
  let valid = true;
  for (const input of inputs) {
    const input_validation_array =
      input.getAttribute("data-validation")?.split(" ") || [];
    for (const validation_type of input_validation_array) {
      if (isValidInput(validation_type, input)) continue;
      valid = false;
      break;
    }
  }
  return valid;
};

export { isValid };
