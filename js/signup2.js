$('#datetimepicker').data("DateTimePicker").FUNCTION();
$(function () {
    $('#datepicker1').datepicker();
});
var latitude = 0.0;
var longitude = 0.0; 
function getLocation()
{
	var area = $("#userarea").val();
var geocoder = new google.maps.Geocoder();
var address = area+", lagos ng";
geocoder.geocode( { 'address': address}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
    latitude = results[0].geometry.location.lat();
	longitude = results[0].geometry.location.lng();
    //alert(latitude+"   "+longitude);
    signup();
    } 
}); 
}
var progress=0;
function signup()
{
	//getLocation();
var fname = $("#firstname").val();
var lname = $("#lastname").val();
var job = $("#user").val();
var area = $("#userarea").val();

var gender = $("#gender").val();
var username=$("#email").val();
var passwd = $("#password").val();

var lati = latitude;
var longi = longitude;
//alert(lati+'qqqq'+longi);

$.ajax({
		   type: "POST",
		   url: "http://handyserver.cloudapp.net/new/signup.php",
			data:'ftname='+fname+'&ltname='+lname+'&jtob='+job+'&atrea='+area+'&gtender='+gender+'&utsername='+username+'&ptass='+passwd+'&lati='+lati+'&longi='+longi,
		   success: function(html){  
		   getti(html);
		   },
		   beforeSend:function()
		   {
			//alert("going"+username);
		   }
		  });
		  
}

function getti(dis)
{
//alert("in123");
			if(dis == "success"){
			 //$("#add_err").html("right username or password");
			 //window.location="dashboard.php";
	 //alert("in");
			 window.location="index.html";
			}
			else{
		alert("inote"+dis);
			}
}

function savedetails()
{
var fname = $("#firstname").val();
var lname = $("#lastname").val();
var job = $("#user").val();
var area = $("#userarea").val();
var gender = $("#gender").val();
var username=$("#email").val();
var passwd = $("#password").val();
		  //alert(fname+''+lname+""+job+""+area+""+gender+""+username);
		  $.ajax({
		   type: "POST",
		   url: "http://handyserver.cloudapp.net/new/savedetails.php",
			data:'ftname='+fname+'&ltname='+lname+'&jtob='+job+'&atrea='+area+'&gtender='+gender+'&utsername='+username+'&ptass='+passwd,
		   success: function(html){  
		   ge(html);
		   },
		   beforeSend:function()
		   {
			$('body').loadie();

    		progress = 0.2
		setTimeout(function() {
			$('body').loadie(progress);
		}, 300);

		//$('#start-loadie').bind('click', function() {
			if(progress >= 0.9) {
				$('.loadie').fadeIn();
			}
			progress = 0
			$('body').loadie(progress);
			setTimeout(function() {
				progress = 0.1;
				$('body').loadie(progress);
				// console.log('Restarted -'+progress);
			}, 600)
		//$('#progress-loadie').bind('click', function() {
			progress += 0.13;
			// console.log('Increased by 0.1 - Is now '+progress);
			$('body').loadie(progress);
		//});
		   }
		  });
}

function ge(dis)
{
//alert("in123");
			if(dis == "success"){
			 //$("#add_err").html("right username or password");
			 progress = 1;
			$('body').loadie(progress);

	//		 alert("in");
			 window.location="welcome.html";
			}
			else{
			alert("note"+dis);
			}
}

function passwordsave()
{
var password = $("#password").val();
var passwd = $("#password").val();
var username = localStorage.getItem("username");
if(password == passwd)
{
		  //alert(fname+''+lname+""+job+""+area+""+gender+""+username);
		  $.ajax({
		   type: "POST",
		   url: "http://handyserver.cloudapp.net/new/passwordsave.php",
			data:'username='+username+'&password='+password,
		   success: function(html){  
		   ge(html);
		   },
		   beforeSend:function()
		   {
			$('body').loadie();

    		progress = 0.2
		setTimeout(function() {
			$('body').loadie(progress);
		}, 300);

		//$('#start-loadie').bind('click', function() {
			if(progress >= 0.9) {
				$('.loadie').fadeIn();
			}
			progress = 0
			$('body').loadie(progress);
			setTimeout(function() {
				progress = 0.1;
				$('body').loadie(progress);
				// console.log('Restarted -'+progress);
			}, 600)
		//$('#progress-loadie').bind('click', function() {
			progress += 0.13;
			// console.log('Increased by 0.1 - Is now '+progress);
			$('body').loadie(progress);
		//});
		   }
		  });
}
}

function ge(dis)
{
//alert("in123");
			if(dis == "success"){
			 //$("#add_err").html("right username or password");
			 progress = 1;
			$('body').loadie(progress);

	//		 alert("in");
			 window.location="myprofile.html";
			}
			else{
			alert("note"+dis);
			}
}

