export const follow = () => {
  const buttons = document.querySelectorAll(".follow-button");

  buttons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
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
          const { message } = await response.json();
          const error = Error({
            status: response.status,
            message,
            title: response.title,
          });

          throw error;
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

        // TODO figure out how to resolve the response promise
        return newFollow;
      } catch (error) {
        console.log("error.....", error);
        return Promise.reject(error);
      }
    });
  });
};

export const unfollow = () => {
  const buttons = document.querySelectorAll(".follow-button");

  buttons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();

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

        const { message } = await response.json();

        const path = window.location.href.toString().trim().split("/");
        const shouldUpdate = path.includes(userId.toString());

        if (shouldUpdate) {
          const followCount = document.querySelector(".follow-count");
          const [count, text] = followCount.innerText.trim().split(" ");
          followCount.innerText = `${parseInt(count) - 1} ${text}`;
        }

        // const resourceIsFollow = path[path.length - 1].startsWith("follow");

        // console.log(path);

        // console.log(resourceIsFollow);

        // if (resourceIsFollow && shouldUpdate) {
        //   const followCount = document.querySelector(".follow-count");
        //   let [count, text] = followCount.innerText.trim().split(" ");
        //   count = parseInt(count) - 1;
        //   followCount.innerText = `${count} ${text}`;
        // }
        return message;
      } catch (error) {
        return Promise.reject(error);
      }
    });
  });
};

/** TODO
 * Right now I'm applying both the post and delete listeners on
 * every single button.
 * So I have to figure out
 * on client-side
 * IF already following
 *  apply delete listener
 * ELSE
 *  apply post listener
 */

//
