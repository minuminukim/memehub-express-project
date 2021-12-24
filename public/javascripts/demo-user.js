const demoSignIn = () => {
  const button = document.querySelector(".demo-button");

  button.addEventListener("click", (event) => {
    const path = window.location.href.toString().trim().split("/").pop();

    if (path !== "sign-in") {
      event.preventDefault();
      window.location.replace("/users/sign-in");
    }

    const emailField = document.querySelector("#email");
    const passwordField = document.querySelector("#password");
    emailField.value = "hello@world.com";
    passwordField.value = "password";
  });
};

window.onload = () => demoSignIn();
