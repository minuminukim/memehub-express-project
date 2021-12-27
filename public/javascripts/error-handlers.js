export const handleErrors = async (err) => {
  if (err.status >= 400 && err.status < 600) {
    const errorJSON = await err.json();
    const errorsContainer = document.createElement("div");
    errorsContainer.classList.add("errors-container");

    const errorsHTML = [
      `
      <div class="error">
        Something went wrong. Please try again.
      </div>
      `,
    ];

    const { errors } = errorJSON;
    if (errors && Array.isArray(errors)) {
      errors.forEach((err) => {
        errorsHTML.push(
          `<div class="error">
            ${err}
          </div>
          `
        );
      });

      errorsContainer.innerHTML = errorsHTML.join("");
    }
  }
};

export const isResponseOk = (response) => {
  if (response.status === 401) {
    window.location.href = "/log-in";
    return false;
  }

  if (!response.ok) {
    throw response;
  }

  return true;
};

export const handleCommentError = async (err) => {
  if (err.status >= 400 && err.status < 600) {
    const errorJSON = await err.json();
    const { message } = errorJSON;

    if (message) {
      const editField = document.querySelector(".edit-content");
      const field = document.querySelector(".content");

      if (editField) {
        editField.setAttribute("placeholder", message);
        editField.classList.add("comment-error");
      } else {
        field.setAttribute("placeholder", message);
        field.classList.add("comment-error");
      }
    }
  }
};
