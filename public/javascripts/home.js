const transformToggleText = () => {
  const feed = window.location.href.toString().trim().split("/").pop();

  let toggle;
  switch (feed) {
    case "":
      toggle = document.querySelector(".following");
      break;
    case "you":
      toggle = document.querySelector(".following");
      break;
    case "hot":
      toggle = document.querySelector(".hot");
      break;
    case "trending":
      toggle = document.querySelector(".trending");
      break;
    case "recent":
      toggle = document.querySelector(".recent");
      break;
  }

  toggle.style.paddingBottom = "5px";
  toggle.style.color = "#292929";
  toggle.style.borderBottom = "1px solid #292929";
  toggle.style.fontWeight = "500";
};

window.addEventListener("DOMContentLoaded", () => {
  transformToggleText();
});
