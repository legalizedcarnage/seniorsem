<?php
if($_SERVER['REQUEST_METHOD'] == 'POST')
{	
	include_once "connect.php";
	$dbname = "antemon1_Baconators";
	
	$name = $_POST['user'];

	//make connection
	$conn = connect();
	if($conn->connect_error)
	{
		die("something went wrong");
	}
	mysql_select_db($dbname);
	$query = "UPDATE antemon1_Baconators.User SET LOGGED = NULL WHERE NAME = '".$name."'";
	$conn->query($query);
	$conn->close();
}
?>