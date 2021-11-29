
<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");



$response = array();

$server_url = 'http://localhost/~tony/Download/';
$_FILES = json_decode(file_get_contents("php://input"),true);

if($_FILES['files'])
{
    $files_name =$_FILES["files"]['files']["name"];
    $files_tmp_name =$_FILES["files"]['files']['path'];//["tmp_name"];
    $error =$_FILES["files"]['files']["error"];

 

    if($error > 0){
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading the file!",
            "file"=>$files_name
        );
    }else 
    {
        $random_name = rand(1000,1000000)."-".$files_name;
        $upload_name = $upload_dir.strtolower($random_name);
        $upload_name = preg_replace('/\s+/', '-', $upload_name);

        if(move_uploaded_file($files_tmp_name , $upload_name)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "File uploaded successfully",
                "url" => $server_url.$upload_name
              );
        }else
        {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!",
               
            );
        }
    }    

}else{
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "No file was sent!",
       
    );
}

echo json_encode($response);
?>