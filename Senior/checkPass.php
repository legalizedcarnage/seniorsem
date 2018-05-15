<?php
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
	//check if username exists in database from entered email
	include_once("../connect.php");
	$dbname = "antemon1_Baconators";
	//prep email params
	$subject = "Password Reset";
	$key = rand(100000,999999);
	$message = "
	<html>
	<title>Reset Password</title>
	<body>
	<p>Hello,</p>
	<p>Here is the key to reset your password:  ".substr($key,0,3)." ".substr($key,3,6)."  <p>
	<p>Follow the link below to reset your password</p>
	<a href='www.antem-online.net/retrievals/resetPass.html'>Password reset</a>
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


	//make connection
	$conn = connect();
	if($conn->connect_error)
	{
		die("something went wrong");
	} 
	mysql_select_db($dbname);
	if(isset($_POST['uname']))
	{
		$user = testData($_POST['uname']);
	}
	else
	{
		echo "Enter a Username";
		$conn->close();
	}
	$query = "SELECT * FROM User WHERE NAME LIKE '".$user."'";
	$query2 = "UPDATE antemon1_Baconators.User SET PASSKEY ='".$key."' WHERE NAME LIKE'".$user."'";
	$result = $conn->query($query);
	$conn->query($query2);
	if($result)
	{
		$row = $result->fetch_assoc();
		$mail = $row["EMAIL"];
		mail($mail, $subject, $message, $headers);
		$conn->close();
	}
	else
	{
		echo "Username not registered";
		$conn->close();
	}
}
function testData($data)
{
$data = trim($data);
$data = strip_tags($data);
$data = htmlspecialchars($data);
return $data;
}

?>