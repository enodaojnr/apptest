$(document).ready(function (e) {
$("#uploadimage").on('submit',(function(e) {
e.preventDefault();
$.ajax({
url: "yourkudi.com/new/upload.php", // Url to which the request is send
type: "POST",
crossDomain:true,             // Type of request to be send, called as method
data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
contentType:"application/json",       // The content type used when sending data to the server.
cache: false,             // To unable request pages to be cached
processData:false,        // To send DOMDocument or non processed data file it is set to false
success: function(data)   // A function to be called if request succeeds
{
$('#loading').hide();
$("#message").html(data);
}
});
}));

// Function to preview image after validation
$(function() {
$("#file").change(function() {
//$("#message").empty(); // To remove the previous error message
var file = this.files[0];
var imagefile = file.type;
var match= ["image/jpeg","image/png","image/jpg"];
if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2])))
{
$('#previewing').attr('src','noimage.png');
$("#message").html("<p id='error'>Please Select A valid Image File</p>"+"<h4>Note</h4>"+"<span id='error_message'>Only jpeg, jpg and png Images type allowed</span>");
return false;
}
else
{
var reader = new FileReader();
reader.onload = imageIsLoaded;
reader.readAsDataURL(this.files[0]);
}
});
});
});
function post()
{
//alert("wat z wrng wit u")
 var username=localStorage.getItem("username");
		  var password=localStorage.getItem("password");
		  $.ajax({
		   type: "POST",
		   url: "yourkudi.com/new/post.php",
			data:'name='+username+'&pwd='+password,
		   success: function(html){  
		   //getti1(html);
               var htl2 = JSON.parse(html);
                //alert(Object.keys(html2.post[i]).length);
               
               var i = 0, key;
               for (key in htl2) {
               if (htl2.hasOwnProperty(key)){
               i++;
            }
           }
    //alert(i);
               var pstname = "post"+i;
               //alert(htl2.post2);//htl2.post2
               for(p in htl2)
                   {
                       //alert(htl2[p]);
                   document.getElementById("status").innerHTML += htl2[p];
                   }
		   //alert(htl2.length);
		   },
		   beforeSend:function()
		   {
			alert("going"+username);
		   }
		  });
}
function call(usnm,area,prof)
{

//alert(usnm);
 var username=localStorage.getItem("username");
		  var userprof= usnm;
		  $.ajax({
		   type: "POST",
		   url: "yourkudi.com/new/calling.php",
			data:'name='+username+'&area='+area+'&prof='+prof+'&userprof='+userprof,
		   success: function(html){  
		   //getti1(html);
               if(html == "success")
			   {
				window.location = "welcome.html";
			   }
		   },
		   beforeSend:function()
		   {
			//alert("going"+username);
		   }
		  });
}
function send()
{
    //alert("wat z wrng wit u")
 var username=$("#email").val();
		  var password=$("#password").val();
		  $.ajax({
		   type: "POST",
		   url: "yourkudi.com/new/login1.php",
		   crossDomain:true,
			data:'name='+username+'&pwd='+password,
			ContentType:"application/json",
		   success: function(html){ 
		   	//alert(html);
			localStorage.setItem("username",username);
			localStorage.setItem("password",password);
		   getti1(html);
		   },
		   beforeSend:function()
		   {
		//alert("going"+username);
		   },
		   error:function(res,txt,noti)
		   {
		   	//var datax = eval("("+res.responseText+")");
		   	alert(res.responseText);
		   }
		  });
}

function getti1(dis)
{
//alert("in1234");
			if(dis == "success"){
			 //$("#add_err").html("right username or password");
			 window.location="welcome.html";
			 
			}
			else{
			alert("note : "+dis);
			}
}
function logout()
{
	localStorage.setItem("username",null);
	localStorage.setItem("password",null);
	window.location ="index.html";
}

