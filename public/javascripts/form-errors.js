const newUserError = () => {
  const errorList = document.querySelectorAll(".error-message");

  errorList.forEach((error) => {
    const message = error.innerText;
    let label;
    let input;

    switch (message) {
      case "Please enter your Username.":
        label = document.querySelector(`label[for="username"]`);
        input = document.querySelector("#username");
        break;
      case "Please enter your First Name.":
        label = document.querySelector(`label[for="firstName"]`);
        input = document.querySelector("#firstName");
        break;
      case "Please enter your Last Name.":
        label = document.querySelector(`label[for="lastName"]`);
        input = document.querySelector("#lastName");
        break;
      case "Please enter your Email.":
        label = document.querySelector(`label[for="email"]`);
        input = document.querySelector("#email");
        break;
      case "Email Address is not a valid email.":
        label = document.querySelector(`label[for="email"]`);
        input = document.querySelector("#email");
        break;
      case "Please enter your Password.":
        label = document.querySelector(`label[for="password"]`);
        input = document.querySelector("#password");
        break;
      case `Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*").`:
        label = document.querySelector(`label[for="password"]`);
        input = document.querySelector("#password");
        break;
      case "Please confirm Password.":
        label = document.querySelector(`label[for="confirmPassword"]`);
        input = document.querySelector("#confirmPassword");
        break;
    }

      label.style.color = "#c94a4a";
      input.style.borderBottom = "1px solid #c94a4a";

      const renderedMessage = document.createElement("div");
      renderedMessage.innerText = `${message}`;
      renderedMessage.classList.add("error-message");

      const field = label.parentElement;
      field.appendChild(renderedMessage);
  });
};

window.addEventListener("DOMContentLoaded", () => {
  newUserError();
});
