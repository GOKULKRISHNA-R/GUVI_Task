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
        if (data.length > 0) {
          if (data.errors.email) {
            $("#email-grp").addClass("has-error");
            $("#email-grp").append(
              '<div class="help-block">' + data.errors.email + "</div>"
            );
          }
          if (data.errors.password) {
            $("#pass-grp").addClass("has-error");
            $("#pass-grp").append(
              '<div class="help-block">' + data.errors.password + "</div>"
            );
          }
        } else {
          alert(" Oops !!! Login Failed");
        }
      } else {
        if (!data.response) {
          alert(" Oops !!! Login Failed");
        } else {
          localStorage.setItem("name", data.response.name);
          localStorage.setItem("email", data.response.email);
          localStorage.setItem("dob", data.response.dob);
          localStorage.setItem("mobile", data.response.mobile);

          window.location.replace("./../profile.html");
        }
      }
    }
  };

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var url = "http://localhost/guvi_task/php/login.php";
  var data = "email=" + email + "&password=" + password;

  xmlHTTP.open("POST", url, true);
  xmlHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlHTTP.send(data);
}
