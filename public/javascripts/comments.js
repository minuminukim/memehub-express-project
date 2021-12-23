const toggleModal = () => {
  const buttons = document.querySelectorAll(".commentButton");
  for (const button of buttons) {
    button.addEventListener("click", (e) => {
      const memeId = button.id.split("-")[1];
      const modal = document.getElementById(`modal-${memeId}`);
      if (modal.classList.contains("modal-hidden")) {
        modal.classList.remove("modal-hidden");
      } else {
        modal.classList.add("modal-hidden");
      }
    });
  }

  const toggles = document.querySelectorAll(".modal-close");
  for (const toggle of toggles) {
    toggle.addEventListener("click", (e) => {
      const memeId = toggle.id.split("-")[1];
      const modal = document.getElementById(`modal-${memeId}`);
      modal.classList.add("modal-hidden");
    });
  }
};

window.addEventListener("DOMContentLoaded", () => {
  toggleModal();
});
