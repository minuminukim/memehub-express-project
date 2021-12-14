const memesByComments = (a, b) => {
  if (a.comments.length < b.comments.length) {
    return 1;
  } else if (a.comments.length > b.comments.length) {
    return -1;
  }
  return 0;
};

const memesByLikes = (a, b) => {
  if (a.likes.length < b.likes.length) {
    return 1;
  } else if (a.likes.length > b.likes.length) {
    return -1;
  }
  return 0;
};

module.exports = { memesByComments, memesByLikes };
