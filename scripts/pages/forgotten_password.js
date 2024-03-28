import { fetchData } from "../helpers/fetch";
import { ToastrMessage } from "../classes/ToastrMessage";

export function forgottenPasswordPage() {
  if (window.location.href.indexOf("/forgotten_password") === -1) return;
  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // if (email.value === "") return showErrorMessage('Field can\'t be empty.'); // prettier-ignore
    document.querySelector(".loader").classList.add("active");
    const formData = new FormData(form);
    try {
      const response = await fetchData(
        "include/forgotten_password.inc.php",
        formData
      );
      form.innerHTML = "";
      const message = document.createElement("p");
      Object.assign(message, {
        className: "input-form text-center",
        textContent:
          "Thank you for reaching out! We have sent you an e-mail with the password reset link. ",
      });
      const goBack = document.createElement("a");
      Object.assign(goBack, {
        className: "btn btn-primary w-100 mt-m text-center",
        href: "./",
        textContent: "OK",
      });
      form.append(message);
      form.append(goBack);
    } catch (e) {
      const toastr = new ToastrMessage();
      toastr.showErrorMessage("Something went wrong");
    }
    document.querySelector(".loader").classList.remove("active");
  });
}
