

window.addEventListener("DOMContentLoaded", ()=> {

  const addCommentButton = document.querySelector(".add-button");
  const deleteCommentButton = document.querySelector(".delete-button");
  const p = document.querySelector(".hello");

  addCommentButton.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(addCommentButton);
    const content = fd.get("body");
    const userId = fd.get("userId");
    const memeId = fd.get("memeId");
    const body = { content, userId, memeId}

    try {
      const res = await fetch("http:localhost8080/api/comments", {

        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json"
        },
      });
      if (!res.ok){
        throw res;
      }
    } catch (err){

    } else {
      
    }

  })

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
