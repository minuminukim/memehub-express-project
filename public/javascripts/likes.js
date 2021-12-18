// window.addEventListener("load", (event) => {
console.log("likes javascript!");
// });

var likeCounter = document.querySelector("#likeCount");
let count = likeCounter.innerHTML;
count = parseInt(count);
let counted = 4;

console.log(typeof count);
console.log(typeof counted);
// likeCounter.innerHTML = count;
// console.log("likecounterx", count);

const addLike = document.querySelector(".likeButton");
// console.log("addLike", addLike);

addLike.addEventListener("click", async (e) => {
  const memeId = e.target.id.split("-")[1]; // [like, 3]

  const res = await fetch("/api/likes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ memeId }),
  });
  const data = await res.json();
  // console.log(data);
  if (data.message === "liked") {
    counted+=1;
     likeCounter.innerHTML = counted
    e.target.innerText = "unlike";
  } else {
    counted-=1;
    likeCounter.innerHTML = counted
    e.target.innerText = "like";
  }
});


/*grab the ele off the page
cant ele++ or --
get innerhtml val
if string convert to num
increment or dec depending on if or else
save it to new val 
*/
