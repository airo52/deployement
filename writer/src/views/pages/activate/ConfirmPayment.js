import '../login/login.css';
import swal from "sweetalert";
import Loader from 'react-loader-spinner';
import ApiRequest from 'src/Api/Requests/Apirequest';
import { useEffect, useState } from 'react';
import { UrlParams } from 'src/Api/auth/UrlParams';

const ConfirmPayment = ()=>{
    const [Key,setKey] = useState('');
   
    const [save,SetSave] = useState(false);

    const sendConfirmationRequest = async(key)=>{
       // Payment confirmed     
       const result = await ApiRequest.sendPaymentConfirmation(key);
       
       if(result.data === "Payment confirmed "){
           swal('success','payment confirmed','success');
           setTimeout(()=>{
            window.location.href="/#/";
       },2000) 
       } else{
           swal('error',result.data,'error');
           setTimeout(()=>{
            window.location.href="/#/";
       },2000) 
       }



    }

    useEffect(()=>{
        const key = UrlParams('Key');
        setTimeout(() => {
               if(key == false){
                  swal('error','process failed','error');
                  setTimeout(()=>{
                       window.location.href="/#/";
                  },1000) 
               }else{
                   //setKey(key);
                   setTimeout(()=>{
                    sendConfirmationRequest(key);
               },1000) 
                   
               }
        }, 2000);
        SetSave(true);
    },[])
    return <>
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

export default ConfirmPayment;