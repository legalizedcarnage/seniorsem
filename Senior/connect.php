<?php
function connect()
{
$dbhost = "localhost";
$dbuser = "antemon1_chaos";
$dbpass = "dr25Tf5b";
$dbname = "antemon1_Baconators";

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
return $conn;
}
?>