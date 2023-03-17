$(document).ready(function () {
  if (localStorage.getItem("email")) {
  }else {
    window.location.replace("./../login.html");
  }
  
  $('<h3 class="col-6" >'+localStorage.getItem("name")+'</h3>').appendTo("#name");
  $('<h3 class="col" >'+localStorage.getItem("dob")+'</h3>').appendTo("#date");
  $('<h3 class="col" >'+localStorage.getItem("mobile")+'</h3>').appendTo("#mobile");
  $('<h3 class="col" >'+localStorage.getItem("email")+'</h3>').appendTo("#email");


  if (window.XMLHttpRequest) {
    xmlHTTP = new XMLHttpRequest();
  } else {
    xmlHTTP = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlHTTP.onreadystatechange = function () {

    if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
        var data = JSON.parse(xmlHTTP.responseText) ;
        if (data.result.linkedin) {
          $("#linkedin").val(data.result.linkedin);
        }
        if (data.result.address) {
          $("#address").val(data.result.address);
        }
        if (data.result.github) {
          $("#github").val(data.result.github);
        }
    }


  }
  
  var url = "http://localhost/guvi_task/php/gettUserDataMongo.php";
  var data =
    "email="+
    localStorage.getItem("email");

  xmlHTTP.open("POST", url, true);
  xmlHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlHTTP.send(data);



});

function logout() {
  localStorage.clear();
  window.location.replace("./../login.html");
}

$("#linkedinbtn").click(function () {
   var linkedin = $("#linkedin").val() ;
  console.log(linkedin);
   if (window.XMLHttpRequest) {
    xmlHTTP = new XMLHttpRequest();
  } else {
    xmlHTTP = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlHTTP.onreadystatechange = function () {

    if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
        console.log(xmlHTTP.responseText);
    }


  }

  var url = "http://localhost/guvi_task/php/profile.php";
  var data =
    "email="+
    localStorage.getItem("email") +
    "&linkedin=" +
    linkedin ;

  xmlHTTP.open("POST", url, true);
  xmlHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlHTTP.send(data);
});

$("#githubbtn").click(function () {
   var github = $("#github").val() ;
  console.log(github);
   if (window.XMLHttpRequest) {
    xmlHTTP = new XMLHttpRequest();
  } else {
    xmlHTTP = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlHTTP.onreadystatechange = function () {

    if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
        console.log(xmlHTTP.responseText);
    }


  }

  var url = "http://localhost/guvi_task/php/profile.php";
  var data =
    "email="+
    localStorage.getItem("email") +
    "&github=" +
    github ;

  xmlHTTP.open("POST", url, true);
  xmlHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlHTTP.send(data);
});

$("#addressbtn").click(function () {
   var address = $("#address").val() ;
  console.log(address);
   if (window.XMLHttpRequest) {
    xmlHTTP = new XMLHttpRequest();
  } else {
    xmlHTTP = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlHTTP.onreadystatechange = function () {

    if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
        console.log(xmlHTTP.responseText);
    }


  }

  var url = "http://localhost/guvi_task/php/profile.php";
  var data =
    "email="+
    localStorage.getItem("email") +
    "&address=" +
    address ;

  xmlHTTP.open("POST", url, true);
  xmlHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlHTTP.send(data);
});