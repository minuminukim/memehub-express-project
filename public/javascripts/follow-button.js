const addFollowButtonListener = () => {
  const forms = document.querySelectorAll(".follow-form");

  forms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const button = form.children[0];
      const userId = parseInt()
    })
  })
};

export const follow = () => {
  const forms = document.querySelectorAll(".follow-form");

  forms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const button = form.children[0];
      const userId = parseInt(button.getAttribute("user"));
      const followerId = parseInt(button.getAttribute("follower"));

      try {
        const response = await fetch(`/users/${userId}/following`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, followerId }),
        })

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
          })

          throw error;
        }

        button.innerText = "Following";

        const resourceIsFollow = window.location.href
          .toString()
          .split("/")
          .pop()
          .startsWith("follow");

        console.log(resourceIsFollow);

        if (resourceIsFollow) {
          const followCount = document.querySelector(".follow-count");
          let [count, text] = followCount.innerText.trim().split(" ");
          parseInt(count)++;
          followCount.innerText = `${count} ${text}`;
        }

        // TODO figure out how to resolve the response promise
        return response.json();
      } catch (error) {
        console.log("error....." , error);
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
      const button = form.children[0];
      const userId = parseInt(button.getAttribute("user"));
      const followerId = parseInt(button.getAttribute("follower"));

      try {
        const response = await fetch(`/users/${userId}/following`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, followerId }),
        })

        if (response.status === 401) {
          window.location.href = "/users/sign-in";
          return;
        }

        if (!response.ok) {
          throw response;
        }

        button.innerText = "Follow";
        return response.json();
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
