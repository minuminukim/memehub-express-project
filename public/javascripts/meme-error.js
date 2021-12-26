const memeError = () => {
  const errorList = document.querySelectorAll(".error-message");

  errorList.forEach((error) => {
    const message = error.innerText;

    let input;
    switch (message) {
      case "Please provide a Headline for your meme":
        input = document.querySelector("#headline");
        break;
      case "Please provide a Caption for your meme":
        input = document.querySelector("#caption");
        break;
      case "Please provide a Link to your meme":
        input = document.querySelector("#link");
        break;
      case "Please provide a valid URL for your link":
        input = document.querySelector("#link");
        break;
    }

    input.classList.add("error-message");
    input.setAttribute("placeholder", `${message}`);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  memeError();
});
