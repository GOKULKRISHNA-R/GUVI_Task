$(document).ready(function () {
  $("#name").val(localStorage.getItem("name"));
  $("#date").val(localStorage.getItem("dob"));
  $("#mobile").val(localStorage.getItem("mobile"));
  $("#email").val(localStorage.getItem("email"));
});
