<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");

$fileDirectory = 'uploads/files/';
$profileDir ='uploads/profiles/';
$server_url = 'http://localhost/~tony/Download/Api/';

require_once("php/config/db/db.php");
require_once("php/config/crypto/crypto.php");
require_once("php/config/db/queries.php");
require_once("PHPMailer/PHPMailerAutoload.php");
require_once("sendMail/sendMail.php");



$db = new DatabaseConfigaration();
$path = "php/functions/";


$control = $_POST['control'];


switch ($control) {

         case 'uploadTaskFile':
            $upload_dir =$fileDirectory;
            try {
                //code...
          

            require_once($path."uploadFile.php");

            $result = UploadFile($server_url,$upload_dir);



            if($result['error']== false){
               // $id = $_POST['id'];
                echo $result;


            }else{
                echo $result;
            }
         } catch (\Throwable $th) {
            echo json_encode($th);
        }
             
             break;

             case 'writerProfile':
                $upload_dir =$profileDir;
                try {
                
                require_once($path."uploadFile.php");
    
                $result = UploadFile($server_url,$upload_dir);



                if($result['error']== false){
                   // $id = $_POST['id'];
                    echo $result;


                }else{
                    echo $result;
                }
             } catch (\Throwable $th) {
                echo json_encode($th);
            }
              break;

              case 'adminProfile':
                $upload_dir =$profileDir;
                try {
                
                require_once($path."uploadFile.php");
    
                $result = UploadFile($server_url,$upload_dir);



                if($result['error']== false){
                   // $id = $_POST['id'];
                    echo $result;


                }else{
                    echo $result;
                }
             } catch (\Throwable $th) {
                echo json_encode($th);
            }
                break;

              case 'submitTask':
                $upload_dir =$fileDirectory;
                try {
                
                require_once($path."uploadFile.php");
    
                $result = UploadFile($server_url,$upload_dir);



                if($result['error']== false){
                   // $id = $_POST['id'];
                    echo $result;


                }else{
                    echo $result;
                }
             } catch (\Throwable $th) {
                echo json_encode($th);
            }
                break;

             default:
             echo json_encode([$_FILES]);
             break;
}



?>