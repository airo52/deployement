<?php
class create extends databaseQueries{
    //call constructor
    public function __construct(DatabaseConfigaration $db)
    {
        
        parent::__construct($db);


 
    }

    public function AddPackage($ImagePath,$title,$capacity,$description,$price){
        $data = array();
        $data[] = $title;
        $data[]= $price;
        $data[] = $capacity;
        $data[] = $capacity;

        $insert = $this->InsertoDb($data,"category");
          if($insert){
            $id= mysqli_insert_id($this->db->con);

            $Data = array();
            $Data[] = $title;
            $Data[] = $ImagePath;
            $Data[] = $description;
            $Data[] = $id;

            $ins = $this->InsertoDb($Data,"description");
          return $ins;

        
          }

   }
  

   private function up2($descriptionId,$title,$ImagePath,$description){
    $data= array();
    $where ="id='$descriptionId'";
    $table ="description";
    $data['title']=$title;
    $data['image']=$ImagePath;
    $data['desc']=$description;
      
   // return $wher;
  
  //return $wher;
  return $this->UpdateData($table,$data,$where);
   }

   public function UpdatePackage($ImagePath,$title,$capacity,$description,$price,$descriptionId,$category){


   

     $data= array();
      $where ="id='$category'";
      $table ="category";
      $data['title']=$title;
      $data['price']=$price;
      $data['capacity']=$capacity;
      $data['remaining']=$capacity;
      $update= $this->UpdateData($table,$data,$where);
      //return $update;

      if($update){

        $dat= array();
        $wher ="id='$descriptionId'";
        $tabl ="description";
        $dat['title']=$title;
        $dat['image']=$ImagePath;
        $dat['description']=$description;
          
       // return $wher;
      
    
     return $this->UpdateData($tabl,$dat,$wher);
        
    
      }else{
        return "nml";
      }

   }

   public function getEdit($id,$Id){
           try {

            $userData=$this->ReadData('category',["*"],["INNER JOIN description ON category.id=description.category_id WHERE description.id='".$Id."'"])[0]; 

            return $userData;


           } catch (\Throwable $th) {
             //throw $th;
             return $th;
           }
   }

   public function Delete($id,$Id){
     //$Id description

     $category = $this->DeleteData("category","id",$id);

     if($category){
       $desc = $this->DeleteData("description","id",$Id);

       return $desc;
     }
   }

   public function MoreDetails($id,$Id,$descId){
    try {
      //$id=category
      //$Id = reservation
      //$descId = description
     

      $userData=$this->ReadData('reservation',["*"],["INNER JOIN description ON description.id='$descId'  INNER JOIN category ON category.id='$id' WHERE reservation.id='$Id' ORDER BY date DESC"]); 

      return $userData;


     } catch (\Throwable $th) {
       //throw $th;
       return $th;
     }
   }

   public function Confirm($id,$amount,$method,$transactionId){
    $dat= array();
    $wher ="id='$id'";
    $tabl ="reservation";
    $dat['status']='1';
    $dat['amount'] = $amount;
    $dat['TransactionId'] = $transactionId;
    $dat['paymentMethod'] = $method;
   
      
   // return $wher;
  

 return $this->UpdateData($tabl,$dat,$wher);
   }

   public function updateProfile($var,$id)
   {
    $wher ="id='$id'";
    $tabl ="users";
    return $this->UpdateData($tabl,$var,$wher);
   }

   public function addAbout($description){
    $userData=$this->ReadData('aboutUs',["*"],[""]); 

    if(empty($userData)){
     

      $Data = array();
     
      $Data[] = $description;
    

      $ins = $this->InsertoDb($Data,"aboutUs");
    return $ins;
    }
    else{
      $dat= array();
      $id = $userData[0]['id'];
      $wher ="id='$id'";
      $tabl ="aboutUs";
      $dat['message']=$description;
      return $this->UpdateData($tabl,$dat,$wher);


    }
    
   }


