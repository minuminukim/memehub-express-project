import { toggleDropdown } from "./dropdown.js";
import { addFollowButtonListener } from "./follow-button.js";

window.addEventListener("load", (event) => {
  toggleDropdown();
  addFollowButtonListener();
});
