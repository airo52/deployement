<?php
class DatabaseConfigaration{
    // Database Connection Properties
   
  protected $host = 'localhost';
    protected $user = 'root';
   protected $password = 'Dmosh$$123';
   protected $database = "writer";


  public $con = null;

  //call constructor
   public function __construct()
   {
       //Establish connection 
       $this->con=mysqli_connect($this->host,$this->user,$this->password,$this->database);

       //check if connection is true or false
       if($this->con->connect_error){
           $message = array();
           $message['message'] ="CONNECTION FAILED:".$this->con->connect_error;
             //  echo "nop";
           echo json_encode($message);
       }

   }

   //revoke connection
   public function __destruct()
   {
       $this->closeConnection();
   }

   //mysqli closing connection
   protected function closeConnection()
   {
     if ($this->con != null ){
        $this->con->close();
        $this->con = null;
     }
   }
}

?>