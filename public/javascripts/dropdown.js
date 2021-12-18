export const toggleDropdown = () => {
  const button = document.querySelector(".dropdown-button");
  const dropdown = document.querySelector(".dropdown-container");

  button.onclick = () => {
    if (dropdown.classList.contains("hide")) {
      dropdown.classList.remove("hide");
    } else {
      dropdown.classList.add("hide");
    }
  };
};

// click event listener on post and edit buttons
/**
 * if click event, toggle form's display from none to flex
 *
 * event listener on form submit event
 * on submit, toggle form's display back to none
 */
