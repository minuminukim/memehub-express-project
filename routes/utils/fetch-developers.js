const { User } = require("../../db/models");

const fetchDevelopers = async (currentUserId) => {
  const devsAndFollowers = await User.findAll({
    where: {
      username: ["davidlee", "willduffy", "anthonyadams", "minukim"],
    },
    include: [{ model: User, as: "followers" }],
  });

  const developers = devsAndFollowers.map((dev) => {
    dev.isFollowing = false;
    dev.followId = 0;
    dev.fullName = `${dev.firstName} ${dev.lastName}`;

    for (const follower of dev.followers) {
      if (follower.id == currentUserId) {
        dev.isFollowing = true;
        dev.followId = follower.Follow.id;
        break;
      }
    }

    return dev;
  });

  return developers;
};

module.exports = fetchDevelopers;
