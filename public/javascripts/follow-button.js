const follow = () => {
  const button = document.querySelector(".follow-button");
  const userId = parseInt(button.getAttribute("user"));
  const followerId = parseInt(button.getAttribute("follower"));

  button.addEventListener("click", async (event) => {
    event.preventDefault();
    console.log("Click event");
    // const formData = new FormData(form);
    // console.log(formData);
    button.
  });
};

window.addEventListener("load", (event) => {
  follow();
});

// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     const response = await fetch("http://localhost:8080/follows");
//     const { follows } = await response.json();
//     console.log(follows);
//   } catch (error) {
//     console.log(error);
//   }
// });
