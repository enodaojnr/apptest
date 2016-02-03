<?php
header('Access-Control-Allow-Origin:*');
//echo "im here";
session_start();
$email1 = $_POST['name'];
//$fn = "";
$email = preg_replace('#[^A-Za-z@.]#', '',$email1);
//echo $email;
if(empty($email))
{
echo "no data";
exit();
}
$sql = "select * from request where user = :user or userprof = :userprof";
 try{
        $pdo = new PDO('mysql:host=localhost;dbname=handy','admin1','admin1');
        $stmt = $pdo->prepare($sql);

    $stmt->bindParam(':user', $email, PDO::PARAM_STR);
    $stmt->bindParam(':userprof', $email, PDO::PARAM_STR);
    $isQueryOk = $stmt->execute();
//echo "y";
    if ($isQueryOk = true) {   
	$count = $stmt->rowCount();
	$county = 0;
           
        if($count > 0)
        {
            
            while($result = $stmt->fetch(PDO::FETCH_NUM, PDO::FETCH_ORI_NEXT)) {
                $county++;
				$id = $result[0];
                $user = $result[1];
                $userprof = $result[2];
                $status = $result[3];
				$prof = $result[4];
				$area = $result[5];
				$status_text = "pending";
				if($status == 1)
				{
					$status_text = "pending";
				}
				else{
					$status_text = "accepted";
				}
				if($email == $userprof)
				{
				    $fn["search".$county] = '<div class="col-xs-offset-2 col-xs-8 notification"> <!-- To duplicate, start highlighting from here -->
						<div class="col-md-4" style="padding-top: 5px;">
							<img src="default.png" alt="" class="img-circle img-responsive" />
						</div>
						<div class="col-md-8"> 
							<h3>' . $email.'</h3>
							<div class="row">
								<div class="col-lg-6"><p><i class="fa fa-envelope"></i>' . $email.'</p></div>
								<div class="col-lg-6"><p><i class="fa fa-clock-o"></i>' . $status_text.'</p></div>
							</div>
							<div class="row">
								<div class="col-lg-6"><p><i class="fa fa-briefcase"></i>' . $prof.'</p></div>
								<div class="col-lg-6"><p><i class="fa fa-map-marker"></i>' . $area.'</p></div>
							</div>
							<!-- <p><i class="fa fa-check-circle"></i> Completed</p> --> <!-- You can use javascript to decide which between pending and success or create custom -->
						</div>
						
				</div>';

				}
				else{
				     $fn["search".$county] = '<div class="col-xs-offset-2 col-xs-8 notification"> <!-- To duplicate, start highlighting from here -->
						<div class="col-md-4" style="padding-top: 5px;">
							<img src="default.png" alt="" class="img-circle img-responsive" />
						</div>
						<div class="col-md-8"> 
							<h3>'. $userprof.'</h3>
							<div class="row">
								<div class="col-lg-6"><p><i class="fa fa-envelope"></i>' . $userprof.'</p></div>
								<div class="col-lg-6"><p><i class="fa fa-clock-o"></i>' . $status_text.'</p></div>
							</div>
							<div class="row">
								<div class="col-lg-6"><p><i class="fa fa-briefcase"></i>' . $prof.'</p></div>
								<div class="col-lg-6"><p><i class="fa fa-map-marker"></i>' . $area.'</p></div>
							</div>
							<!-- <p><i class="fa fa-check-circle"></i> Completed</p> --> <!-- You can use javascript to decide which between pending and success or create custom -->
						</div>
						
				</div>';

				}
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