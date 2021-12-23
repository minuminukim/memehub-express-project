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

      const commentCount = document.getElementById(`commentCount-${memeId}`);
      let count = parseInt(commentCount.innerText, 10);
      commentCount.innerText = count += 1;

      const newComment = renderNewComment(comment, User, memeId);
      const commentBox = document.getElementById(`commentBox-${memeId}`);
      commentBox.prepend(newComment);
      content.value = "";
    } catch (e) {
      console.log(e);
    }
  });
};

const addDeleteButtonListener = (button) => {
  button.addEventListener("click", async (e) => {
    const commentId = button.id.split("-")[1];
    console.log(commentId);

    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw res;
      }

      const block = document.getElementById(`commentBlock-${commentId}`);
      const memeId = block.parentNode.id.split("-")[1];

      const commentCount = document.getElementById(`commentCount-${memeId}`);
      let count = parseInt(commentCount.innerText, 10);
      commentCount.innerText = count -= 1;

      block.parentNode.removeChild(block);
    } catch (e) {
      console.log(e);
    }
  });
};

const addEditButtonListener = (button) => {
  button.addEventListener("click", (e) => {
    const commentId = button.id.split("-")[1];
    const block = document.getElementById(`commentBlock-${commentId}`);
    const memeId = block.parentNode.id.split("-")[1];

    const body = document.getElementById(`body-${commentId}`);
    const editForm = `
      <div class="comment-form" id="editForm-${memeId}">
        <div class="input-container">
          <input type="textarea" value=${body.innerText} id="editInput-${commentId}">
        </div>
        <div class="input-buttons">
          <p>Cancel</p>
          <button class="update-button" id="update-${memeId}">Update</button>
        </div>
      </div>
    `;

    block.innerHTML = editForm;
    const updateButton = document.getElementById(`update-${memeId}`);

    updateButton.addEventListener("click", async (e) => {
      const newBody = document.getElementById(`editInput-${commentId}`).value;
      console.log(newBody);

      try {
        const res = await fetch(`/api/comments/${commentId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body: newBody }),
        });

        if (!res.ok) {
          throw res;
        }

        const { comment } = await res.json();
        const { User } = comment;
        const updated = renderNewComment(comment, User, memeId);

        block.parentNode.replaceChild(updated, block);
      } catch (e) {
        console.log(e);
      }
    });
  });
};

const renderNewComment = (comment, User, memeId) => {
  const newComment = document.createElement("li");
  newComment.classList.add("comment-block");
  newComment.id = `commentBlock-${comment.id}`;

  const userSignature = document.querySelector(`.user-${User.id}`);
  console.log(userSignature);
  newComment.appendChild(userSignature);

  const commentBodyContainer = document.createElement("div");
  commentBodyContainer.classList.add("comment-body-container");

  const commentBody = document.createElement("p");
  commentBody.id = `body-${comment.id}`;
  commentBody.classList.add("comment-body");
  commentBody.innerText = comment.body;
  commentBodyContainer.appendChild(commentBody);
  newComment.appendChild(commentBodyContainer);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add(".comment-buttons");
  buttonsContainer.id = `buttons-${memeId}`;

  const editButton = document.createElement("button");
  editButton.id = `edit-${comment.id}`;
  editButton.classList.add("edit-button");
  editButton.innerText = "Edit";
  addEditButtonListener(editButton);
  buttonsContainer.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.id = `delete-${comment.id}`;
  deleteButton.classList.add("delete-button");
  deleteButton.innerText = "Delete";
  addDeleteButtonListener(deleteButton);
  buttonsContainer.appendChild(deleteButton);

  newComment.appendChild(buttonsContainer);

  const commentBox = document.getElementById(`commentBox-${memeId}`);
  commentBox.prepend(newComment);
  return newComment;
};

window.addEventListener("DOMContentLoaded", () => {
  toggleModal();

  const postButtons = document.querySelectorAll(".respond-button");
  postButtons.forEach((button) => addCommentButtonListener(button));

  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => addDeleteButtonListener(button));

  const editButtons = document.querySelectorAll(".edit-button");
  editButtons.forEach((button) => addEditButtonListener(button));
});
