<?php
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
//prep db params

include_once("connect.php");
$dbname = "antemon1_Baconators";
//make connection
$conn = connect();
if($conn->connect_error)
{
	die("something went wrong");
} 
mysql_select_db($dbname);

//prepare the query

$query = $conn->prepare("INSERT INTO User(UID, NAME, EXP, SID, IID, PSWD, EMAIL, PASSKEY, LOGGED) VALUES (?,?,?,?,?,?,?,?,?)");
$query->bind_param("isdiissii", $userID, $user, $exp, $statID, $invID, $pass, $mail, $key, $log);
$query2 = $conn->prepare("INSERT INTO Stats(ATTACK, DEFENSE, SID, SPECIAL, SPEED) VALUES (?,?,?,?,?)");
$query2->bind_param("iiiii", $attack_stat, $defense_stat, $statID, $special_stat, $speed_stat);
$query3 = $conn->prepare("INSERT INTO Inventory(CAPACITY, IID) VALUES (?,?)");
$query3->bind_param("ii", $capacity, $invID);

$user = $_POST['uname'];
$pass = $_POST['pswd'];
$mail = $_POST['mail'];

$user = testData($user);
$pass = testData($pass);
$mail = testData($mail);


$pass = password_hash($pass, PASSWORD_BCRYPT);
$userID = rand(5,9999999999);
$exp = 0.00;
$statID = rand(5,999999);
$invID = rand(5,9999999);
$log = NULL;
$capacity = 100;
$attack_stat = 50;
$defense_stat = 50;
$special_stat = 50;
$speed_stat = 50;
$subject = "Email Verification";
$message = "
<html>
	<title>Email Verification</title>
	<body>
	<p>Hello,</p>
	<p>Follow the link below to the game</p>
	<a href='www.antem-online.net/verify.php?email=".$mail."'>Antem-Online</a>
	<p>Best Regards,</p>
	<p>Chaos</p>
	</body>
</html>
";
$headers = array("From: chaos@antem-online.net",
   	 "Reply-To: chaos@antem-online.net",
   	 "Content-type: text/html ; charset = iso-8859-1",
    	 "X-Mailer: PHP/" . PHP_VERSION);
    	$headers = implode("\r\n", $headers);

$key = rand(100000, 999999);


//Execute the query
$query->execute();
$query2->execute();
$query3->execute();

//close the connections
$query->close();
$query2->close();
$query3->close();
$conn->close();
if(mail($mail, $subject, $message, $headers))
{
	echo "<script> console.log('sent') </script>";
}
else
{
	echo "script> console.log('not sent') </script>";
}

//header("Location: //antem-online.net/index.html");
}
function testData($data)
{
$data = trim($data);
$data = strip_tags($data);
$data = htmlspecialchars($data);
return $data;
}
if($_SERVER['REQUEST_METHOD'] == 'GET')
{	
include_once("connect.php");
$dbname = "antemon1_Baconators";

//make connection
$conn = connect();
if($conn->connect_error)
{
	die("something went wrong");
} 
	$dbname = "antemon1_Baconators";
	$name = "";
	$mail = "";

	mysql_select_db($dbname);
	
	if(isset($_GET['user']))
	{
		$name = testData($_GET['user']);
	}
	else
	{
		echo "Enter a Username";
		$conn->close();
		exit();
	}
	
	if(isset($_GET['email']))
	{
		$mail = testData($_GET['email']);
	}
	else
	{
		echo "Enter an email";
		$conn->close();
		exit();
	}
	
	$query = "SELECT * FROM User WHERE NAME LIKE '".$name."'";
	$result = $conn->query($query);
	$query2 = "SELECT * FROM User WHERE EMAIL LIKE '".$mail."'";
	$result2 = $conn->query($query2);
	
	if($result->num_rows > 0)
	{
		echo "Username already taken";
		$conn->close();
		//exit();
	}
	
	else if($result2->num_rows > 0)
	{
		echo "Email already in use";
		$conn->close();
		//exit();
	}
	else
	{
		echo "a";
		$conn->close();
		//exit();
	}
	
}

?>