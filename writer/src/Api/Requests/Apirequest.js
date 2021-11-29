import Invoice from "src/views/base/Invoice/invoice";
import Axios from "../config";
import axios from 'axios';
import Urls from "../urls";

const { Tokens, UpdateToken } = require("../authThenticateToken");

//import Axios from "../config";


const body =()=>{
     return{  
        "x-access-key": Tokens().accessToken,
        "x-access-token": Tokens().refreshToken
      }
    }

const ApiRequest ={
    DashBoardData:async()=>{
        try {
            const endPoint =`Dashboard`;

            const result = await Axios.post(endPoint,body());
            if(result.data == false)
            {
                const data = await UpdateToken(Tokens().refreshToken);
                if(data == true)
                {
                  const Result = await Axios.post(endPoint,body());
                  return Result;
                }
            }
            else{
                return result;
            }
     } catch (error) {
         // //console.log(error)
     }
       },

   getAssignedTask:async()=>{
    //assigned
    try {
        const endPoint =`assigned`;

        const result = await Axios.post(endPoint,body());
        if(result.data == false)
        {
            const data = await UpdateToken(Tokens().refreshToken);
            if(data == true)
            {
              const Result = await Axios.post(endPoint,body());
              return Result;
            }
        }
        else{
            return result;
        }
 } catch (error) {
      //console.log(error)
 }
   },
   getSingleTaskFullDetails:async(task_id)=>{
    //  getSingleTaskDetails
    
    try {
      const endPoint =`getSingleTaskDetails/${task_id}`;//user_id,task_id

      const result = await Axios.post(endPoint,body());
      
      if(result.data == false)
      {
          const data = await UpdateToken(Tokens().refreshToken);
          if(data == true)
          {
            const Result = await Axios.post(endPoint,body());
            return Result;
          }
      }
      else{
          return result;
      }

    }catch(e){
       
      console.log(e);
      return [];
     }
    },
    
    RejectTask:async (task_id)=>{
          
    try {
      const endPoint =`RejectTask/${task_id}`;//user_id,task_id

      const result = await Axios.post(endPoint,body());
      
      if(result.data == false)
      {
          const data = await UpdateToken(Tokens().refreshToken);
          if(data == true)
          {
            const Result = await Axios.post(endPoint,body());
            return Result;
          }
      }
      else{
          return result;
      }

    }catch(e){
       
      console.log(e);
      return [];
     }
    },

    AcceptTask:async (task_id)=>{
            
    try {
      const endPoint =`AcceptTask/${task_id}`;//user_id,task_id

      const result = await Axios.post(endPoint,body());
      
      if(result.data == false)
      {
          const data = await UpdateToken(Tokens().refreshToken);
          if(data == true)
          {
            const Result = await Axios.post(endPoint,body());
            return Result;
          }
      }
      else{
          return result;
      }

    }catch(e){
       
      console.log(e);
      return [];
     }
    },
    getCompletedTask:async ()=>{
      try {
        const endPoint =`completedTask`;

        const result = await Axios.post(endPoint,body());
        if(result.data == false)
        {
            const data = await UpdateToken(Tokens().refreshToken);
            if(data == true)
            {
              const Result = await Axios.post(endPoint,body());
              return Result;
            }
        }
        else{
            return result;
        }
 } catch (error) {
      //console.log(error)
 }
    },
    getOrdersInprogress:async ()=>{
      //inprogress
      try {
        const endPoint =`inprogress`;

        const result = await Axios.post(endPoint,body());
        if(result.data == false)
        {
            const data = await UpdateToken(Tokens().refreshToken);
            if(data == true)
            {
              const Result = await Axios.post(endPoint,body());
              return Result;
            }
        }
        else{
            return result;
        }
 } catch (error) {
      //console.log(error)
 }
    },

    cancelOrder:async(task_id)=>{
      try {
        const endPoint =`cancelOrder/${task_id}`;

        const result = await Axios.post(endPoint,body());
        if(result.data == false)
        {
            const data = await UpdateToken(Tokens().refreshToken);
            if(data == true)
            {
              const Result = await Axios.post(endPoint,body());
              return Result;
            }
        }
        else{
            return result;
        }
 } catch (error) {
      //console.log(error)
 }
    },


    uploadFiles:async (task_id,validFiles) => {
      //try {
        
    
          var formData = new FormData();
          formData.append('files', validFiles);
          formData.append( "x-access-key", Tokens().accessToken)
          formData.append("x-access-token",Tokens().refreshToken);


          await axios.post(Urls.fileUploadUrl, formData,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(async (resp)=>{
           // alert(resp.data);
           var {error,url} = resp.data;
           formData.append('path',url);


           if(!error){
            const endPoint =`FileUpload/${task_id}`;//user_id,task_id
            try {
      
    
              const result = await Axios.post(endPoint,formData);
             
              
              if(result.data == false)
              {
                  const data = await UpdateToken(Tokens().refreshToken);

                  if(data == true)
                  {
                    const Result = await Axios.post(endPoint,formData);
                    
                    formData="";
                    return Result.data;
                  }
              }
              else{
                formData="";
                    return result.data;
                }
                  
              
            } catch (error) {
              formData="";
              //  console.log(error);
            }
           }

          // console.log(resp.data);

          
          })
             //await sendUpload(endPoint,formData);
           
       
         
       // }

       
    // }catch(e){
       
    //  console.log(e);
    //  return [];
   //  }
      
       
        },

        SubmitTask2:async(file)=>{
          var formData = new FormData();
          formData.append('files', file);
          formData.append('control','submitTask');
      
           const result = await axios.post(Urls.fileUploadUrl,formData);
          
      
        if(result.data.status  === "success"){
            var ImagePath = result.data.url;
            return ImagePath;
        }
        else{
          return false;
        }
        },




    SubmitTask:async (file,task_id)=>{
      var data = "?FilePath="+file+"&task_id="+task_id;
      const endPoint =`SubmitTask`+data;//user_id,task_id


     
       
           // alert(resp.data);
          
        


           
            //const endPoint =`FileUpload/${task_id}`;//user_id,task_id
            try {
      
    
              const result = await Axios.post(endPoint,body());
             
              
              if(result.data == false)
              {
                  const data = await UpdateToken(Tokens().refreshToken);

                  if(data == true)
                  {
                    const Result = await Axios.post(endPoint,body());
                    
                   // formData="";
                    return Result.data;
                  }
              }
              else{
               // formData="";
                    return result.data;
                }
                  
              
            } catch (error) {
              //formData="";
              //  console.log(error);
            }
           

        
    },

    getTaskBeingReviewed:async ()=>{
      //TaskBeingReviewd
      try {
        const endPoint =`TaskBeingReviewd`;

        const result = await Axios.post(endPoint,body());
        if(result.data == false)
        {
            const data = await UpdateToken(Tokens().refreshToken);
            if(data == true)
            {
              const Result = await Axios.post(endPoint,body());
              return Result;
            }
        }
        else{
            return result;
        }
 } catch (error) {
      //console.log(error)
 }
    },
    getCancelled:async ()=>{
      try {
        const endPoint =`Cancelled`;

        const result = await Axios.post(endPoint,body());
        if(result.data == false)
        {
            const data = await UpdateToken(Tokens().refreshToken);
            if(data == true)
            {
              const Result = await Axios.post(endPoint,body());
              return Result;
            }
        }
        else{
            return result;
        }
 } catch (error) {
      //console.log(error)
 }
    },

    getOrdersInRevision:async ()=>{
      try {
        const endPoint =`Revision`;

        const result = await Axios.post(endPoint,body());
        if(result.data == false)
        {
            const data = await UpdateToken(Tokens().refreshToken);
            if(data == true)
            {
              const Result = await Axios.post(endPoint,body());
              return Result;
            }
        }
        else{
            return result;
        }
 } catch (error) {
      //console.log(error)
 }
    },

  getUnpaidOrders:async()=>{
   // Unpaid
   try {
    const endPoint =`Unpaid`;

    const result = await Axios.post(endPoint,body());
    if(result.data == false)
    {
        const data = await UpdateToken(Tokens().refreshToken);
        if(data == true)
        {
          const Result = await Axios.post(endPoint,body());
          return Result;
        }
    }
    else{
        return result;
    }
} catch (error) {
  //console.log(error)
}
  },
  LoadInvoices:async ()=>{
    try {
      const endPoint =`LoadInvoices`;
  
      const result = await Axios.post(endPoint,body());
      if(result.data == false)
      {
          const data = await UpdateToken(Tokens().refreshToken);
          if(data == true)
          {
            const Result = await Axios.post(endPoint,body());
            return Result;
          }
      }
      else{
          return result;
      }
  } catch (error) {
    //console.log(error)
  }
  },
  LoadInvoicesData:async(invoiceId)=>{
    //LoadInvoiceData
   
    try {
      const endPoint =`LoadInvoiceData/${invoiceId}`;
  
      const result = await Axios.post(endPoint,body());
      if(result.data == false)
      {
          const data = await UpdateToken(Tokens().refreshToken);
          if(data == true)
          {
            const Result = await Axios.post(endPoint,body());
            return Result;
          }
      }
      else{
          return result;
      }
  } catch (error) {
    //console.log(error)
  }
  },
  getUserDetails:async()=>{

    try {
      const endPoint =`getUserDetails`;
  
      const result = await Axios.post(endPoint,body());
      if(result.data == false)
      {
          const data = await UpdateToken(Tokens().refreshToken);
          if(data == true)
          {
            const Result = await Axios.post(endPoint,body());
            return Result;
          }
      }
      else{
          return result;
      }
  } catch (error) {
    //console.log(error)
  }
  },

  UpdateProfile2:async(profile)=>{
    var formData = new FormData();
    formData.append('files', profile);
    formData.append('control','writerProfile');
    //formData.append( "x-access-key", Tokens().accessToken)
   // formData.append("x-access-token",Tokens().refreshToken);
      
     const result = await axios.post(Urls.fileUploadUrl,formData);
    

  if(result.data.status  === "success"){
      var ImagePath = result.data.url;
      return ImagePath;
  }
  else{
    return false;
  }

  },
  
  UpdateProfile:async (profile)=>{
     var data = "?imagePath="+profile;
    const endPoint =`updateProfile`+data;//user_id,task_id
   
     
         //await sendUpload(endPoint,formData);
         try {
  

          const result = await Axios.post(endPoint,body());
         // console.log(result.data)
          
          if(result.data == false)
          {
              const data = await UpdateToken(Tokens().refreshToken);

              if(data == true)
              {
                const Result = await Axios.post(endPoint,body());
                
               // formData="";
                return Result.data;
              }
          }
          else{
           // formData="";
              return result.data;
              
          }
        } catch (error) {
          //ormData="";
          //  //console.log(error)
        }
  },
  UpdateData:async (data)=>{
        
    const endPoint =`UpdateProfileData?`+data;//user_id,task_id
    //?invoice=${invoice}&task_id=${task_id}
   try{
    const result = await Axios.post(endPoint,body());
    
    if(result.data == false)
    {
        const data = await UpdateToken(Tokens().refreshToken);
        if(data == true)
        {
          const Result = await Axios.post(endPoint,body());
          return Result;
        }
    }
    else{
        return result;
    }

  }catch(e){
     
    console.log(e);
    return [];
   }
  },
  clearReadNotification:async (notification_id)=>{
    const endPoint =`clearReadNotification/${notification_id}`;//user_id,task_id
    //?invoice=${invoice}&task_id=${task_id}
   try{
    const result = await Axios.post(endPoint,body());
    
    if(result.data == false)
    {
        const data = await UpdateToken(Tokens().refreshToken);
        if(data == true)
        {
          const Result = await Axios.post(endPoint,body());
          return Result;
        }
    }
    else{
        return result;
    }

  }catch(e){
     
    //console.log(e);
    return [];
   }
   },
   loadChatUsers:async (sender,receiver,taskid)=>{
    const endPoint =`chatUsers/${sender}/${receiver}/${taskid}`;//user_id,task_id
    //?invoice=${invoice}&task_id=${task_id}
   try{
    const result = await Axios.post(endPoint,body());
    
    if(result.data == false)
    {
        const data = await UpdateToken(Tokens().refreshToken);
        if(data == true)
        {
          const Result = await Axios.post(endPoint,body());
          return Result;
        }
    }
    else{
        return result;
    }

  }catch(e){
     
    //console.log(e);
    return [];
   }
   },
   getOpenTickets:async()=>{
    try {
      const endPoint = `Tickets`;
      const result = await Axios.post(endPoint,body());
     
      if(result.data == false){
       const data = await UpdateToken(Tokens().refreshToken);
       if(data == true){
         const Result = await Axios.post(endPoint,body());
           //console.log(Result)
         return Result;
       }
      }else{
       
          return result;
      }
} catch (error) {
      return[];
     console.log(error);
}
   },
   ActivateAcount:async(Key)=>{
    try {
     // alert(Key)
      const endPoint = `activate/${Key}`;
      const result = await Axios.post(endPoint,body());
     
      if(result.data == false){
       const data = await UpdateToken(Tokens().refreshToken);
       if(data == true){
         const Result = await Axios.post(endPoint,body());
           //console.log(Result)
         return Result;
       }
      }else{
       
          return result;
      }
   } catch (error) {
      //return[];
     console.log(error);
}
   },
   ForgotPassword:async(email)=>{
    try {
      const endPoint = `Forgot/${email}`;
      const result = await Axios.post(endPoint,body());
      //console.log(result)
     
      if(result.data == false){
       const data = await UpdateToken(Tokens().refreshToken);
       if(data == true){
         const Result = await Axios.post(endPoint,body());
           //console.log(Result)
         return Result;
       }
      }else{
       
          return result;
      }
} catch (error) {
      return[];
     console.log(error);
}
   },

   sendPaymentConfirmation:async (Key)=>{
    try {
      // alert(Key)
       const endPoint = `ConfirmPayMent/${Key}`;
       const result = await Axios.post(endPoint,body());
      
       if(result.data == false){
        const data = await UpdateToken(Tokens().refreshToken);
        if(data == true){
          const Result = await Axios.post(endPoint,body());
            //console.log(Result)
          return Result;
        }
       }else{
        
           return result;
       }
    } catch (error) {
       //return[];
      console.log(error);
   }
  }

} 

export  default ApiRequest;