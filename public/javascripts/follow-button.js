  import { handleErrors, isResponseOk } from "./error-handlers.js";

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

    // helper checks if 401 and if !response.ok
    if (!isResponseOk(response)) return;

    const { newFollow } = await response.json();
    const isHeaderOrSide = isNavButton(button);

    if (isHeaderOrSide) {
      handleSideAndHeaderFollows(button, newFollow.id);
    } else {
      resetButton(button, newFollow.id);
    }

    const data = { button, userId, followerId, followId, newFollow };
    const resource = checkResource();
    if (shouldUpdateCount(data, resource, isHeaderOrSide)) {
      const followerOrFollowing = checkButton(data, resource);
      updateCounts(followerOrFollowing, "follow");
    }

    return newFollow;
  } catch (error) {
    handleErrors(error);
  }
};

export const unfollow = async (e) => {
  e.preventDefault();
  const button = e.target;
  const userId = parseInt(button.getAttribute("user"), 10);
  const followerId = parseInt(button.getAttribute("follower"), 10);
  const followId = button.getAttribute("follow", 10);

  try {
    const response = await fetch(`/users/${followerId}/following/${userId}`, {
      method: "DELETE",
    });

    if (!isResponseOk(response)) return;

    const isHeaderOrSide = isNavButton(button);
    if (isHeaderOrSide) {
      handleSideAndHeaderFollows(button, "0");
    } else {
      resetButton(button, "0");
    }

    const data = { button, userId, followerId, followId };
    const resource = checkResource();

    if (shouldUpdateCount(data, resource, isHeaderOrSide)) {
      const followerOrFollowing = checkButton(data, resource);
      updateCounts(followerOrFollowing, "unfollow");
    }
    return response;
  } catch (error) {
    handleErrors(error);
  }
};

const checkResource = () => {
  // check if single or collection and return both
  const path = window.location.href.toString().trim().split("/");
  return path.slice(-2);
};

const isNavButton = (button) => {
  if (button.classList.contains("header-button")) {
    return "header";
  } else if (button.classList.contains("side-button")) {
    return "side";
  }

  return false;
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

const shouldUpdateCount = (data, resource, isHeaderOrSide) => {
  const followerId = data.followerId.toString();
  const followerCounts = document.querySelectorAll(".follower-count");
  const followingCounts = document.querySelectorAll(".following-count");

  const pageBelongsToCurrentUser = resource.includes(followerId);
  // if nothing to update or on /:id/following and profile doesnt belong to current user
  if (!followerCounts.length && !followingCounts.length) {
    return false;
  } else if (resource.includes("following")) {
    if (!isHeaderOrSide && !pageBelongsToCurrentUser) {
      return false;
    }
  } else if (resource.includes("followers") && !isHeaderOrSide) {
    return false;
  }

  return true;
};

const checkButton = (data, resource) => {
  const followerId = data.followerId.toString();
  const followerCounts = document.querySelectorAll(".follower-count");
  const followingCounts = document.querySelectorAll(".following-count");

  if (resource[0] === followerId) {
    return followingCounts;
  } else {
    return followerCounts;
  }
};

const updateCounts = (counts, action) => {
  counts.forEach((el) => {
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
