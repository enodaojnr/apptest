var progress=0;
    function openy()
	{
	//alert("where r u");
    var user = localStorage.getItem("username");
	var p = "";
    //alert("are you here"+lati+""+longi)
    $.ajax({
		   type: "POST",
		   url: "yourkudi.com/new/e.php",
			data:'name='+user+'&p='+p,
		   success: function(html){  
		   progress =1;
			// console.log('Increased by 0.1 - Is now '+progress);
			$('body').loadie(progress);
		   //getti1(html);
		   if(html == "no data")
		   {
			document.getElementById("noti").innerHTML = html;
		   }
		   else{
		   	document.getElementById("noti").innerHTML="";
               var htl = JSON.parse(html);
               for(p in htl)
                   {
                      
					document.getElementById("noti").innerHTML += htl[p];
                   }
		    }
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
