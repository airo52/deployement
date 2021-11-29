<?php
session_start();
if(!isset($_SESSION["loged_user"])){
header("Location: ../");
exit(); }

else{
     $IDS = $_SESSION["loged_user"];
    $username = $_SESSION['username'];
    $profile = $_SESSION['profile'];
}
?>