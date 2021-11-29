import { useState } from "react";
import Loader from "react-loader-spinner";
import { Loginn } from "src/Api/auth/auth";

import swal from "sweetalert";
//import { Button,Modal } from "react-bootstrap";
import './login.css';
const Login = ({Profile})=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [err,setErr] = useState('');
    const [Err,setEr] = useState(false);
    const [save,SetSave] = useState(false);

    function showError(data){
     // alert(data);
       // swal("LOGIN FAILED",data,'error','1000');
       swal({
        title: "LOGIN FAILED",
        text: data,
        icon: "error",
        timer: 3000
     });
    }

    async function  handLogin(e){
        SetSave(true)
     e.preventDefault();
     
       const result = await Loginn(email,password,Profile);
       //alert(result)
       
      if(result == true){
        
         setEmail('');
         setPassword('');
         SetSave(false)
 
         
 
     }else{
         showError(result)
         setErr(result);
         setEr(true);
         SetSave(false)
       
     }
 
    }
   
  return <>
      
      <div  id="myModal" class="show">
	<div style={{backgroundColor:"#f1f1",marginTop:"10%"}} class="modal-dialog modal-login">
		<div class="modal-content">
			<div class="modal-header">
				<div class="avatar">
					<img src="https://www.tutorialrepublic.com/examples/images/avatar.png" alt="Avatar"/>
				</div>				
				<h4 class="modal-title">Admin Login</h4>	
                
			</div>
			<div class="modal-body">
				<form action="" method="post">
					<div class="form-group">
						<input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" class="form-control" name="email" placeholder="email" required="required"/>		
					</div>
					<div class="form-group">
						<input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" class="form-control" name="password" placeholder="Password" required="required"/>	
					</div>        
					<div class="form-group">
						<button style={{outline:"none"}} onClick={(e)=>handLogin(e)} type="submit" class="btn btn-primary btn-lg btn-block login-btn">Login</button>
					</div>
				</form>
			</div>
			<div class="modal-footer">
           
				<a  href="/#/auth/ForgotPassWord" >Forgot Password?</a>
			</div>
		</div>
	</div>
</div>  
{ save && <div className="spinner">
    
  
    <Loader
  type="Circles"
  color="#00BFFF"
  height={100}
  width={100}
  //3 secs
  />
  </div>}   
    </>
}

export default Login;