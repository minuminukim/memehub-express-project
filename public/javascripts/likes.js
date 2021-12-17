// window.addEventListener("load", (event) => {
console.log("likes javascript!");
// });

const addLike = document.querySelector(".likeButton");
console.log("addLike", addLike);
addLike.addEventListener("click", async (e) => {
  const memeId = e.target.id.split("-")[1]; // [like, 3]

  const res = await fetch("/api/likes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ memeId }),
  });
  const data = await res.json();
  console.log(data);
  if (data.message === "liked") {
    e.target.innerText = "unlike";
  } else {
    e.target.innerText = "like";
  }
});


/*grab the ele off the page
cant ele++ or --
get innerhtml val
if string conver to num
increment or dec depending on if or else
save it to new val 
*/