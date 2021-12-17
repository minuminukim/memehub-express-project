
/*
-grab button thats submits action
-add event listener to that button
    -grab element that holds content
    -get memeId from button that was clicked (e.target.id)
    -send content to backend via fetch
        -send content with memeid and content via fetch
*/

window.addEventListener("DOMContentLoaded", ()=> {

  const addCommentButton = document.querySelector(".add-button");
  console.log("addCommentButton", addCommentButton);
  addCommentButton.addEventListener("click", async (e) => {

      const content = document.querySelector(".content");
      let memeId = e.target.id;
      let contentValue = content.value


      const body = { contentValue, memeId}
      console.log("contentValue", contentValue )

      try {
        const res = await fetch("/api/comments", {

          method: "POST",
          body: JSON.stringify({...body}),
          headers: {
            "Content-type": "application/json"
          },
        });
        if (!res.ok){
          throw res;
        }
        // `<li></li><li><button id="${comment.id}">Delete Comment</button><buttonid="${comment.id}>Edit Comment</button></li>`


      } catch (err){

      }

    })

  const deleteCommentButton = document.querySelectorAll(".delete-button");
  console.log("deleteCommentButton", deleteCommentButton);
  console.log(deleteCommentButton)
  for(let i = 0; i < deleteCommentButton.length-1; i++){
    deleteCommentButton[i].addEventListener("click", async (e)=>{
      console.log("inside delete event")
      // const deleteButton = document.querySelector(".delete-button");
      const commentId = e.target.id;
      const body = {commentId}

      try {
        const res = await fetch("api/comments/:id(\\d+)/delete", {

          method: "POST",
          body: JSON.stringify({body}),
          headers: {
            "Content-type": "application/json"
          },
        });
        if (!res.ok){
          throw res;
        }
        // `<li></li><li><button id="${comment.id}">Delete Comment</button><buttonid="${comment.id}>Edit Comment</button></li>`


      } catch (err){

      }

    })


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
