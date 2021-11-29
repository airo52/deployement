<?php

class Details {
       //call constructor
       public function __construct(DatabaseConfigaration $db)
       {
           
        if (!isset($db->con)) return null;
            $this->db = $db->con;
          

          
    
       }
       private function reservations(){
        $stmt = $this->db->stmt_init();
        $stmt ->prepare("SELECT * FROM reservation WHERE status='0'");
        $stmt->execute();
         
         
        $result = $stmt->get_result(); // get the mysqli result
        
           
        $dat= array();
        while ($row = $result->fetch_assoc()) {
          $dat[]=$row;
         }
   
         return count($dat);
       
       }

       private function revenue(){
        $stmt = $this->db->stmt_init();
        $stmt ->prepare("SELECT * FROM reservation WHERE status='1'");
        $stmt->execute();
         
         
         $result = $stmt->get_result(); // get the mysqli result
         
            
         $dat= array();
         $amount =0;
         while ($row = $result->fetch_assoc()) {
           $amount=$amount + $row['amount'];
          }
    
          return $amount; 
       }
    
       private function packages(){
        $stmt = $this->db->stmt_init();
        $stmt ->prepare("SELECT * FROM category INNER JOIN description ON category.id=description.category_id");
        $stmt->execute();
         
         
         $result = $stmt->get_result(); // get the mysqli result
         
            
         $dat= array();
         while ($row = $result->fetch_assoc()) {
           $dat[]=$row;
          }
    
          return count($dat);  
       }

       private function package(){
        $stmt = $this->db->stmt_init();
        $stmt ->prepare("SELECT * FROM category INNER JOIN description ON category.id=description.category_id");
        $stmt->execute();
         
         
         $result = $stmt->get_result(); // get the mysqli result
         
            
         $dat= array();
         while ($row = $result->fetch_assoc()) {
           $dat[]=$row;
          }
    
          return $dat;  
       }
    
       private function followers(){
        $stmt = $this->db->stmt_init();
        $stmt ->prepare("SELECT * FROM reservation");
        $stmt->execute();
         
         
         $result = $stmt->get_result(); // get the mysqli result
         
            
         $dat= array();
         while ($row = $result->fetch_assoc()) {
           $dat[]=$row;
          }
    
          return count($dat);  
       }
    
       private function LoadDashboard(){
           $reservations = $this->reservations();
           $revenue = $this->revenue();
           $packages = $this->packages();
           $followers = $this->followers();
    
           $data = array();
    
           $data['reservations'] = $reservations;
           $data['revenue'] = $revenue;
           $data['packages'] = $packages;
           $data['followers'] = $followers;
    
    
           return $data;
    
    
       }
     
    
      public function Dashboard(){
           $data = $this->LoadDashboard();
    
           return $data;
       }

  

       public function Reservation(){
        $stmt = $this->db->stmt_init();
        $stmt ->prepare("SELECT * FROM description INNER JOIN reservation ON description.id=reservation.descId WHERE reservation.status='0' ORDER BY date DESC");
        $stmt->execute();
         
         
        $result = $stmt->get_result(); // get the mysqli result
        
           
        $dat= array();
        while ($row = $result->fetch_assoc()) {
          $dat[]=$row;
         }
   
       return $dat;
       }

       public function getPacakage(){
         $data = $this->package();

         return $data;
       }
}
?>
