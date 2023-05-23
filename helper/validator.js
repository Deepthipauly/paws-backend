module.exports.isUsername = (username) => {
  const usernameFormat = /^[a-zA-Z0-9_-]{3,16}$/;

  if (username !== "" && username.match(usernameFormat)) {
    return true;
  }
  return false;
};

// Usernames can consist of lowercase letters (a-z), uppercase letters (A-Z), numbers (0-9), underscores (_), and hyphens (-).
// Usernames must be between 3 and 16 characters in length.