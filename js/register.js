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
      var data = JSON.parse(xmlHTTP.responseText);
      console.log(data);
      if (!data.success) {
        if (data.errors.name) {
          $("#name-grp").addClass("has-error");
          $("#name-grp").append(
            '<div class="help-block">' + data.errors.name + "</div>"
          );
        }

        if (data.errors.email) {
          $("#email-grp").addClass("has-error");
          $("#email-grp").append(
            '<div class="help-block">' + data.errors.email + "</div>"
          );
        }

        if (data.errors.dob) {
          $("#dob-grp").addClass("has-error");
          $("#dob-grp").append(
            '<div class="help-block">' + data.errors.dob + "</div>"
          );
        }

        if (data.errors.mobile) {
          $("#mobile-grp").addClass("has-error");
          $("#mobile-grp").append(
            '<div class="help-block">' + data.errors.mobile + "</div>"
          );
        }

        if (data.errors.password) {
          $("#pass-grp").addClass("has-error");
          $("#pass-grp").append(
            '<div class="help-block">' + data.errors.password + "</div>"
          );
        }

        if (data.errors.cPassword) {
          $("#cpass-grp").addClass("has-error");
          $("#cpass-grp").append(
            '<div class="help-block">' + data.errors.cPassword + "</div>"
          );
        }

        if (data.errors.checkPassword) {
          $("#cpass-grp").addClass("has-error");
          $("#cpass-grp").append(
            '<div class="help-block">' + data.errors.checkPassword + "</div>"
          );
        }

        if (data.errors.login) {
            alert(" Oops !!! "+ data.errors.login ) ;
        }

      } else {
        alert("Profile Created");
        window.location.href = "./../login.html";
      }
    }
  };

  var name = document.getElementById("name").value;
  var dob = document.getElementById("dob").value;
  var mobile = document.getElementById("mobile").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("Cpassword").value;

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
    confirmPassword;

  xmlHTTP.open("POST", url, true);
  xmlHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlHTTP.send(data);
}
