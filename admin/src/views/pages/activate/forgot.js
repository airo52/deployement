import '../login/login.css';
import swal from "sweetalert";
import Loader from 'react-loader-spinner';

import { useEffect, useState } from 'react';
import ApiRequest from 'src/Api/Data/requestApi';
const Forgot=()=>{
    const [Key,setKey] = useState('');
    const [btn,setBtn] = useState(false);
    const [save,SetSave] = useState(false);
    function showError(data){
        // alert(data);
          // swal("LOGIN FAILED",data,'error','1000');
          swal({
           title: "password retrival Failed",
           text: data,
           icon: "error",
           timer: 3000
        });
        setBtn(false);
       }

       const HandleFunc =async (Key)=>{
        try {
            var result = await ApiRequest.ForgotPassword(Key);
              SetSave(false);
              setBtn(true);
            if(result.data === 'done'){
                swal('success','pasword reset success ..chehck email','success');
                SetSave(false);
                setTimeout(() => {
                    window.location.href="/#/Login"
               }, 2000);

            } else{
                showError(result.data);
            }
          } catch (error) {
           //  console.log(error) 
          }
       }
    const ActivateAccount=(e)=>{
        if(e !==undefined){
            e.preventDefault();
        };
              SetSave(true);
              setBtn(true);
              setTimeout(() => {
                  //if(Key !==''){
                     HandleFunc(Key);
                    
                     
                     
                //  }
                  //showError('wrong key')
                 // SetSave(false);
              }, 2000);

    }
    return <>   
    <div  id="myModal" class="show">
  <div style={{backgroundColor:"#f1f1",marginTop:"10%"}} class="modal-dialog modal-login">
      <div class="modal-content">
          <div class="modal-header">
              <div class="avatar">
                  <img src="https://www.tutorialrepublic.com/examples/images/avatar.png" alt="Avatar"/>
              </div>				
              <h4 class="modal-title">Forgot Password</h4>	
              <button onClick={()=>window.location.href="/#/"} type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          </div>
          <div class="modal-body">
              <form action="" method="post">
                
              <div class="form-group">
                      <input type="email" class="form-control" onChange={(e)=>setKey(e.target.value)} name="email" placeholder="Email" required="required"/>	
                  </div>        
                  <div class="form-group">
                      <button type="submit" onClick={(e)=>ActivateAccount(e)}  class="btn btn-primary btn-lg btn-block login-btn">Get password</button>
                  </div>
              </form>
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
  </div>
} 
</>
}

export default Forgot;