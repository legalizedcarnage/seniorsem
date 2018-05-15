<?php
if(isset($_GET['email']))
{
	$mail = $_GET['email'];
}
include_once("connect.php");
$dbname = "antemon1_Baconators";

//make connection
$conn = connect();
if($conn->connect_error)
{
	die("something went wrong");
} 
mysql_select_db($dbname);
$query = "SELECT * FROM User WHERE EMAIL LIKE '".$mail."'";
$result = $conn->query($query);
$row = $result->fetch_assoc();
$query = "UPDATE antemon1_Baconators.User SET PASSKEY = NULL WHERE EMAIL = '".$mail."'";
$query2 = "UPDATE antemon1_Baconators.User SET LOGGED ='1' WHERE EMAIL = '".$mail."'";
$conn->query($query);
$conn->query($query2);
$conn->close();
header("Location: //antem-online.net/game.html?user=".$row["NAME"]);
?>