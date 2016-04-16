function signup()
{
    
    var full = $("#funame").val();
    var address = $("#address").val();
    var prof = $("#prof").val();
    var email = $("#email").val();
    var pass = $("#password");
    
    if( full != "" && address != "" && prof != '' && pass != "")
        {
            
    var dataString = 'full='+ full + '&address=' + address + '&email=' + email + '&prof=' + prof + '&pass=' + pass +'&page=signup';
		$.ajax({
			type: "POST",
			url: "http://yourkudi.com/new/save_details.php",
			data: dataString,
			cache: false,
			beforeSend: function()
			{
                
				$("#signup_status").html('<center>Processing, please wait...</center>');
			},
			success: function(response)
			{
			alert('in');
				$("#signup_status").html(response);
			}
		});
        }
    
	}
function signin()
{
    var email = $("#email").val();
    var pass = $("#password");
    
    if( email != "" && pass != "")
        {
    var dataString = 'email=' + email + '&pass=' + pass +'&page=index';
		$.ajax({
			type: "POST",
			url: "http://yourkudi.com/new/login.php",
			data: dataString,
			cache: false,
			beforeSend: function()
			{
                
				$("#signup_status").html('<center>Processing, please wait...</center>');
			},
			success: function(response)
			{
			alert('in');
				$("#signup_status").html(response);
			}
		});
        }
}
