window.addEventListener("DOMContentLoaded", () => {
  const addLikeButtonListener = (button) => {
    button.addEventListener("click", async (e) => {
      const memeId = e.target.id.split("-")[1]; // [like, 3]
      let likeCounter = document.getElementById(`likeCount-${memeId}`);
      const bubble = document.querySelector(`.bubble-${memeId}`);
      let count = parseInt(likeCounter.innerText, 10);

      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memeId }),
      });

      const data = await res.json();

      if (data.message === "liked") {
        count += 1;
        likeCounter.innerText = `${count}`;
        e.target.src = "/images/happy-emote-filled.png";
        bubble.innerText = "Unlike";
      } else {
        count -= 1;
        likeCounter.innerHTML = `${count}`;
        e.target.src = "/images/happy-emote.png";
        bubble.innerText = "Like";
      }
    });
  };

  const addLikeButtons = document.querySelectorAll(".likeButton");

  for (let i = 0; i < addLikeButtons.length; i++) {
    const button = addLikeButtons[i];
    addLikeButtonListener(button);
    toggleLikeBubble(button);
  }
});

const toggleLikeBubble = (button) => {
  const memeId = button.id.split("-")[1];
  const bubble = document.getElementById(`bubble-${memeId}`);

  button.addEventListener("mouseover", (e) => {
    console.log(bubble);
    bubble.classList.remove("hidden");
  });

  button.addEventListener("mouseout", (e) => {
    bubble.classList.add("hidden");
  });
};

