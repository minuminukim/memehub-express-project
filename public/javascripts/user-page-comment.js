window.addEventListener("DOMContentLoaded", () => {

    const addCommentButtonListener = (button) => {
        button.addEventListener("click", async (e) => {
            let memeId = e.target.id;
            console.log("memeId", memeId)
            let content = document.getElementById(`${memeId}`);
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
                let innerLi = `${newComment.User.username} : ${newComment.body}`
                console.log("innerLi", innerLi)

                li.innerHTML = innerLi;
                let deleteButton = document.createElement("button");
                addDeleteButtonListener(deleteButton);
                let editButton = document.createElement("button");
                addEditButtonListener(editButton);

                deleteButton.setAttribute("id", `${newComment.id}`);
                deleteButton.setAttribute("class", "delete-button");
                deleteButton.innerHTML = "Delete";


                editButton.setAttribute("id", `${newComment.id}`);
                editButton.setAttribute("class", "edit-button");
                editButton.innerHTML = "Edit";

                li.appendChild(deleteButton);
                li.appendChild(editButton);

                let grabUl = document.querySelector(`#like-${memeId}`)

                // console.log("this is grabUl", grabUl)

                let ulChildren = Array.from(grabUl.children).slice();


                grabUl.innerHTML = "";
                grabUl.appendChild(li);



                Array.from(ulChildren).forEach(child => grabUl.appendChild(child))



            } catch (err) {

            }




        })

    }



    const addCommentButtons = document.querySelectorAll(".add-button");
    for (let i = 0; i < addCommentButtons.length; i++) {
        let button = addCommentButtons[i];
        addCommentButtonListener(button);
    }


    const addDeleteButtonListener = (button) => {

        button.addEventListener("click", async (e) => {
            console.log("inside delete event")

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

                e.target.parentNode.remove();

            } catch (err) {

            }

        })
    }


    const deleteCommentButtons = document.querySelectorAll(".delete-button");

    for (let i = 0; i < deleteCommentButtons.length; i++) {
        const button = deleteCommentButtons[i]
        addDeleteButtonListener(button);
    }


    // const addCommentButtons = document.querySelectorAll(".add-button");
    // for (let i = 0; i < addCommentButtons.length; i++) {
    //     let button = addCommentButtons[i];
    //     addCommentButtonListener(button);
    // }


    const addEditButtonListener = (button) => {

        button.addEventListener("click", async (e) => {

            if (e.target.innerHTML === "Edit"){

                e.target.innerHTML = "Save";
                let memeId = e.target.id;

                let input = document.createElement("input")
                input.setAttribute("type", "textarea")
                input.setAttribute("id", `${memeId}`)
                let previousContent = e.target.parentNode.innerHTML;
                let regex = /\w+.\s\w+/
                let regexPlaceHolder = previousContent.match(regex)
                let placeholder = regexPlaceHolder[0];
                input.setAttribute("placeholder", placeholder)
                console.log("input", input)


                
                console.log("input", input)
                let innerLi = "hello"
                li.innerHTML = innerLi;
                let deleteButton = document.createElement("button");
                addDeleteButtonListener(deleteButton);
                // let editButton = document.createElement("button");
            }else if (e.target.innerHTML === "Save"){
                console.log("here")
                e.target.innerHTML = "Edit";




            }




        })
    }

const editCommentButtons = document.querySelectorAll(".edit-button");
    for (let i = 0; i < editCommentButtons.length; i++) {
        let button = editCommentButtons[i];
        addEditButtonListener(button);
    }









})
