<?php
header('Access-Control-Allow-Origin:*');
session_start();
$email1 = $_POST['searchstrin'];
//$fn = "";
$email = preg_replace('#[^A-Za-z@.]#', '',$email1);
//echo $email;
if(empty($email))
{
echo "no data";
exit();
}

            $searchstring = $_POST["searchstrin"];
            $latitude = $_POST["lati"];
            $forad = $_POST["forad"];
            $longitude = $_POST["longi"];
 // Build the spherical geometry SQL string
            $earthRadius = '3963.0'; // In miles
 
            $sql = "
                SELECT * , (
(
(
acos( sin( (
:lati * pi( ) /180 ) ) * sin( (
`lati` * pi( ) /180 )
) + cos( (
:lati * pi( ) /180 )
) * cos( (
`lati` * pi( ) /180 )
) * cos( (
(
:longi - `longi`
) * pi( ) /180 )
)
)
) *180 / pi( )
) *60 * 1.1515
) AS distance
FROM `user_tab1`
where profession = :prof
order by distance asc
LIMIT 0 , 30";
 try{
            // Search the database for the nearest agents
            $pdo = new PDO('mysql:host=localhost;dbname=handy','admin1','admin1');
        $stmt = $pdo->prepare($sql);

    $stmt->bindParam(':lati', $latitude, PDO::PARAM_STR);
$stmt->bindParam(':prof', $searchstring, PDO::PARAM_STR);
$stmt->bindParam(':longi', $longitude, PDO::PARAM_STR);
    $isQueryOk = $stmt->execute();
//echo "y";
    if ($isQueryOk = true) {   
	$count = $stmt->rowCount();
	$county = 0;
           
        if($count > 0)
        {
            
            while($result = $stmt->fetch(PDO::FETCH_NUM, PDO::FETCH_ORI_NEXT)) {
                $county++;
                $miles = $result[0];
                $fname = $result[1];
                $lname = $result[2];
                $address = $result[3];
                $profession = $result[4];
                $email = $result[5];
                $lati = $result[6];
                $longi = $result[7];
                $fn["search".$county] = '<article class="search-result row"><div class="col-xs-12 col-sm-12 col-md-3"><a href="#" title="Lorem ipsum" class="thumbnail"><img src="http://lorempixel.com/250/140/people" alt="Lorem ipsum" /></a></div><div class="col-xs-12 col-sm-12 col-md-2"><ul class="meta-search"><li><i class="glyphicon glyphicon-calendar"></i> <span>'.$miles.'</span></li><li><i class="glyphicon glyphicon-time"></i> <span>'.$address.'</span></li><li><i class="glyphicon glyphicon-tags"></i> <span>'.$profession.'</span></li></ul></div><div class="col-xs-12 col-sm-12 col-md-7 excerpet"><h3><a href="userprofile.html?user='.$email.'" title="">'.$email.'</a></h3><p>'.$fname."-".$lname.'</p></div><span class="clearfix borda"></span></article>';
            }
            //echo $count;
			print_r(json_encode($fn,JSON_PRETTY_PRINT));
        }
        else
        {
          echo json_encode('noting');  
        }
    } 
} catch(PDOException $e) {
    trigger_error('Error occured while trying to select users in DB:' . $e->getMessage(), E_USER_ERROR);
}
?>