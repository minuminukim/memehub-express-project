
/*
-grab button thats submits action
-add event listener to that button
    -grab element that holds content
    -get memeId from button that was clicked (e.target.id)
    -send content to backend via fetch
        -send content with memeid and content via fetch
*/

window.addEventListener("DOMContentLoaded", () => {

  const addCommentButton = document.querySelector(".add-button");
  console.log("addCommentButton", addCommentButton);
  addCommentButton.addEventListener("click", async (e) => {

    const content = document.querySelector(".content");
    let memeId = e.target.id;
    let contentValue = content.value


    const body = { contentValue, memeId }
    console.log("contentValue", contentValue)

    try {
      const res = await fetch("/api/comments", {

        method: "POST",
        body: JSON.stringify({ ...body }),
        headers: {
          "Content-type": "application/json"
        },
      });
      if (!res.ok) {
        throw res;
      }


      let data = await res.json();
      let newComment = data.comment;
      console.log("new comment", newComment);
      let li = document.createElement("li")

      li.setAttribute("class", "content")

      console.log("hello", newComment.body)
      let innerLi = `${newComment.User.username} : ${newComment.body}`
      li.innerHTML = innerLi;

      let deleteButton = document.createElement("button");
      addDeleteButtonListener(deleteButton);
      let editButton = document.createElement("button");

      deleteButton.setAttribute("id", `${newComment.id}`);
      deleteButton.setAttribute("class", "delete-button");
      deleteButton.innerHTML = "Delete";


      editButton.setAttribute("id", `${newComment.id}`);
      editButton.setAttribute("class", "edit-button");
      editButton.innerHTML = "Edit";

      li.appendChild(deleteButton);
      li.appendChild(editButton);

      let grabUl = document.querySelector(".comment-box")
      console.log("ul", grabUl.children)
      let ulChildren = Array.from(grabUl.children).slice();
      console.log("checkpoint")

      grabUl.innerHTML = "";
      grabUl.appendChild(li);


      Array.from(ulChildren).forEach(child => grabUl.appendChild(child))



      //new comment
      // create an li with attribute/class name of content
      //should have class namve of comment.user.username
      //inner text = comment.body
      // inner html of both buttons
      // `<li></li><li><button id="${comment.id}">Delete Comment</button><buttonid="${comment.id}>Edit Comment</button></li>`
      //grab let box = .comment-box
      //grab box = documnet.querySelectorAll
      //unshift the created element

    } catch (err) {

    }

  })

  const addDeleteButtonListener = (button) => {

    button.addEventListener("click", async (e) => {
      console.log("inside delete event")
      // const deleteButton = document.querySelector(".delete-button");
      const commentId = e.target.id;
      const body = { commentId }

      try {
        const res = await fetch("/api/comments/delete", {

          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-type": "application/json"
          },
        });
        if (!res.ok) {
          throw res;
        }
        console.log("parent", e.target.parentNode)
        // `<li></li><li><button id="${comment.id}">Delete Comment</button><buttonid="${comment.id}>Edit Comment</button></li>`
        e.target.parentNode.remove();

      } catch (err) {

      }

    })
  }

  const deleteCommentButton = document.querySelectorAll(".delete-button");
  console.log("deleteCommentButton", deleteCommentButton);
  console.log(deleteCommentButton)
  for (let i = 0; i < deleteCommentButton.length; i++) {
    const button = deleteCommentButton[i]
    addDeleteButtonListener(button);
  }


})
  // const deleteCommentButton = document.querySelectorAll(".delete-button");
  //for edit/delete
  //queryselectorall = [button elements, ..., ...]
  //iterate over array, adding event listener to each one
  //
    // addCommentButton.addEventListener("submit", async (e) => {
      //   e.preventDefault();
      //   const fd = new FormData(addCommentButton);
      //   const content = formData.get("content")
      //   const body = { content }

      //   fetch("http:localhost8080/api/comments", {

        //     method: "POST",
        //     body: JSON.stringify({
          //       body,
          //       memeId,
          //       userId: res.locals.user.id
          //     }),
//     headers: {
  //       "Content-type": "application/json"
  //     }
  //   }).then(res.json())
  //     .then(res => {

    //       console.log('Response: ', res);
    //     })
    //     .catch(err => {
      //       console.log('Error message: ', error);
      //     });

      //   });


      // deleteCommentButton.addEventListener("submit", async (e) => {
        //   e.preventDefault();

        //   try {
          //     const res = await fetch("http://localhost:8080/api/comments/:id(\\d+)/delete", {
            //       method: "POST",
            //       body: JSON.stringify(body),
            //       headers: {
              //         "Content-Type": "application/json",
              //       },
              //     });
              //     if (!res.ok) {
                //       throw res;
                //     }
                //   }

                // });



                // addCommentButton.addEventListener("submit", async (e) => {
                  //   e.preventDefault();
    //   const fd = new FormData(myForm);
    //   const content = formData.get("content")
    //   const body = { content }
    //   try {
      //     const res = await fetch("http://localhost:8080/api/comments", {
        //       method: "POST",
        //       body: JSON.stringify(body),
        //       headers: {
          //         "Content-Type": "application/json",
          //       },
          //     });
          //     if (!res.ok) {
            //       throw res;
            //     }
            //   } catch {

              //   }

              // });
