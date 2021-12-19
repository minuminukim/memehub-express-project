export const addFollowButtonEvents = () => {
  // const followButtons = document.querySelectorAll(".follow-button");
  // followButtons.forEach((button) => button.addEventListener("click", follow));

  // const unfollowButtons = document.querySelectorAll(".unfollow-button");
  // unfollowButtons.forEach((button) =>
  //   button.addEventListener("click", unfollow)
  // );

  const buttons = document.querySelectorAll(
    ".follow-button",
    "unfollow-button"
  );
  buttons.forEach((button) => {
    if (button.classList.contains("follow-button")) {
      button.addEventListener("click", follow);
    } else {
      button.addEventListener("click", unfollow);
    }
  });
};

// const addFollowEvent = (button) => {
//   const userId = parseInt(button.getAttribute("user"), 10);
//   const followerId = parseInt(button.getAttribute("follower"), 10);
//   const followId = button.getAttribute("follow");

//   button.addEventListener("click", async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`/users/${followerId}/following`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, followerId, followId }),
//       });

//       if (response.status === 401) {
//         window.location.href = "/log-in";
//         return;
//       }

//       if (!response.ok) {
//         throw response;
//       }

//       const { newFollow } = await response.json();
//       button.innerText = "Following";
//       button.setAttribute("follow", newFollow.id);

//       const path = window.location.href.toString().trim().split("/");
//       const shouldUpdate = path.includes(userId.toString());

//       if (shouldUpdate) {
//         const followCount = document.querySelector(".follow-count");
//         const [count, text] = followCount.innerText.trim().split(" ");
//         followCount.innerText = `${parseInt(count) + 1} ${text}`;
//       }

//       button.classList.remove("follow-button");
//       button.classList.add("unfollow-button");
//       addUnfollowEvent(button);
//       return newFollow;
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   });
// };

// export const addUnfollowEvent = (button) => {
//   const userId = parseInt(button.getAttribute("user"), 10);
//   const followerId = parseInt(button.getAttribute("follower"), 10);
//   const followId = button.getAttribute("follow");

//   button.addEventListener("click", async (e) => {
//     e.preventDefault();
//     e.stopImmediatePropagation();
//     try {
//       const response = await fetch(`/users/${followerId}/following`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, followerId, followId }),
//       });

//       if (response.status === 401) {
//         window.location.href = "/users/sign-in";
//         return;
//       }

//       if (!response.ok) {
//         throw response;
//       }

//       button.innerText = "Follow";
//       button.setAttribute("follow", "0");

//       const path = window.location.href.toString().trim().split("/");
//       const shouldUpdate = path.includes(userId.toString());

//       if (shouldUpdate) {
//         const followCount = document.querySelector(".follow-count");
//         const [count, text] = followCount.innerText.trim().split(" ");
//         followCount.innerText = `${parseInt(count) - 1} ${text}`;
//       }
//       button.classList.remove("unfollow-button");
//       button.classList.add("follow-button");
//       addFollowEvent(button);
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   });
// };

const resetButton = (button) => {
  if (button.classList.contains("follow-button")) {
    button.classList.remove("follow-button");
    button.classList.add("unfollow-button");

    button.removeEventListener("click", follow);
    button.addEventListener("click", unfollow);
  } else {
    button.classList.remove("unfollow-button");
    button.classList.add("follow-button");

    button.removeEventListener("click", unfollow);
    button.addEventListener("click", follow);
  }
};

export const follow = async (e) => {
  e.preventDefault();

  const button = e.currentTarget;
  const userId = parseInt(button.getAttribute("user"), 10);
  console.log(userId);
  const followerId = parseInt(button.getAttribute("follower"), 10);
  const followId = button.getAttribute("follow");

  try {
    const response = await fetch(`/users/${followerId}/following`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, followerId, followId }),
    });

    if (response.status === 401) {
      window.location.href = "/log-in";
      return;
    }

    if (!response.ok) {
      throw response;
    }

    const { newFollow } = await response.json();

    button.innerText = "Following";
    button.setAttribute("follow", newFollow.id);

    const path = window.location.href.toString().trim().split("/");
    const shouldUpdate = path.includes(userId.toString());

    if (shouldUpdate) {
      const followCount = document.querySelector(".follow-count");
      const [count, text] = followCount.innerText.trim().split(" ");
      followCount.innerText = `${parseInt(count) + 1} ${text}`;
    }

    button.removeEventListener("click", follow);
    button.addEventListener("click", unfollow);
    button.classList.remove("follow-button");
    button.classList.add("unfollow-button");

    return newFollow;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const unfollow = async (e) => {
  e.preventDefault();
  const button = e.currentTarget;
  const userId = parseInt(button.getAttribute("user"), 10);
  const followerId = parseInt(button.getAttribute("follower"), 10);
  const followId = parseInt(button.getAttribute("follow", 10));

  try {
    const response = await fetch(`/users/${followerId}/following`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, followerId, followId }),
    });

    if (response.status === 401) {
      window.location.href = "/users/sign-in";
      return;
    }

    if (!response.ok) {
      throw response;
    }

    button.innerText = "Follow";
    button.setAttribute("follow", "0");

    const path = window.location.href.toString().trim().split("/");
    const shouldUpdate = path.includes(userId.toString());

    if (shouldUpdate) {
      const followCount = document.querySelector(".follow-count");
      const [count, text] = followCount.innerText.trim().split(" ");
      followCount.innerText = `${parseInt(count) - 1} ${text}`;
    }

    button.removeEventListener("click", unfollow);
    button.addEventListener("click", follow);

    button.classList.remove("unfollow-button");
    button.classList.add("follow-button");
    const { message } = await response.json();
    return Promise.resolve(message);
  } catch (error) {
    return Promise.reject(error);
  }
};
