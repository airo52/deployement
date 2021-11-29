import axios from 'axios';
import download from 'js-file-download';

import { Tokens, UpdateToken } from "../authThenticateToken";
import Axios from "../config";
import Urls from '../urls';


const body =()=>{
     return{  
        "x-access-key": Tokens().accessToken,
        "x-access-token": Tokens().refreshToken
      }
    }

  async function sendUpload(endPoint,formData){
    try {
      
    
      const result = await Axios.post(endPoint,formData);
      
      if(result.data == false)
      {
          const data = await UpdateToken(Tokens().refreshToken);
          if(data == true)
          {
            const Result = await Axios.post(endPoint,formData);
            return Result.data;
          }
      }
      else{
          return result.data;
      }
    } catch (error) {
       //console.log(error)
    }
    }
  /*  unblockAdmin
    blockAdmin
    user_id*/
 const ApiRequest={
       DashBoardData:async()=>{
        try {
            const endPoint =`dashboard`;

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
       getOrdersInProgress:async ()=>{
        try {
            const endPoint = `in-progress`;
            const result = await Axios.post(endPoint,body());
           
            if(result.data == false){
             const data = await UpdateToken(Tokens().refreshToken);
             if(data == true){
               const Result = await Axios.post(endPoint,body());
                 
               return Result;
             }
            }else{
             
                return result;
            }
      } catch (error) {
            return[];
          //console.log(error)
      }
       },

       RegisterWriter:async (email,username,password,ConfirmPassword,country,address,phone,category)=>{

        var data = 'email='+email+'&username='+username+'&password='+password+'&country='+country+'&address='+address+'&phone='+phone+'&category='+category;

        try {
          const endPoint =`register/writer?`+data;

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
        //console.log(e)
       }

       },
       getCategories:async ()=>{
        try {
          const endPoint =`category`;

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
        //console.log(e)
       }
      },
      getWriters:async()=>{
        //writers
        try {
          const endPoint =`writers`//+data;

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
        //console.log(e)
       }
      },


      BlockAdmin:async(id)=>{
        try {
          const endPoint =`blockAdmin?`+"user_id="+id//+data;

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
        //console.log(e)
       }
      },
      unblockAdmin:async(id)=>{
        try {
          const endPoint =`unblockAdmin?`+"user_id="+id//+data;

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
        //console.log(e)
       }
      },



      BlockUser:async(id)=>{
        try {
          const endPoint =`block?`+"user_id="+id//+data;

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
        //console.log(e)
       }
      },
      unblockUser:async(id)=>{
        try {
          const endPoint =`unblock?`+"user_id="+id//+data;

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
        //console.log(e)
       }
      },

      getUserDetails:async (id)=>{
       // writer/details/2
       
       try {
        const endPoint =`writer/details/${id}`//+data;

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
            return result.data;
        }
     }catch(e){
      //console.log(e)
     }

       
      },
      getUnAssignedTask:async ()=>{
         
        try {
          const endPoint =`unAssignedTask`//+data;
  
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
        //console.log(e)
       }
        


      },

      asignTaskToUser:async(user_id,task_id)=>{
       
        try {
          const endPoint =`AssignTask/${user_id}/${task_id}`;//user_id,task_id
  
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
         
        //console.log(e)
        return [];
       }

      },

      postAllowedTaskNumber:async (number)=>{
        //allowedTask
        try {
          const endPoint =`allowedTask/${number}`;//user_id,task_id
  
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
         
        //console.log(e)
        return [];
       }
      },

      postSequence:async (sequence)=>{
       // sequence
       try {
        const endPoint =`sequence/${sequence}`;//user_id,task_id

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
       
      //console.log(e)
      return [];
     }
      },

      updateCategory:async (category,user_id)=>{
        try {
          const endPoint =`updateCategory/${category}/${user_id}`;//user_id,task_id
  
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
         
        //console.log(e)
        return [];
       }
      },


      uploadFiles2:async (validFiles)=>{
        var formData = new FormData();
        formData.append('files', validFiles);
        formData.append('control','uploadTaskFile');
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

     uploadFiles:async (task_id,validFiles) => {
   

           var data = "?task_id="+task_id+"&imagePath="+validFiles;
            const endPoint =`FileUpload`+data;//user_id,task_id
            try {
      
    
              const result = await Axios.post(endPoint,body());
             
              
              if(result.data == false)
              {
                  const data = await UpdateToken(Tokens().refreshToken);

                  if(data == true)
                  {
                    const Result = await Axios.post(endPoint,body());
                    
                    //formData="";
                    return Result.data;
                  }
              }
              else{
               // formData="";
                    return result.data;
                }
                  
              
            } catch (error) {
          
            }
         
       
        },

     postTask:async(title,category,time,expectedDate,pages,pricePerpage,totalAmountTobePaid,description,work_type,service,selectedInvoice,selectedInvoiceEndDate,invoiceId)=>{
      
    
      var data = "title="+title+"&category="+category+"&time="+time+"&expectedDate="+expectedDate+"&pages="+pages+"&pricePerpage="+pricePerpage+"&totalAmountTobePaid="+totalAmountTobePaid+"&description="+description+"&work_type="+work_type+"&service="+service+"&invoiceState="+selectedInvoice.replace('#','')+"&EndDate="+selectedInvoiceEndDate+"&invoiceId="+invoiceId;
      try {
        const endPoint =`createTask?`+data;///user_id,task_id

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
       
      //console.log(e)
      return [];
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
         
        //console.log(e)
        return [];
       }
      },


   
      getDataFromURL:(url) => new Promise((resolve, reject) => {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        //headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
        headers.append('Origin','http://localhost:3000');
        setTimeout(() => {
            fetch(url, {
              mode: 'cors',
              credentials: 'include',
              method: 'GET',
              headers: headers
          })
                .then(response => response.text())
                .then(data => {
                    resolve(data)
                });
        },2000);
    //}, 2000);
      }),

      apihelperdownload:async ()=> {
        return await axios.post("http://localhost:4000/peakwriter/api/c1/admin/"+"downloadFile",{responseType: 'blob' }).then(function (response) {
            return response;
        })
    },

    deleteTask:async (taskId)=>{
      try {
        const endPoint =`removeTask?id=${taskId}`;//user_id,task_id

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
         
        ////console.log(e)
        return [];
       }
    },


    getAssignedTask:async ()=>{
      try {
        const endPoint =`getAssignedTask`;//user_id,task_id

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
         
        //console.log(e)
        return [];
       }
    },

    CancellOrder:async (taskId)=>{
      try {
        const endPoint =`CancellTask?task_id=${taskId}`;//user_id,task_id

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
         
        //console.log(e)
        return [];
       }
    },

    getCancelledOrders:async ()=>{
    //  CancelledOrders
    try {
      const endPoint =`CancelledOrders`;//user_id,task_id

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
       
      //console.log(e)
      return [];
     }
    },

    getOrdersBeingRevised:async ()=>{
      //Revisions
      try {
        const endPoint =`Revisions`;//user_id,task_id
  
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
         
        //console.log(e)
        return [];
       }
    },
    getCompletedOrders:async ()=>{
      try {
        const endPoint =`CompletedOrders`;//user_id,task_id
  
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
         
        //console.log(e)
        return [];
       }
    },

    getPendingPayments:async ()=>{
      try {
        const endPoint =`pendingPayments`;//user_id,task_id
  
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
         
        //console.log(e)
        return [];
       }
    },

    markTaskPaid:async (invoice,task_id)=>{
      
      try {
      
        var data = '?invoice='+invoice.replace('#','')+'&task_id='+task_id;
        const endPoint =`conFirmPayment`+data;//user_id,task_id
        //?invoice=${invoice}&task_id=${task_id}
  
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
         
        //console.log(e)
        return [];
       }
    },

    LoadInvoices:async ()=>{
      
      
      const endPoint =`LoadInvoices`;//user_id,task_id
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
       
      //console.log(e)
      return [];
     }

    },

    LoadInvoiceDetails:async (invoiceId)=>{
      const endPoint =`LoadInvoicesDetails?invoiceId=${invoiceId}`;//user_id,task_id
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
       
      //console.log(e)
      return [];
     }
    },

    getAdminData:async ()=>{
      //getAdminData

      const endPoint =`getAdminData`;//user_id,task_id
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
       
      //console.log(e)
      return [];
     }

    },

    getRegAdminData:async(id)=>{
      const endPoint =`getRegAdminData/${id}`;//user_id,task_id
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
       
      //console.log(e)
      return [];
     }
    },


    UpdateProfile2:async(profile)=>{
      var formData = new FormData();
      formData.append('files', profile);
      formData.append('control','adminProfile');
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
/*
    UpdateProfile:async (profile)=>{
      const endPoint =`updateProfile`;//user_id,task_id
     
        var formData = new FormData();
        formData.append('files', profile);
        formData.append( "x-access-key", Tokens().accessToken)
        formData.append("x-access-token",Tokens().refreshToken)
           //await sendUpload(endPoint,formData);
           try {
    
  
            const result = await Axios.post(endPoint,formData);
           // console.log(result.data)
            
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
            // //console.log(error)
          }
    },*/

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
       
      //console.log(e)
      return [];
     }
    },

    getAllAdministrators:async ()=>{
      const endPoint =`getAdministrators`;//user_id,task_id
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
       
      //console.log(e)
      return [];
     }
    },

    RegisterAdmins:async (email,username,password,ConfirmPassword,country,address,phone,category)=>{

      var data = 'email='+email+'&username='+username+'&password='+password+'&country='+country+'&address='+address+'&phone='+phone+'&adminLevel='+category;

      try {
        const endPoint =`register/admin?`+data;

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
      //console.log(e)
     }

     },

     getNewSubmitedFiles:async ()=>{
     //  alert('ok')
      const endPoint =`NewSubmitedTask`;//user_id,task_id
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
       
      //console.log(e)
      return [];
     }
     },

     getSubmitedFiles:async (taskId)=>{
     if(taskId === "" || taskId == undefined){
       return[];
     }
      const endPoint =`NewSubmitedFiles/${taskId}`;//user_id,task_id
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
       
      //console.log(e)
      return [];
     }
     },

     sendRevisionRequest:async(taskId,message)=>{
        var data = 'task_id='+taskId+'&message='+message;
       const endPoint =`requestRevision?`+data;//user_id,task_id
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
        
       //console.log(e)
       return [];
      }
     },

     markTaskCompleted:async(task_id)=>{
      const endPoint =`markComplete/${task_id}`;//user_id,task_id
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
       
      //console.log(e)
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
       
      ////console.log(e)
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
       
      ////console.log(e)
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
             
           return Result;
         }
        }else{
         
            return result;
        }
  } catch (error) {
        return[];
      //console.log(error)
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
             //
           return Result;
         }
        }else{
         
            return result;
        }
  } catch (error) {
        //return[];
      //console.log(error)
  }
     },
     ForgotPassword:async(email)=>{
      try {
        const endPoint = `Forgot/${email}`;
        const result = await Axios.post(endPoint,body());
        //
       
        if(result.data == false){
         const data = await UpdateToken(Tokens().refreshToken);
         if(data == true){
           const Result = await Axios.post(endPoint,body());
             //
           return Result;
         }
        }else{
         
            return result;
        }
  } catch (error) {
        return[];
      //console.log(error)
  }
     },

     fileDownload:async ()=>{
        
      try {
             const endPoint = 'downloadFile';
            axios.get('http://localhost/~tony/Download/index.php')
             .then(resp => {
                    download(resp.data, 'bb.pdf');
             });
             
           
      } catch (error) {
        
      }
    



  
    },
    
    LoadOpenInvoices:async ()=>{
      try {
        // alert(Key)
         const endPoint = `LoadOpenInvoices`;
         const result = await Axios.post(endPoint,body());
        
         if(result.data == false){
          const data = await UpdateToken(Tokens().refreshToken);
          if(data == true){
            const Result = await Axios.post(endPoint,body());
              //
            return Result;
          }
         }else{
          
             return result;
         }
   } catch (error) {
         //return[];
       //console.log(error)
   }
    },

    CloseInvoice:async (invoice_id)=>{
      try {
        // alert(Key)
         const endPoint = `CloseInvoice/${invoice_id}`;
         const result = await Axios.post(endPoint,body());
        
         if(result.data == false){
          const data = await UpdateToken(Tokens().refreshToken);
          if(data == true){
            const Result = await Axios.post(endPoint,body());
              //
            return Result;
          }
         }else{
          
             return result;
         }
   } catch (error) {
         //return[];
       //console.log(error)
   }
    }


 }   
    

export  default ApiRequest;