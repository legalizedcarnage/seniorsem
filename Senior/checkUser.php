<?php
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
	//check if username exists in database from entered email
	include_once("../connect.php");
	$dbname = "antemon1_Baconators";

	//make connection
	$conn = connect();
	if($conn->connect_error)
	{
		die("something went wrong");
	} 
	mysql_select_db($dbname);
	if(isset($_POST['email']))
	{
		$mail = testData($_POST['email']);
	}
	else
	{
		echo "Enter an email address";
	}
	$query = "SELECT * FROM User WHERE EMAIL LIKE '".$mail."'";
	$result = $conn->query($query);
	$row = $result->fetch_assoc();
	//prep email params
	
	$name = $row["NAME"];
	$subject = "Username Retrieval";
	$message = "Hello," . "\n" . "Your Antem-Online Username is " . $name . "." . "\n" . "Best Regards," . "\n" . "Chaos";
	$headers = array("From: chaos@antem-online.net",
   	 "Reply-To: chaos@antem-online.net",
    	"X-Mailer: PHP/" . PHP_VERSION);
    	$headers = implode("\r\n", $headers);

	if($mail)
	{
		//perform mail function
		mail($mail, $subject, $message, $headers);
		echo "a";
		$conn->close();
	}
	else
	{
		echo "Email not registered";
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