const follow = () => {
  const button = document.querySelector(".follow-button");

  button.addEventListener("click", async (event) => {
    event.preventDefault();

    const userId = parseInt(button.getAttribute("user"));
    const followerId = parseInt(button.getAttribute("follower"));
    // const formData = new FormData(form);
    // console.log(formData);

    try {
      const response = await fetch("http://localhost:8080/follows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, followerId }),
      });

      // if (!response.ok) {
      //   throw response;
      // }.

      // console.log(await response.json());
    } catch (error) {
      console.log(error);
    }

    console.log(response);

    // console.log(Promise.resolve(response));
    button.innerText = "Following";
  });
};

// const unfollow = () => {
//   button.addEventListener("click", async (event) => {
//     event.preventDefault();

//     const userId = parseInt(button.getAttribute("user"));
//     const followerId = parseInt(button.getAttribute("follower"));

//     const response = await fetch("http://localhost:8080/follows", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId, followerId }),
//     });

//     button.innerText === "Follow";
//   });
// };

// const follow = async (event) => {
//   event.preventDefault();

//   const userId = parseInt(button.getAttribute("user"));
//   const followerId = parseInt(button.getAttribute("follower"));
//   // const formData = new FormData(form);
//   // console.log(formData);
//   console.log(isFollowing(userId, followerId));

//   const response = await fetch("http://localhost:8080/follows", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ userId, followerId }),
//   });

//   button.innerText = "Following";
// };

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