   public function getAbout(){
    try {
    
      $userData=$this->ReadData('aboutUs',["*"],[""]); 

      return $userData;


     } catch (\Throwable $th) {
       //throw $th;
       return $th;
     }
   }

   public function deleteAbout($id){
    $desc = $this->DeleteData("aboutUs","id",$id);

    return $desc;
   }

   public function editAbout($id){
    try {
    
      $userData=$this->ReadData('aboutUs',["*"],["WHERE id='".$id."'"]); 

      return $userData;


     } catch (\Throwable $th) {
       //throw $th;
       return $th;
     }
   }

   public function loadGallery($id){
    try {
        $condition = empty($id) ?"":"WHERE id='".$id."'";
      $userData=$this->ReadData('gallery',["*"],[$condition]); 

      return $userData;


     } catch (\Throwable $th) {
       //throw $th;
       return $th;
     }
   }

   public function addGallery($ImagePath,$description,$title){
    try {
    
      $Data = array();
      $Data[] = $ImagePath;
     
      $Data[] = $description;
      $Data[] = $title;
    

      $ins = $this->InsertoDb($Data,"gallery");
      return $ins;


     } catch (\Throwable $th) {
       //throw $th;
       return $th;
     }
   }

   public function deleteGallery($id){
    $desc = $this->DeleteData("gallery","id",$id);

    return $desc;
   }

   public function GalleryEdit($ImagePath,$description,$id,$title){


    $data= array();
    $where ="id='$id'";
    $table ="gallery";
  
    $data['image']=$ImagePath;
    $data['descritption']=$description;
    $data['title'] = $title;
      
   // return $wher;
  
  //return $wher;
  return $this->UpdateData($table,$data,$where);

   }

   public function getMessages(){

    $userData=$this->ReadData('contact',["*"],["WHERE status ='0'"]); 

    return $userData;

   }

   public function Reply($id,$message,$email,$sendMail)
  {

    try {
      $data= array();
      $where ="id='$id'";
      $table ="contact";
    
      $data['status']=1;
      $data['reply']=$message;
        
     // return $wher;
    
    //return $wher;
    if($this->UpdateData($table,$data,$where)){
       $sendMail->Send($email,$message,"Ogollah Safaris Reply");
    };

      
    } catch (\Throwable $th) {
      //throw $th;
      return $th;
    }
    
    // update contact table
    // send mail,
    
  }  

  public function confirmContact($id){
      
    $data= array();
    $where ="id='$id'";
    $table ="contact";
  
    $data['status']=1;
  
      
   // return $wher;
  
  //return $wher;
  return $this->UpdateData($table,$data,$where);
  }

  public function loadBranches(){
    $userData=$this->ReadData('branch',["*"],[""]); 

    return $userData;
  }

  public function DeleteBranch($id){
    $desc = $this->DeleteData("branch","id",$id);

    return $desc;
  }

  function addBranch($name){
    $Data = array();
     
    $Data[] = $name;
   
    
  

    $ins = $this->InsertoDb($Data,"branch");
    return $ins;
  }

  public function createProfile($var,$Image)
  {

       if(!$this->checkIfUserExist($var['email']))
       {
         return false;
          
       }
     $username = $var['username'];
     $email = $var['email'];
     $password = $var['oldPassword'];
     $profile = $Image;
     $skey = rand(345678,98763728);
     $category = 1;

     $array = array();
     $array[] = $username;
     $array[] = $email;
     $array[] = $this->encryptPassword($password,$skey);
     $array[] = $profile;
     $array[] = $skey;
     $array[] = $category;

     $ins = $this->InsertoDb($array,"users");
     return $ins;
  }


  private function checkIfUserExist($email){

    $userData=$this->ReadData('users',["*"],["WHERE email= '$email'"]); 

    if(empty($userData)){
     
       return true;
    }
    else{
         return false;
    }

  }
  private function encryptPassword($password,$key)
   {
   $data = inputs($key,$password,'encrypt');

   return $data;
   }
 

}
?>