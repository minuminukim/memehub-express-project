const toggleModal = () => {
  const buttons = document.querySelectorAll(".commentButton");
  for (const button of buttons) {
    button.addEventListener("click", (e) => {
      const memeId = button.id.split("-")[1];
      const modal = document.getElementById(`modal-${memeId}`);
      if (modal.classList.contains("modal-hidden")) {
        modal.classList.remove("modal-hidden");
      } else {
        modal.classList.add("modal-hidden");
      }
    });
  }

  const toggles = document.querySelectorAll(".modal-close");
  for (const toggle of toggles) {
    toggle.addEventListener("click", (e) => {
      const memeId = toggle.id.split("-")[1];
      const modal = document.getElementById(`modal-${memeId}`);
      modal.classList.add("modal-hidden");
    });
  }
};

const addCommentButtonListener = (button) => {
  button.addEventListener("click", async (e) => {
    const memeId = e.target.id.split("-")[1];
    const content = document.getElementById(`content-${memeId}`);
    const contentValue = content.value;

    const body = { contentValue, memeId };

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw res;
      }

      const data = await res.json();
      const { comment } = data;
      const { User } = comment;

      const newComment = document.createElement("li");
      newComment.classList.add("comment-block");
      newComment.id = `commentBlock-${comment.id}`;

      const userSignature = document.querySelector(`.user-${User.id}`);
      newComment.appendChild(userSignature);

      const commentBodyContainer = document.createElement("div");
      commentBodyContainer.classList.add("comment-body-container");

      const commentBody = document.createElement("p");
      commentBody.classList.add("comment-body");
      commentBody.innerText = comment.body;
      commentBodyContainer.appendChild(commentBody);
      newComment.appendChild(commentBodyContainer);

      const buttonsContainer = document.createElement("div");
      buttonsContainer.classList.add(".comment-buttons");

      const editButton = document.createElement("button");
      editButton.id = `edit-${comment.id}`;
      editButton.classList.add("edit-button");
      editButton.innerText = "Edit";
      buttonsContainer.appendChild(editButton);

      const deleteButton = document.createElement("button");
      deleteButton.id = `delete-${comment.id}`;
      deleteButton.classList.add("delete-button");
      deleteButton.innerText = "Delete";
      buttonsContainer.appendChild(deleteButton);

      newComment.appendChild(buttonsContainer);

      const commentBox = document.getElementById(`commentBox-${memeId}`);
      console.log(commentBox);
      commentBox.prepend(newComment);
    } catch (e) {
      console.log(e);
    }
  });
};

window.addEventListener("DOMContentLoaded", () => {
  toggleModal();

  const postButtons = document.querySelectorAll(".respond-button");
  postButtons.forEach((button) => addCommentButtonListener(button));
});
