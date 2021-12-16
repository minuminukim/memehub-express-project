const addCommentButton = document.querySelector(".add-button");
const contentField = document.querySelector("content-field")
const deleteCommentButton = document.querySelector(".delete-button");

addCommentButton.addEventListener("submit", async (e)=> {
    e.preventDefault();
    const fd = new FormData(myForm);
    const content = formData.get("content")
    const body = {content}
    try {
      const res = await fetch("http://localhost:8080/api/comments", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw res;
      }
    }

});


deleteCommentButton.addEventListener("submit", async (e)=> {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:8080/api/comments/:id(\\d+)/delete", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw res;
    }
  }
  
});
