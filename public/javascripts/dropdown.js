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

