<?php
class auth{
     //call constructor
   public function __construct(DatabaseConfigaration $db)
   {
       
    if (!isset($db->con)) return null;
        $this->db = $db->con;
      

   }

   private function checkIfpasswordIsTrue($userpassword,$password,$key)
   {
   $data = inputs($key,$userpassword,'decrypt');

    
    if($password == $data)
      
    return true;
     else{
       return false;
     }
      
      
   }

   private function checkForUpdatePassword($userpassword,$password,$key){
    $data = inputs($key,$userpassword,'decrypt');

    
    if($password == $data)
      
    return $key;
     else{
       return false;
     }
   }
    

   private function Login($email,$password){
         $sanitizedPassword = $this->realEscapeString($password);
         $sanitizedEmail = $this->realEscapeString($email);

         //$email = test_input($_POST["email"]);
         // check if e-mail address is well-formed
         if (!filter_var($sanitizedEmail, FILTER_VALIDATE_EMAIL)) {
           return "Invalid email format";
         }else{

         $stmt = $this->db->stmt_init();
         $stmt ->prepare("SELECT * FROM users WHERE email='".$sanitizedEmail."' LIMIT 1");
         $stmt->execute();
          
          
          $result = $stmt->get_result(); // get the mysqli result
          
             
          $dat= array();
          while ($row = $result->fetch_assoc()) {
            $dat[]=$row;
           }

           if(empty($dat)){
                return "Not Found";
           }

           $pass = $dat[0]['password'];
           $key = $dat[0]['skey'];

        
           if($this->checkIfpasswordIsTrue($pass,$sanitizedPassword,$key)){
               session_start();
               $_SESSION['loged_user'] = $dat[0]['id'];
               $_SESSION['username'] = $dat[0]['username'];
               $_SESSION['profile'] = $dat[0]['profile'];
               return true;
           }else{
                return "Wrong password";

    
           }


         }
   }



   private function realEscapeString($param)
   {
       return mysqli_real_escape_string($this->db,$param);
   }

   public function InitAuth($email,$password){
        if(!empty($email) && !empty($password)){
           
          return $this->Login($email,$password);
        }

   }

   public function confirmPassword($password){
    session_start();
    $id = $_SESSION['loged_user'];

    $stmt = $this->db->stmt_init();
    $stmt ->prepare("SELECT * FROM users WHERE id='".$id."' LIMIT 1");
    $stmt->execute();
     
     
     $result = $stmt->get_result(); // get the mysqli result
     
        
     $dat= array();
     while ($row = $result->fetch_assoc()) {
       $dat[]=$row;
      }

      if(empty($dat)){
           return "Not Found";
      }

      $pass = $dat[0]['password'];
      $key = $dat[0]['skey'];

     // $this->checkIfpasswordIsTrue($pass,$password,$key)

     return $this->checkForUpdatePassword($pass,$password,$key);

  }
   
}
