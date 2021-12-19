export const follow = () => {
  const forms = document.querySelectorAll(".follow-form");

  forms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const button = form.children[0];
      const userId = parseInt(button.getAttribute("user"), 10);
      const followerId = parseInt(button.getAttribute("follower"), 10);

      try {
        const response = await fetch(`/users/${followerId}/following`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, followerId }),
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
        console.log(document.querySelector(".follow-count"));

        // const resourceIsFollow = window.location.href
        //   .toString()
        //   .split("/")
        //   .pop()
        //   .startsWith("follow");

        // console.log(resourceIsFollow);

        // if (resourceIsFollow) {
        //   const followCount = document.querySelector(".follow-count");
        //   let [count, text] = followCount.innerText.trim().split(" ");
        //   count = parseInt(count) + 1;
        //   followCount.innerText = `${count} ${text}`;
        // }

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
  const forms = document.querySelectorAll(".follow-form");

  forms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const button = event.children[0];
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
        button.removeEventListener("click");
        const { message } = await response.json();
        // const path = window.location.href.toString().trim().split("/");
        // const profileId = parseInt(path[path.length - 2], 10);
        // const shouldUpdate = profileId === userId;
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
