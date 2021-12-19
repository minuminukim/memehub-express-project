export const addFollowButtonListener = () => {
  const buttons = document.querySelectorAll(".follow-button");
  buttons.forEach((button) => {
    const followId = parseInt(button.getAttribute("follow"));
    if (!followId) {
      button.addEventListener("click", follow);
    } else {
      button.addEventListener("click", unfollow);
    }
  });
};

const follow = async (e) => {
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
    return newFollow;
  } catch (error) {
    return Promise.reject(error);
  }
};

const unfollow = async (e) => {
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

    const { message } = await response.json();
    console.log(message);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
