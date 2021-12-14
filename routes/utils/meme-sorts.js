const memesByComments = (a, b) => {
  if (a.Comments.length < b.Comments.length) {
    return 1;
  } else if (a.Comments.length > b.Comments.length) {
    return -1;
  }
  return 0;
};

const memesByLikes = (a, b) => {
  if (a.Likes.length < b.Likes.length) {
    return 1;
  } else if (a.Likes.length > b.Likes.length) {
    return -1;
  }
  return 0;
};

module.exports = { memesByComments, memesByLikes };
