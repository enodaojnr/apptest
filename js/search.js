var progress=0;
function search()
{
    //alert("hope you are gud");
    var longi,lati,forad;
    function displayLocation(latitude,longitude){
        var request = new XMLHttpRequest();

        var method = 'GET';
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function(){
          if(request.readyState == 4 && request.status == 200){
            var data = JSON.parse(request.responseText);
            var address = data.results[0];
              //document.write(latitude+"   "+longitude);
            //document.write(address.formatted_address);
              longi = longitude;
              lati = latitude;
              forad = address.formatted_address;
              getsearch(longi,lati,forad);
          }
        };
        request.send();
      };

      var successCallback = function(position){
        var x = position.coords.latitude;
        var y = position.coords.longitude;
        displayLocation(x,y);
      };

      var errorCallback = function(error){
        var errorMessage = 'Unknown error';
        switch(error.code) {
          case 1:
            errorMessage = 'Permission denied';
            break;
          case 2:
            errorMessage = 'Position unavailable';
            break;
          case 3:
            errorMessage = 'Timeout';
            break;
        }
        //document.write(errorMessage);
      };

      var options = {
        enableHighAccuracy: true,
        timeout: 31000,
        maximumAge: 90000
      };

      navigator.geolocation.getCurrentPosition(successCallback,errorCallback,options);
    
}
function getsearch(lati,longi,forad)
{
    //alert("where r u");
    var searchstrin = $("#search").val();
    //alert("are you here"+lati+""+longi)
    $.ajax({
		   type: "POST",
		   url: "http://handyserver.cloudapp.net/new/search.php",
			data:'searchstrin='+searchstrin+'&lati='+lati+'&longi='+longi+'&forad='+forad,
		   success: function(html){  
		   //getti1(html);
		   alert("hi");
		progress =1;
			// console.log('Increased by 0.1 - Is now '+progress);
			$('body').loadie(progress);
       $("#searchtxt").html(searchstrin);
               var htl = JSON.parse(html);
               document.getElementById("searchrep").innerHTML="";
               document.getElementById("sname").innerHTML=searchstrin;
               var num = 0;
               for(p in htl)
                   {
                       //alert($("#searchtxt").html());
                        num++;       
					             document.getElementById("searchrep").innerHTML += htl[p];
                   }
                   document.getElementById("resultsnum").innerHTML=num;
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
    //alert("or here");
}
