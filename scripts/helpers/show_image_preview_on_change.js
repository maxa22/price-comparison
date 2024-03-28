export function showImagePreviewOnChange(fileUploads) {
  for (let fileUpload of fileUploads) {
    fileUpload.addEventListener("change", (e) => {
      const container = e.target.parentElement;
      let img = container.querySelector("img");
      let removeImageIcon = container.querySelector(".remove-image");
      let fileName = container.querySelector(".file-name");
      if (fileName) {
        fileName.innerHTML = fileUpload.files[0].name;
      }
      if (removeImageIcon) {
        removeImageIcon.style.display = "block";
      }
      setImage(fileUpload, img);
    });
  }
}

export function showImage(element) {
  const container = element.parentElement;
  let img = container.querySelector("img");
  let removeImageIcon = container.querySelector(".remove-image");
  let fileName = container.querySelector(".image-name");
  if (fileName) {
    fileName.innerHTML = element.files[0].name;
  }
  if (removeImageIcon) {
    removeImageIcon.style.display = "block";
  }
  setImage(element, img);
  imageRemovedHiddenFieldUpdate(element);
}

function setImage(inputField, img) {
  img.src = URL.createObjectURL(inputField.files[0]);
  img.onload = function () {
    URL.revokeObjectURL(img.src);
  };
}

export function removeImage(element) {
  const container = element.parentElement;
  let img = container.querySelector("img");
  img.src = "";
  element.style.display = "none";
  container.querySelector("input").value = "";
  container.querySelector(".image-name").textContent = "";
  imageRemovedHiddenFieldUpdate(element);
}

function imageRemovedHiddenFieldUpdate(element) {
  const hiddenInput = element.parentElement.querySelector(
    "input[type='hidden']"
  );
  if (!hiddenInput) return;
  hiddenInput.value = "1";
}
