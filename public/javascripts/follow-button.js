export const follow = () => {
  const container = document.querySelector(".root");
  container.addEventListener("click", async (event) => {
    // event.stopPropagation();
    if (!event.target.classList.contains("follow-button")) {
      return;
    }

    const button = event.target;
    const userId = parseInt(button.getAttribute("user"));
    const followerId = parseInt(button.getAttribute("follower"));

    const response = await fetch("/follows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, followerId }),
    });

    const data = await response.json();
    console.log(data);
    button.innerText = button.innerText === "Follow" ? "Following" : "Follow";
  });
};
