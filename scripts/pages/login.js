import { handleErrorsFromServer } from "../helpers/error_handler";
import { isValid } from "../helpers/validate";
import { fetchData } from "../helpers/fetch";
import { removeErrorMessagesOnInput } from "../helpers/reset_input";

export function login() {
  if (!document.querySelector("#login-button")) return;
  document.addEventListener("input", removeErrorMessagesOnInput);
  const registrationForm = document.querySelector("form");
  registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!isValid(registrationForm)) return;
    let formData = new FormData(registrationForm);
    formData.append("submit", "");
    const result = await fetchData("include/login.inc.php", formData);
    if (!result) return (location.href = "projects");
    handleErrorsFromServer(result);
  });
}
