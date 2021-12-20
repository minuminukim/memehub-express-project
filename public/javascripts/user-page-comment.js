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
                console.log("data", data)
                let newComment = data.comment;
                console.log("new comment", newComment);
                let li = document.createElement("li")

                li.setAttribute("class", "content")

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

                let grabUl = document.querySelector(`#comment-${memeId}`)

                console.log("this is grabUl", grabUl)

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

            if (e.target.innerHTML === "Edit") {

                const commentId = e.target.id;
                console.log("commentId", commentId)
                const memeId = e.target.name;
                const body = { commentId, memeId }

                e.target.innerHTML = "Save";
                console.log("step 1")
                try {
                    const res = await fetch("/api/comments/edit", {

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
                    console.log("data", data)

                    let input = document.createElement("input");
                    input.setAttribute("type", "textarea")
                    input.setAttribute("id", `${commentId}`)
                    let previousContent = e.target.parentNode.innerHTML;
                    let regex = /\s\w+/
                    let regexPlaceholder = previousContent.match(regex)
                    let placeholder = regexPlaceholder[0];
                    input.setAttribute("placeholder", placeholder)

                    let grabUl = document.querySelector(`#comment-${memeId}`)
                    console.log("this is grabUl", grabUl)

                    let ulChildren = Array.from(grabUl.children).slice();
                    console.log("ulChildren", ulChildren)
                    let liThatWillBeEdited = document.getElementById(`comment-${commentId}`)
                    console.log("testingLi", liThatWillBeEdited)
                    liThatWillBeEdited.innerHTML = "";
                    liThatWillBeEdited.appendChild(input);


                    let saveButton = document.createElement("button");
                    // addSaveButtonListener(saveButton);
                    saveButton.setAttribute("id", `${commentId}`);
                    console.log("checkpoint")
                    saveButton.setAttribute("class", "save-button");
                    saveButton.innerHTML = "Save";

                    liThatWillBeEdited.appendChild(saveButton);






                    // e.target.parentNode.remove();




                    // let saveButton = document.createElement("button");
                    // addSaveButtonListener(saveButton);



                } catch (err) {

                }
                // let editableLi = document.getElementById(`like-${commentId}`)
                // console.log("editableLi", editableLi)
                // let input = document.createElement("input")
                // input.setAttribute("type", "textarea")
                // input.setAttribute("id", `${commentId}`)
                // let previousContent = e.target.parentNode.innerHTML;
                // let regex = /\w+.\s\w+/
                // let regexPlaceholder = previousContent.match(regex)
                // let placeholder = regexPlaceholder[0];
                // input.setAttribute("placeholder", placeholder)
                // editableLi.innerHTMl = input;
                // console.log("editableLI",editableLi)


                // console.log("hey im back")
                // let data = await res.json();
                // console.log("data", data)
                // let newComment = data.comment;
                // console.log("new comment", newComment);
                // let li = document.createElement("li")



                // let grabComment = document.getElementById(`${commentId}`)
                // let parent = grabComment.parent;
                // console.log("parent", parent)





                //to create li

                // let innerLi = `${comment.dataValues.User.username} : ${comment.dataValues.body}`

                // console.log("input", innerLi)

                // let innerLi = "hello"
                // li.innerHTML = innerLi;
                // let deleteButton = document.createElement("button");
                // addDeleteButtonListener(deleteButton);
                // let editButton = document.createElement("button");








            } else if (e.target.innerHTML === "Save") {
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
