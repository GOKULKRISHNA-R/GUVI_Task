$(document).ready(function () {
  if (localStorage.getItem("email")) {
    window.location.replace("./../profile.html");
  }
});

function onSubmit() {
  if (window.XMLHttpRequest) {
    xmlHTTP = new XMLHttpRequest();
  } else {
    xmlHTTP = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlHTTP.onreadystatechange = function () {
    $(".help-block").remove();
    $(".r").removeClass("has-error");

    if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
      var rt = xmlHTTP.responseText;
      if (rt.toLowerCase().includes("duplicate")) {
        alert("Email already Exists");
      } else {
        var data = JSON.parse(rt);
        // console.log(data);
        if (!data.success) {
          if (data.errors.name) {
            var div = document.createElement("div");
            div.innerText = data.errors.name;
            div.className = "help-block";
            $("#name-grp").addClass("has-error");
            $("#name-grp").append(div);
          }

          if (data.errors.email) {
            var div = document.createElement("div");
            div.innerText = data.errors.email;
            div.className = "help-block";
            $("#email-grp").addClass("has-error");
            $("#email-grp").append(div);
          }

          if (data.errors.dob) {
            var div = document.createElement("div");
            div.innerText = data.errors.dob;
            div.className = "help-block";
            $("#dob-grp").addClass("has-error");
            $("#dob-grp").append(div);
          }

          if (data.errors.mobile) {
            var div = document.createElement("div");
            div.innerText = data.errors.mobile;
            div.className = "help-block";
            $("#mobile-grp").addClass("has-error");
            $("#mobile-grp").append(div);
          }

          if (data.errors.password) {
            var div = document.createElement("div");
            div.innerText = data.errors.password;
            div.className = "help-block";
            $("#pass-grp").addClass("has-error");
            $("#pass-grp").append(div);
          }

          if (data.errors.cPassword) {
            var div = document.createElement("div");
            div.innerText = data.errors.cPassword;
            div.className = "help-block";
            $("#cpass-grp").addClass("has-error");
            $("#cpass-grp").append(div);
          }

          if (data.errors.checkPassword) {
            var div = document.createElement("div");
            div.innerText = data.errors.checkPassword;
            div.className = "help-block";
            $("#cpass-grp").addClass("has-error");
            $("#cpass-grp").append(div);
          }

          if (data.errors.login) {
            alert(" Oops !!! " + data.errors.login);
          }
        } else {
          alert("Profile Created");
          window.location.href = "./../login.html";
        }
      }
    }
  };

  var name = document.getElementById("name").value;
  var dob = document.getElementById("dob").value;
  var mobile = document.getElementById("mobile").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("Cpassword").value;
  var currentdate = new Date();
  var datetime =
    "Created on : " +
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  var url = "http://localhost/guvi_task/php/register.php";
  var data =
    "name=" +
    name +
    "&dob=" +
    dob +
    "&mobile=" +
    mobile +
    "&email=" +
    email +
    "&password=" +
    password +
    "&cPassword=" +
    confirmPassword +
    "&time=" +
    datetime;

  xmlHTTP.open("POST", url, true);
  xmlHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlHTTP.send(data);
}
