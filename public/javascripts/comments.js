import {
  handleErrors,
  handleCommentError,
  isResponseOk,
} from "./error-handlers.js";

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
    const field = document.getElementById(`content-${memeId}`);
    const content = field.value ? field.value : "";

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: content, memeId }),
      });

      if (!res.ok) {
        throw res;
      }

      const data = await res.json();
      const { comment } = data;

      const commentCount = document.getElementById(`commentCount-${memeId}`);
      let count = parseInt(commentCount.innerText, 10);
      commentCount.innerText = count += 1;

      const newComment = renderNewComment(comment, memeId);
      const userSignature = document
        .querySelector(`.user-${comment.userId}`)
        .cloneNode(true);
      newComment.prepend(userSignature);
      const commentBox = document.getElementById(`commentBox-${memeId}`);
      commentBox.prepend(newComment);

      field.value = "";
      field.setAttribute("placeholder", "What are your thoughts?");
      field.classList.remove("comment-error");
      return comment;
    } catch (e) {
      handleCommentError(e);
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

      if (!isResponseOk(res)) return;

      const block = document.getElementById(`commentBlock-${commentId}`);
      const memeId = block.parentNode.id.split("-")[1];

      const commentCount = document.getElementById(`commentCount-${memeId}`);
      let count = parseInt(commentCount.innerText, 10);
      commentCount.innerText = count -= 1;

      block.parentNode.removeChild(block);
      return res;
    } catch (e) {
      handleErrors(e);
    }
  });
};

const addEditButtonListener = (button) => {
  button.addEventListener("click", (e) => {
    const commentId = button.id.split("-")[1];
    const oldComment = document.getElementById(`commentBlock-${commentId}`);
    const memeId = oldComment.parentNode.id.split("-")[1];
    const body = document.getElementById(`body-${commentId}`);

    const editForm = `
      <div class="edit-form" id="editForm-${memeId}">
        <div class="input-container">
          <textarea class="edit-content" id="editInput-${commentId}">${body.innerText}</textarea>
        </div>
        <div class="input-buttons">
          <button class="update-button" id="update-${memeId}">Update</button>
        </div>
      </div>
    `;

    oldComment.innerHTML = editForm;
    const updateButton = document.getElementById(`update-${memeId}`);
    updateButton.addEventListener("click", async (e) => {
      const newBody = document.getElementById(`editInput-${commentId}`).value;

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
        const updated = renderNewComment(comment, memeId);

        const userSignature = document
          .querySelector(`.user-${comment.userId}`)
          .cloneNode(true);

        updated.prepend(userSignature);
        oldComment.parentNode.replaceChild(updated, oldComment);

        return comment;
      } catch (err) {
        handleCommentError(err);
      }
    });
  });
};

const renderNewComment = (comment, memeId) => {
  const newComment = document.createElement("li");
  newComment.classList.add("comment-block");
  newComment.id = `commentBlock-${comment.id}`;

  const commentBodyContainer = document.createElement("div");
  commentBodyContainer.classList.add("comment-body-container");

  const commentBody = document.createElement("p");
  commentBody.id = `body-${comment.id}`;
  commentBody.classList.add("comment-body");
  commentBody.innerText = comment.body;
  commentBodyContainer.appendChild(commentBody);
  newComment.appendChild(commentBodyContainer);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("comment-buttons");
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

  return newComment;
};

const toggleCommentBubble = (button) => {
  const memeId = button.id.split("-")[1];
  const bubble = document.getElementById(`commentBubble-${memeId}`);

  button.addEventListener("mouseover", (e) => {
    bubble.classList.remove("hidden");
  });

  button.addEventListener("mouseout", (e) => {
    bubble.classList.add("hidden");
  });
};

window.addEventListener("DOMContentLoaded", () => {
  toggleModal();

  const commentButtons = document.querySelectorAll(".commentButton");
  commentButtons.forEach((button) => toggleCommentBubble(button));

  const postButtons = document.querySelectorAll(".respond-button");
  postButtons.forEach((button) => addCommentButtonListener(button));

  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => addDeleteButtonListener(button));

  const editButtons = document.querySelectorAll(".edit-button");
  editButtons.forEach((button) => addEditButtonListener(button));
});
