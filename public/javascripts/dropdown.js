export const toggleDropdown = () => {
  const button = document.querySelector(".dropdown-button");
  button.addEventListener("click", (event) => {
    const dropdown = document.querySelector(".dropdown-container");

    if (dropdown.style.display === "none") {
      dropdown.style.display = "flex";
    } else {
      dropdown.style.display = "none";
    }
  });
};

// click event listener on post and edit buttons
/**
 * if click event, toggle form's display from none to flex
 *
 * event listener on form submit event
 * on submit, toggle form's display back to none
 */
