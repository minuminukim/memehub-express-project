import { toggleDropdown } from "./dropdown.js";
import { addFollowButtonEvents } from "./follow-button.js";

window.addEventListener("load", (event) => {
  toggleDropdown();
  addFollowButtonEvents();
});
