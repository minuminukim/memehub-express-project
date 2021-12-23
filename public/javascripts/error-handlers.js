export const handleErrors = async (e) => {
  if (e.status >= 400 && e.status < 600) {
    const errorJSON = await e.json();
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
