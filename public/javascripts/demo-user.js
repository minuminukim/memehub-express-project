const demoSignIn = () => {
  const button = document.querySelector("#demo-button");

  button.addEventListener("click", (event) => {
    event.preventDefault();
    const emailField = document.querySelector("#email");
    const passwordField = document.querySelector("#password");
    emailField.value = "hello@world.com";
    passwordField.value = "password";
  });
};

window.onload = () => demoSignIn();
