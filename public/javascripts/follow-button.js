<<<<<<< HEAD
// export const follow = () => {
//   // const container = document.querySelector(".followers-container");
//   const button = document.querySelector(".follow-button");

//   button.addEventListener("click", (event) => {
//     // const isButton = event.target.tagName === "BUTTON";
//     // if (!isButton) return;

//     const userId = parseInt(button.getAttribute("user"));
//     const followerId = parseInt(button.getAttribute("follower"));

//     const request = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId, followerId }),
//     };

//     fetch("http://localhost:8080/follows", request)
//       .then((response) => {
//         if (!response.ok) {
//           console.log(response);
//           throw response;
//         } else {
//           button.innerText = "Following";
//           return response.json();
//         }
//       })
//       .catch((err) => {
//         Promise.reject("You are already following this user");
//       });
//   });
// };
=======
export const follow = () => {
  const forms = document.querySelectorAll(".follow-form");

  forms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const button = document.querySelector(".follow-button");
      const userId = parseInt(button.getAttribute("user"));
      const followerId = parseInt(button.getAttribute("follower"));

      try {
        const response = await fetch(`/users/${userId}/following`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, followerId }),
        });

        if (!response.ok) {
          throw response;
        }
        button.innerText = "Following";
        return response.json();
      } catch (error) {
        return res.json(error);
      }
    });
  });
};
>>>>>>> main

export const unfollow = () => {
  const forms = document.querySelectorAll(".follow-form");

  forms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const button = document.querySelector(".follow-button");
      const userId = parseInt(button.getAttribute("user"));
      const followerId = parseInt(button.getAttribute("follower"));

      try {
        const response = await fetch(`/users/${userId}/following`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, followerId }),
        });

<<<<<<< HEAD
//   button.innerText = "Following";
// };

// window.addEventListener("load", (event) => {
//   follow();
// });
=======
        if (!response.ok) {
          throw response;
        }
>>>>>>> main

        button.innerText = "Follow";
        return response.json();
      } catch (err) {
        return response.json(err);
      }
    });
  });
};
