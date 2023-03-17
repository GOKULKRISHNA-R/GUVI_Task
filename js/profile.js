$(document).ready(function () {
  if (localStorage.getItem("email")) {
  }else {
    window.location.replace("./../login.html");
  }
  
  $('<h3>'+localStorage.getItem("name")+'</h3>').appendTo("#name");
  $('<h3>'+localStorage.getItem("dob")+'</h3>').appendTo("#date");
  $('<h3>'+localStorage.getItem("mobile")+'</h3>').appendTo("#mobile");
  $('<h3>'+localStorage.getItem("email")+'</h3>').appendTo("#email");
});

function logout() {
  localStorage.clear();
  window.location.replace("./../login.html");
}
