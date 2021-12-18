window.addEventListener("DOMContentLoaded", () => {

    const addCommentButtonListener = (button) => {
        button.addEventListener("click", async (e) => {
            const content = document.querySelector(".content");
            console.log("content", content)
            let memeId = e.target.id;
            let contentValue = content.value;
            console.log("contentvalue", contentValue)

            const body = { contentValue, memeId };


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
                let innerLi = `${newComment.dataValues.User.username} : ${newComment.dataValues.body}`
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


              } catch (err) {

              }




        })
    }



    const addCommentButtons = document.querySelectorAll(".add-button");
    for(let i = 0; i < addCommentButtons.length; i++){
        const button = addCommentButtons[i];
        addCommentButtonListener(button);
    }



  })
