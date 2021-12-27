import { handleErrors, isResponseOk } from "./error-handlers.js";

const postLike = async (e) => {
  const button = e.target;
  const memeId = e.target.id.split("-")[1];
  const userId = button.getAttribute("user").split("-")[1];

  try {
    const res = await fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memeId, userId }),
    });

    if (!isResponseOk(res)) {
      return;
    }

    const data = await res.json();
    const like = data.newLike;

    const likeCounter = document.getElementById(`likeCount-${memeId}`);
    const bubble = document.querySelector(`.likeBubble-${memeId}`);
    let count = parseInt(likeCounter.innerText, 10);

    likeCounter.innerText = `${(count += 1)}`;
    bubble.innerText = "Unfunny";

    button.src = "/images/happy-emote-filled.png";
    button.setAttribute("like", `like-${like.id}`);
    button.removeEventListener("click", postLike);
    button.addEventListener("click", deleteLike);

    return like;
  } catch (error) {
    handleErrors(error);
  }
};

const deleteLike = async (e) => {
  const button = e.target;
  const like = button.getAttribute("like").split("-")[1];
  const likeId = parseInt(like, 10);

  try {
    const res = await fetch(`/api/likes/${likeId}`, {
      method: "DELETE",
    });

    if (!isResponseOk(res)) {
      return;
    }

    const memeId = e.target.id.split("-")[1];
    const likeCounter = document.getElementById(`likeCount-${memeId}`);
    const bubble = document.querySelector(`.likeBubble-${memeId}`);
    let count = parseInt(likeCounter.innerText, 10);

    likeCounter.innerText = `${(count -= 1)}`;
    bubble.innerText = "Funny";

    button.src = "/images/happy-emote.png";
    button.setAttribute("like", `like-0`);
    button.removeEventListener("click", deleteLike);
    button.addEventListener("click", postLike);
  } catch (error) {
    handleErrors(error);
  }
};

const toggleLikeBubble = (button) => {
  const memeId = button.id.split("-")[1];
  const bubble = document.getElementById(`likeBubble-${memeId}`);

  button.addEventListener("mouseover", (e) => {
    bubble.classList.remove("hidden");
  });

  button.addEventListener("mouseout", (e) => {
    bubble.classList.add("hidden");
  });
};

window.addEventListener("DOMContentLoaded", () => {
  const likeButtons = document.querySelectorAll(".likeButton");

  likeButtons.forEach((button) => {
    toggleLikeBubble(button);
    const like = button.getAttribute("like").split("-")[1];
    const likeId = parseInt(like, 10);

    if (likeId > 0) {
      button.addEventListener("click", deleteLike);
    } else {
      button.addEventListener("click", postLike);
    }
  });
});
