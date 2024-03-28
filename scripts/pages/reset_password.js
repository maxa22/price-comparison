import { ToastrMessage } from "../classes/ToastrMessage";
import { fetchData } from "../helpers/fetch";
import { isValid } from "../helpers/validate";

export function resetPasswordPage() {
  if (window.location.href.indexOf("/reset_password") === -1) return;
  const password = document.querySelector(".new_password");
  const confirmPassword = document.querySelector(".repeat_new_password");
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  const token = url.searchParams.get("token");
  const form = document.querySelector("form");
  const container = document.querySelector(".form-container");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    //if (!isValid(form)) return; Ovo ovdje je pravilo grešku!
    const toastr = new ToastrMessage();
    if (password.value !== confirmPassword.value) return toastr.showErrorMessage("Passwords must match."); // prettier-ignore
    const formData = new FormData(form);
    formData.append("id", id);
    formData.append("token", token);
    try {
      const response = await fetchData(
        "include/reset_forgotten_password.inc.php",
        formData
      );
      container.innerHTML = "";
      const message = document.createElement("p");
      Object.assign(message, {
        className: "input-container text-center",
        textContent:
          "Your password has been successfully changed. You can now sign in with new password. ",
      });
      const goBack = document.createElement("a");
      Object.assign(goBack, {
        className: "btn btn-primary w-100 mt-m text-center",
        href: "./login",
        textContent: "OK",
      });
      container.append(message);
      container.append(goBack);
    } catch (e) {
      toastr.showErrorMessage("Something went wrong");
    }
  });
  //   password.addEventListener("focus", removeErrorMessage);
  //   confirmPassword.addEventListener("focus", removeErrorMessage);
}
