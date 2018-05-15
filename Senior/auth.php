<?php
if($_SERVER['REQUEST_METHOD'] == 'POST')
{	

	include_once "connect.php";
	$dbname = "antemon1_Baconators";
	
	$name = "";
	$pswd = "";
	$password_okay = False;
	$email_verify = True;
	$logged_in = False;
	$hash = "";

	//make connection
	$conn = connect();
	if($conn->connect_error)
	{
		die("something went wrong");
	}
	mysql_select_db($dbname);
	
	if(isset($_POST['user']))
	{
		$name = testData($_POST['user']);
	}
	else
	{
		echo "Enter a Username";
		$conn->close();
		exit();
	}
	if(isset($_POST['pass']))
	{
		$pswd = testData($_POST['pass']);
	}
	else
	{
		echo "Enter a password";
		$conn->close();
		exit();
	}
	
	$query = "SELECT * FROM User WHERE NAME LIKE '".$name."'";
	$query2 = "UPDATE antemon1_Baconators.User SET LOGGED ='1' WHERE NAME = '".$name."'";
	$result = $conn->query($query);	
	$row = $result->fetch_assoc();	
	$pass = $row["PSWD"];
	$hash = password_hash($pswd, PASSWORD_BCRYPT);
	
	/*
	if(!is_null($row["LOGGED"]))
	{
		echo "User is logged in elsewhere";
		$logged_in = True;
		$conn->close();
	}
	*/	
	if(!is_null($row["PASSKEY"]))
	{
		echo "Email verification required";
		$email_verify = False;
		$conn->close();
	}
	
	if(password_verify($pswd, $pass))
	{
		$password_okay = True;
	}
	else
	{
		$password_okay = False;
	}
	if($result->num_rows == 1 && $password_okay && $email_verify && !$logged_in)
	{
		echo "a";
		$conn->query($query2);
		$conn->close();
	}
	else if($result->num_rows == 1 && !$password_okay)
	{
		echo "Password does not match";
		$conn->close();
	}
	else if($result->num_rows != 1)
	{
		echo "Username not found";
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

