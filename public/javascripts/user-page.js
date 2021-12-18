import { toggleDropdown } from "./dropdown.js";
import { follow, unfollow } from "./follow-button.js";

window.addEventListener("load", (event) => {
  toggleDropdown();
  follow();
  unfollow();
});
