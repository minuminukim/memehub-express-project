// window.addEventListener("load", (event) => {
// console.log("likes javascript!");
// });

// console.log(typeof count);
// console.log(typeof counted);
// likeCounter.innerHTML = count;
// console.log("likecounterx", count);

// const addLike = document.querySelector(".likeButton");
// console.log("addLike", addLike);

//below lines are for creating the event on every button
// window.addEventListener("DOMContentLoaded", () => {
// const addLikeButtonListener = (button) => {

// addLike.addEventListener("click", async (e) => {
//   console.log("test")
//   const memeId = e.target.id.split("-")[1]; // [like, 3]
//   let likeCounter = document.querySelector("#likeCount");

//   let count = likeCounter.innerHTML;
//   count = parseInt(count.split(": ")[1], 10);

  // let count = likeCounter.innerHTML;
  // console.log("likeCounter", count);

//   const res = await fetch("/api/likes", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ memeId }),
//   });
//   const data = await res.json();

//   if (data.message === "liked") {
//     count += 1;
//     likeCounter.innerHTML = `Likes: ${count}`;
//     e.target.innerText = "Unlike";
//   } else {
//     count -= 1;
//     likeCounter.innerHTML = `Likes: ${count}`;
//     e.target.innerText = "Like";
//   }
// })



// }
//below code is used with the commented code above on 14 and 15
// const likeButton = document.querySelectorAll(".likeButton");
// for (let i = 0; i < likeButton.length; i++) {
//   const button = likeButton[i]
//   addLikeButtonListener(button);
// }
// })


/*grab the ele off the page
cant ele++ or --
get innerhtml val
if string convert to num
increment or dec depending on if or else
save it to new val
*/

// button(id=`like-${meme.id}` class='likeButton') Like

// {
//   /* <i id='icon1' class="fas fa-thumbs-up"></i>
// <i id='icon2' class="far fa-thumbs-up"></i> *
// let likeIcon = document.querySelector("#icon1");
// let unlikeIcon = document.querySelector("#icon2"); */
// }





window.addEventListener("DOMContentLoaded", () => {

  const addLikeButtonListener = (button) => {

    button.addEventListener("click", async (e) => {
      console.log("test")
      const memeId = e.target.id.split("-")[1]; // [like, 3]
      console.log("memeId", memeId)
      let likeCounter = document.getElementById(`likeCount-${memeId}`);

      let count = likeCounter.innerHTML;
      console.log("count", count)
      count = parseInt(count.split(": ")[1], 10);

      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memeId }),
      });
      const data = await res.json();
      console.log(data);
      if (data.message === "liked") {
        count += 1;
        likeCounter.innerHTML = `❤ : ${count}`;
        e.target.innerText = "Unlike";
      } else {
        count -= 1;
        likeCounter.innerHTML = `❤ : ${count}`;
        e.target.innerText = "Like";
      }
    })



  }



  const addLikeButtons = document.querySelectorAll(".likeButton");

  for (let i = 0; i < addLikeButtons.length; i++) {
    const button = addLikeButtons[i]
    addLikeButtonListener(button);
  }
})
