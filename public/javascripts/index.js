import { toggleDropdown } from "./dropdown.js";
import { addFollowButtonListeners } from "./follow-button.js";

window.addEventListener("load", () => {
  toggleDropdown();
  addFollowButtonListeners();
});
