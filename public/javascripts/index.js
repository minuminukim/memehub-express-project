import { toggleDropdown } from "./dropdown.js";
import { follow, unfollow } from "./follow-button.js";

window.addEventListener("load", (event) => {
  console.log("hello from javascript!");
  toggleDropdown();
  follow();
  unfollow();
});

window.addEventListener("load", (event) => {
  console.log("hello from hi");
});
