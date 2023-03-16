$(document).ready(function () {
  if (localStorage.getItem("email")) {
    window.location.replace("./../profile.html");
  } else {
    window.location.replace("./../login.html");
  }
});
