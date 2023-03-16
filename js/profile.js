$(document).ready(function () {
  if (localStorage.getItem("email")) {
  }else {
    window.location.replace("./../login.html");
  }
  
  $("#name").val(localStorage.getItem("name"));
  $("#date").val(localStorage.getItem("dob"));
  $("#mobile").val(localStorage.getItem("mobile"));
  $("#email").val(localStorage.getItem("email"));
});

function logout() {
  localStorage.clear();
  window.location.replace("./../login.html");
}
