<?php
//Image file at sever loaction to download

$filePath = $_GET['file'];


//if(!empty($filepath)){
    echo $filePath;
$file ="Api/uploads/".$filePath; //'http://localhost:4000/files/Task283267Airo%20(1).pdf';



if (file_exists($file)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="'.basename($file).'"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));
    readfile($file);
    exit;
}else{
    echo "nop";
}

//}else{
 //   echo "empty";
//}



?>