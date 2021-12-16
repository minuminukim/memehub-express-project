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
