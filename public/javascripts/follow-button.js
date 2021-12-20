export const addFollowButtonListeners = () => {
  const followButtons = [...document.querySelectorAll(".follow-button")];
  const unfollowButtons = [...document.querySelectorAll(".unfollow-button")];

  const allButtons = [...followButtons, ...unfollowButtons];

  allButtons.forEach((button) => {
    if (button.classList.contains("follow-button")) {
      button.addEventListener("click", follow);
    } else {
      button.addEventListener("click", unfollow);
    }
  });
};

export const follow = async (e) => {
  e.preventDefault();

  const button = e.target;
  const userId = parseInt(button.getAttribute("user"), 10);
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

    // for buttons that appear in the nav or sidebar
    if (
      button.classList.contains("header-button") ||
      button.classList.contains("side-button")
    ) {
      handleSideAndHeaderFollows(button, newFollow.id);
      updateCount("follow", userId, followerId);
    } else {
      resetButton(button, newFollow.id);
      updateCount("follow", userId, followerId);
    }

    return newFollow;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const unfollow = async (e) => {
  e.preventDefault();
  const button = e.target;
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

    if (
      button.classList.contains("header-button") ||
      button.classList.contains("side-button")
    ) {
      handleSideAndHeaderFollows(button, "0");
      updateCount("unfollow", userId, followerId);
    } else {
      resetButton(button, "0");
      updateCount("unfollow", userId, followerId);
    }

    const { message } = await response.json();
    return Promise.resolve(message);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const resetButton = (button, followId) => {
  if (button.classList.contains("follow-button")) {
    button.innerText = "Following";
    button.setAttribute("follow", followId);
    button.classList.remove("follow-button");
    button.classList.add("unfollow-button");
    button.removeEventListener("click", follow);
    button.addEventListener("click", unfollow);
  } else {
    button.innerText = "Follow";
    button.setAttribute("follow", followId);
    button.classList.remove("unfollow-button");
    button.classList.add("follow-button");
    button.removeEventListener("click", unfollow);
    button.addEventListener("click", follow);
  }
};

const updateCount = (action, userId, followerId) => {
  const followCounts = document.querySelectorAll(".follow-count");
  const path = window.location.href.toString().trim().split("/");

  if (
    !followCounts.length ||
    (path.includes("following") && !path.includes(followerId.toString())) ||
    (path.includes("followers") && userId === followerId)
  ) {
    return;
  }

  followCounts.forEach((el) => {
    const [count, text] = el.innerText.toString().trim().split(" ");
    const int = parseInt(count);

    if (action === "follow") {
      el.innerText = `${int + 1} ${text}`;
    } else {
      el.innerText = `${int - 1} ${text}`;
    }
  });
};

const handleSideAndHeaderFollows = (button, followId) => {
  const classList = button.classList;

  if (classList.contains("header-button")) {
    const side = document.querySelector(".side-button");
    if (side) {
      resetButton(side, followId);
    }
    resetButton(button, followId);
  } else {
    const header = document.querySelector(".header-button");
    if (header) {
      resetButton(header, followId);
    }
    resetButton(button, followId);
  }
};
