const addSocialLinksToDeveloper = (developer) => {
  const username = developer.username;

  switch (username) {
    case "davidlee":
      developer.github = "https://github.com/davigravi";
      developer.linkedIn = "#";
      break;
    case "willduffy":
      developer.github = "https://github.com/w-duffy";
      developer.linkedIn = "https://www.linkedin.com/in/will-duffy-a46a7a8a/"
      break;
    case "anthonyadams":
      developer.github = "https://github.com/awadams198";
      developer.linkedIn = "https://www.linkedin.com/in/anthony-adams-a4221a228/"
      break;
    case "minukim":
      developer.github = "https://github.com/minuminukim";
      developer.linkedIn = "https://www.linkedin.com/in/minu-kim-911bbb192/"
      break;
    case "hugh_neutron":
      developer.github = "#";
      developer.linkedIn = "#";
      break;
  }

  return developer;
}

module.exports = addSocialLinksToDeveloper;
