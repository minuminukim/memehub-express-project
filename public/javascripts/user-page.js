import { follow, unfollow } from "./follow-button.js";
import { toggleDropdown } from "./dropdown.js";

window.addEventListener("load", () => {
  const followButtons = document.querySelectorAll(".follow-button");
  const unfollowButtons = document.querySelectorAll(".unfollow-button");

  if (followButtons.length) {
    followButtons.forEach((button) => button.addEventListener("click", follow));
  } else {
    unfollowButtons.forEach(button, addEventListener("click", unfollow));
  }
});

window.onload = () => {
  toggleDropdown();
};
