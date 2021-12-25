const editDeleteModal = document.querySelector(".modal-edit-delete");
const popUp = document.querySelector(".trigger");
const closeEditDeleteModal = document.querySelector(".close-modal-button");

function showEditDeleteModal() {
  editDeleteModal.classList.toggle("show-edit-delete");
}

function windowOnClick(event) {
    if (event.target === editDeleteModal) {
      showEditDeleteModal();
    }
}

popUp.addEventListener("click", showEditDeleteModal);
closeEditDeleteModal.addEventListener("click", showEditDeleteModal);
window.addEventListener("click", windowOnClick);
