const demoSignIn = () => {
  const button = document.querySelector(".demo-button");

  button.addEventListener("click", (event) => {
    event.preventDefault();
    const path = window.location.href.toString().trim().split("/").pop();

    if (path !== "sign-in") {
      window.location.replace("/users/sign-in");
      return;
    } else {
      const emailField = document.querySelector("#email");
      const passwordField = document.querySelector("#password");
      emailField.value = "hello@world.com";
      passwordField.value = "password";

      document.signIn.submit();
    }
  });
};

window.onload = () => demoSignIn();
