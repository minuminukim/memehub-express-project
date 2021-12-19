import { toggleDropdown } from "./dropdown.js";
import { addFollowButtonEvent } from "./follow-button.js";

window.addEventListener("load", (event) => {
  toggleDropdown();
  addFollowButtonEvent();
});
