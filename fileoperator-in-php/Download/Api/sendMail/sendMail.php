<?php
class sendMail{
    public function __construct()
        {
           $this->mail=  new PHPMailer();
        }
 

       private function sendMails($adress,$body,$subject)
       {  
        try{
            //$this->mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
             $this->mail->isSMTP();                                            //Send using SMTP
                               //Set the SMTP server to send through
            $this->mail->SMTPAuth =true;   
             $this->mail->SMTPSecure = 'ssl';  
             $this->mail->Host = 'mail.ongollahsafaris.com';  
             $this->mail->Port = '465';                               //Enable SMTP authentication
                                       //SMTP password
                     //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
                    
            
             //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
             $this->mail->Username   = 'ongollah@ongollahsafaris.com';                     //SMTP username
             $this->mail->Password   = '=b4SmZz}bxC~';   
             $this->mail->SetFrom('ongollah@ongollahsafaris.com');
             
            
             $this->mail->AddAddress($adress);
         
             $this->mail->isHTML(true);                                 //Set email format to HTML
             $this->mail->Subject = "$subject";
             $this->mail->Body = "$body";
 
         
             $this->mail->Send();
         
         } catch (Exception $e) {
             echo "Message could not be sent. Mailer Error: {$this->mail->ErrorInfo}";
         }
       }

       public function Send($email,$body,$subject){
           
           $this->sendMails($email,$body,$subject);
       }
}

?>