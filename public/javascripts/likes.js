// window.addEventListener("load", (event) => {
console.log("likes javascript!");
// });

// console.log(typeof count);
// console.log(typeof counted);
// likeCounter.innerHTML = count;
// console.log("likecounterx", count);

const addLike = document.querySelector(".likeButton");
// console.log("addLike", addLike);

addLike.addEventListener("click", async (e) => {
  const memeId = e.target.id.split("-")[1]; // [like, 3]

  let likeCounter = document.querySelector("#likeCount");
  let count = likeCounter.innerHTML;
  console.log("likeCounter", count);
  count = parseInt(count.split(": ")[1], 10);

  const res = await fetch("/api/likes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ memeId }),
  });
  const data = await res.json();
  // console.log(data);
  if (data.message === "liked") {
    count += 1;
    likeCounter.innerHTML = `Likes: ${count}`;
    e.target =;
  } else {
    count -= 1;
    likeCounter.innerHTML = `Likes: ${count}`;
    e.target.innerText = "Like";
  }
});

/*grab the ele off the page
cant ele++ or --
get innerhtml val
if string convert to num
increment or dec depending on if or else
save it to new val 
*/

// button(id=`like-${meme.id}` class='likeButton') Like