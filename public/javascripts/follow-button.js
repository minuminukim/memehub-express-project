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

        if (!response.ok) {
          throw response;
        }

        button.innerText = "Follow";
        return response.json();
      } catch (err) {
        return response.json(err);
      }
    });
  });
};
