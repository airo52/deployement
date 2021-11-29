<?php


function UploadFile($server_url,$upload_dir){
$response = array();
/*$upload_dir = 'uploads/';
$server_url = 'http://localhost/~tony/Download/';
$_FILES = json_decode(file_get_contents("php://input"),true);
*/
if($_FILES['files'])
{
    $files_name =$_FILES["files"]["name"];
    $files_tmp_name =$_FILES["files"]["tmp_name"];
    $error =$_FILES["files"]["error"];

   /* size: 1085019,
    path: '/var/folders/0s/y_3vjjwd7s30438rfkgc1v1m0000gp/T/upload_98e70d8b2872df99013015917c821d1d',
    name: 'file1124563post.jpg',
    type: 'image/jpeg',
    mtime: '2021-11-25T21:39:04.046Z'
    */

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
                "messagennn" => $files_tmp_name,
                "messagb" =>$_POST['files']
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

//echo json_encode($response);
return json_encode($response);
}
?>