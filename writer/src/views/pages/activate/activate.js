import { useEffect, useState } from 'react';
import { UrlParams } from 'src/Api/auth/UrlParams';
import '../login/login.css';
import swal from "sweetalert";
import Loader from 'react-loader-spinner';
import ApiRequest from 'src/Api/Requests/Apirequest';
const Activate=()=>{
    const [Key,setKey] = useState('');
    const [btn,setBtn] = useState(false);
    const [save,SetSave] = useState(false);


function showError(data){
   // alert(data);
     // swal("LOGIN FAILED",data,'error','1000');
     swal({
      title: "Activation Failed",
      text: data,
      icon: "error",
      timer: 3000
   });
   setBtn(false);
  }

  const HandleFunc =async (Key)=>{
   try {
       var result = await ApiRequest.ActivateAcount(Key);
         SetSave(false);
         setBtn(true);
       if(result.data === 'done'){
           swal('success','Account activated successfully','success');
           SetSave(false);
           setTimeout(() => {
            window.location.href='/#/Login';
          }, 2000);

       } else{
           showError(result.data);
       }
     } catch (error) {
        console.log(error) 
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

const Check=()=>{
   const Key = UrlParams('Key');
   
   if(!Key==false){
       setKey(Key);
       setBtn(true);
HandleFunc(Key);
     //ActivateAccount(Key);
   }
}

useEffect(()=>{
 Check();
  //alert(Key);
},[])

    return <>   
    <div  id="myModal" class="show">
  <div style={{backgroundColor:"#f1f1",marginTop:"10%"}} class="modal-dialog modal-login">
      <div class="modal-content">
          <div class="modal-header">
              <div class="avatar">
                  <img src="https://www.tutorialrepublic.com/examples/images/avatar.png" alt="Avatar"/>
              </div>				
              <h4 class="modal-title">Activate Account</h4>	
              
              
          </div>
          <div class="modal-body">
              <form action="" method="post">
                
                  <div class="form-group">
                      <input type="number" value={Key} onChange={(e)=>setKey(e.target.value)} class="form-control" name="key" placeholder="Activation Key" required="required"/>	
                  </div>        
                  <div class="form-group">
                      <button type="submit" onClick={(e)=>ActivateAccount(e)} disabled={btn} class="btn btn-primary btn-lg btn-block login-btn">Activate Account</button>
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

export default Activate;