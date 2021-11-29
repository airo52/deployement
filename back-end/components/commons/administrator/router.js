const { response } = require('express');
const express = require('express');
var formidable  = require('formidable');
const { environment } = require('../../config/config');
const { autheticateToken, VerifyAcessToken, VerifyRefreshToken } = require('../../config/jwt');
const { tokens } = require('../../config/retrieveClientToken');
const { Authetication } = require('../Auth/Authentication');
const { FileHandler, ProcessFormData, FormSafeExtractor } = require('../functions/fileHandler');
const NotificationHandler = require('../functions/NotificationHandler');
const Payments = require('../functions/payments/payments');
const seatings = require('../functions/seatings');
const TaskManager = require('../functions/Task');
const Users = require('../functions/Users');
const DashBoard = require('./dashboard/dashboard');
const Orders = require('./Orders/Orders');
const AdminRouter = express.Router();
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');


AdminRouter.post(`${environment.baseUrlAdmin}register/admin`,autheticateToken,async(req,res)=>{
    
    const {email,password,username,country,phone,address,adminLevel} = req.query;
    const type = 'admin';

    const result = await Authetication.Register(email,password,username,country,phone,address,adminLevel,type);

    res.json(result);

})

AdminRouter.post(`${environment.baseUrlAdmin}register/writer`,autheticateToken,async(req,res)=>{
    //res.json("hello");
    const {email,password,username,country,phone,address,category} = req.query;
    const type = 'writer';

    const result = await Authetication.Register(email,password,username,country,phone,address,category,type)

   res.json(result)

})

AdminRouter.post(`${environment.baseUrlAdmin}Login/admin`,autheticateToken,async (req,res)=>{
    const {email,password}=req.query;
    const type = "admin";
    

    const result = await Authetication.Login(email,password,type);
  
    res.json(result);
})

AdminRouter.post(`${environment.baseUrlAdmin}Logout/:refreshToken`,async (req,res)=>{
    const refreshToken= req.params.refreshToken;

      await Authetication.Logout(refreshToken,res);
})

AdminRouter.post(`${environment.baseUrlAdmin}veryAccessToken`,autheticateToken,async (req,res)=>{
    const {accessToken}=req.query;
   
   const result = await VerifyAcessToken(accessToken,res);
    res.json(result);
})

AdminRouter.post(`${environment.baseUrlAdmin}refreshToken`,autheticateToken,async (req,res)=>{
    const {refreshToken} = req.query;
    await VerifyRefreshToken(refreshToken,res);
    
})

AdminRouter.post(`${environment.baseUrlAdmin}category`,autheticateToken,async (req,res)=>{

    const responseToken = await tokens.User(req.body,res);
  
    const dashBoard = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super" || type == "manager"){
        dashBoard.instance= new DashBoard();

        const result =await dashBoard.instance.getCategories();
       
        delete dashBoard.instance;
        res.json(result);
        delete result;
        }
    }else{
        res.json(false);
    }
})

AdminRouter.post(`${environment.baseUrlAdmin}dashboard`,autheticateToken,async (req,res)=>{
    // console.log(req.body)
    let io = req.io;
    const responseToken = await tokens.User(req.body,res);
    const dashBoard = {};
    if(responseToken !==false){
        const {type,id,email} = responseToken;
       //  console.log(responseToken)
        if(type === "super" || type == "manager"){
        dashBoard.instance= new DashBoard();
        var Notification = new NotificationHandler(io);
        //console.log(email)
            Notification.getUnreadNotificationsForAdmin(email);

        const result =await dashBoard.instance.getDashBoardData(); 
        delete dashBoard.instance;
        res.json(result);
        delete result;
        }
    }else{
        res.json(false);
    }

});

AdminRouter.post(`${environment.baseUrlAdmin}in-progress`,autheticateToken,async (req,res)=>{
      //const io = req.io;

     
      //io.emit('message',{home:"boom"});
       //io.emit('message',{home:"boom"});
     // console.log(io)
     // io.sendSingle('fuck yeah');
    //console.log(io);
    const responseToken = await tokens.User(req.body,res);
    const Task = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
       
        if(type === "super" || type == "manager"){
            Task.instance = new Orders();

            const result = await Task.instance.ordersInProgress();
            
            delete Task.instance;
            //io.sendMessage('booomm');
            
            
           //.log(result)
            res.json(result);
            delete result;
        }
    }else{
            res.json(false);
    }
})

AdminRouter.post(`${environment.baseUrlAdmin}writers`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super" || type == "manager"){
        User.instance= new Users();
        

        const result =await User.instance.getWriters(); 
        delete User.instance;
        res.json(result);
        delete result;
        }
    }else{
        res.json(false);
    }
})


AdminRouter.post(`${environment.baseUrlAdmin}block`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super" || type == "manager"){
        User.instance= new Users();
        const {user_id}= req.query;

        const result =await User.instance.BlockWriter(user_id);
        delete User.instance;
        res.json(result);
        delete result;
        }
    }else{
        res.json(false);
    }
})
AdminRouter.post(`${environment.baseUrlAdmin}unblock`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super" || type == "manager"){
            User.instance= new Users();
        
        const {user_id}= req.query;

        const result =await User.instance.UblockWriter(user_id);
        delete User.instance;
        res.json(result);
        delete result;
        }
    }else{
        res.json(false);
    }
})


AdminRouter.post(`${environment.baseUrlAdmin}blockAdmin`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super"){
        User.instance= new Users();
        const {user_id}= req.query;

        const result =await User.instance.BlockAdmins(user_id);
        delete User.instance;
        res.json(result);
        delete result;
        }
    }else{
        res.json(false);
    }
})
AdminRouter.post(`${environment.baseUrlAdmin}unblockAdmin`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super"){
            User.instance= new Users();
        
        const {user_id}= req.query;

        const result =await User.instance.UblockAdmin(user_id);
        delete User.instance;
        res.json(result);
        delete result;
        }
    }else{
        res.json(false);
    }
})





AdminRouter.post(`${environment.baseUrlAdmin}writer/details/:user_id`,autheticateToken,async (req,res)=>{
    
    const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super" || type == "manager"){
            User.instance= new Users();
        
        const {user_id}= req.params;
       

        const result =await User.instance.getWriterFullDetails(user_id);
        delete User.instance;
        res.json(result);
        delete result;
        }
    }else{
        res.json(false);
    }
})

AdminRouter.post(`${environment.baseUrlAdmin}unAssignedTask`,autheticateToken,async (req,res)=>{
     //var Task = new TaskManager();
  
    const responseToken = await tokens.User(req.body,res);
    const Task = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super" || type == "manager"){
            //Task.instance= new TaskManager();
            Task.instance = new TaskManager();
        
       // const {user_id}= req.params;
    

        const result =await Task.instance.getUnassignedTask();
        delete Task.instance;
        res.json(result);
        delete result;
        }
    }else{
        res.json(false);
    }

})

AdminRouter.post(`${environment.baseUrlAdmin}AssignTask/:user_id/:task_id`,autheticateToken,async (req,res)=>{
    //var Task = new TaskManager();
 
   const responseToken = await tokens.User(req.body,res);
   const Task = {};
   if(responseToken !==false){
       const {type,id} = responseToken;
       if(type === "super" || type == "manager"){
           Task.instance= new TaskManager();
       
       const {user_id,task_id}= req.params;
     

       const result =await Task.instance.assignTask(task_id,user_id);
       delete Task.instance;
       res.json(result);
       delete result;
       }
   }else{
       res.json(false);
   }

})

AdminRouter.post(`${environment.baseUrlAdmin}allowedTask/:number`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const Task = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super"){
            Task.instance= new seatings();
        
        const {number}= req.params;
       
 
        const result =await Task.instance.updateAllowedTask(number);
        delete Task.instance;
        res.json(result);
        delete result;
        }else{
            res.json('You Are not allowed to perform this operstion')  
        }
    }else{
        res.json(false);
    }
})

AdminRouter.post(`${environment.baseUrlAdmin}sequence/:sequence`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const Task = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super"){
            Task.instance= new seatings();
        
        const {sequence}= req.params;
       
 
        const result =await Task.instance.updateBillingSequence(sequence);
        delete Task.instance;
        res.json(result);
        delete result;
        }else{
            res.json('You Are not allowed to perform this operstion')  
        }
    }else{
        res.json(false);
    }
})

AdminRouter.post(`${environment.baseUrlAdmin}updateCategory/:category/:user_id`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super" || type==="manager"){
            User.instance= new Users();
        
        const {category,user_id}= req.params;
       
 
        const result =await User.instance.updateWriterCategory(category,user_id);
        delete User.instance;
        res.json(result);
        delete result;
        }else{
            res.json('You Are not allowed to perform this operstion')  
        }
    }else{
        res.json(false);
    }
})


AdminRouter.post(`${environment.baseUrlAdmin}FileUpload`,autheticateToken, async (req,res)=>{
    //var data =await FormSafeExtractor(req);

    const responseToken = await tokens.User(req.body,res);
    const File = {};
    if(responseToken !==false){
   //var FilePath = data.fields['path'];

   

        
     const {type,id} = responseToken;
        if(type === "super" || type==="manager"){
          //  File.instance= FileHandler;
           // var fullUrl = req.protocol + '://' + req.get('host'); //+ req.originalUrl;
        const {task_id,imagePath}= req.query;
    
    

               var Task = new TaskManager();
               //const imagePath = FilePath;//fullUrl + result.path.replace("./public","");
            Task.postFileUrl(task_id,imagePath);
             res.json(true);
             delete Task;
             res.end();
        
         
      //  }
       delete result;
        }else{
            //res.json('You Are not allowed to perform this operstion')  
        }
   }else{
        res.json(false);
    }
})

AdminRouter.post(`${environment.baseUrlAdmin}createTask`,autheticateToken,async(req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super" || type==="manager"){
            User.instance= new TaskManager();
            
        
        const {title,category,time,expectedDate,pages,pricePerpage,totalAmountTobePaid,description,work_type,service,invoiceState,EndDate,invoiceId}= req.query;
      
 
        const result =await User.instance.postTask(title,category,time,expectedDate,pages,pricePerpage,totalAmountTobePaid,description,work_type,service,id,invoiceState,EndDate,invoiceId)
        delete User.instance;
        res.json(result);
        delete result;
        }else{
            res.json('You Are not allowed to perform this operstion')  
        }
    }else{
        res.json(false);
    }
})

AdminRouter.post(`${environment.baseUrlAdmin}getSingleTaskDetails/:task_id`,autheticateToken,async(req,res)=>{
    //getTaskFullDetails
    const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super" || type==="manager"){
            User.instance= new TaskManager();
        
        const {task_id}=req.params;
       
 
        const result =await User.instance.getTaskFullDetails(task_id);
        delete User.instance;
        res.json(result);
        delete result;
        }else{
            res.json('You Are not allowed to perform this operstion')  
        }
    }else{
        res.json(false);
    }
})

AdminRouter.get('api/resume',async(req,res)=>{
    try {
        const file = `${__dirname}/public/files/Task471109w3logo.jpeg`;
        res.download(file);
       // console.log('here');
      } catch (err) {
        console.log(err);
      }
})
AdminRouter.get(`${environment.baseUrlAdmin}downloadFile`,async (req,res)=>{
    //const {Url} = req.query;
   
  // var FileLocation ="./public/files/Task367960GRADUATION LIST- DEC 2021 FOR NOTICE BOARD.pdf"; //"./public/files/"+Url.split('files/')[1];
  //res.download(FileLocation)
  //var  file=Url.split('files/')[1];
 // console.log(`the data is ${FileLocation}`)
  // var  file=Url.split('files/')[1];
  var file='File.pdf';
  //res.download(FileLocation);
 //res.download(FileLocation, file, (err) => {
  //                if (err) console.log(err);
    //          });

/*
    var file = fs.createReadStream('./public/files/Task221080blop (2).pdf', 'binary');
var stat = fs.statSync('./public/files/Task221080blop (2).pdf');
res.setHeader('Content-Length', stat.size);
res.setHeader('Content-Type', 'application/pdf');
res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
res.pipe(file, 'binary');
res.end(); */
})

AdminRouter.post(`${environment.baseUrlAdmin}removeTask`,autheticateToken,async (req,res)=>{
   const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
       const {type,id} = responseToken;
       if(type === "super" || type==="manager"){
            User.instance= new TaskManager();
         const {id} = req.query;
          if(id == undefined){
              res.json('provide task');
              return;
          }
        
       var data=await   User.instance.deleteTask(id);

       res.json(data)


 

        delete User.instance;
        //res.json(result);
       delete data;
        }else{
           res.json('You Are not allowed to perform this operstion')  
       }
    }else{
        res.json(false);
   }
})

AdminRouter.post(`${environment.baseUrlAdmin}getAssignedTask`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const Task ={};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super" || type==="manager"){
            Task.instance =new Orders();
      
       
 
       
        const result = await Task.instance.AssignedOrders();
        delete Task.instance;
        res.json(result);
        delete result;
        }else{
            res.json('You Are not allowed to perform this operstion')  
        }
    }else{
        res.json(false);
    }

   


   // res.json(result);
})

AdminRouter.post(`${environment.baseUrlAdmin}CancellTask`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const Task ={};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super" || type==="manager"){
            Task.instance =new TaskManager();
            const {task_id} = req.query;
      
        const result = await Task.instance.CancellTask(task_id);
        delete Task.instance;
        res.json(result);
        delete result;
        }else{
            res.json('You Are not allowed to perform this operstion')  
        }
    }else{
        res.json(false);
    }

   
})

AdminRouter.post(`${environment.baseUrlAdmin}CancelledOrders`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const Task ={};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super" || type==="manager"){
            Task.instance =new Orders();
        
        const result = await Task.instance.CancelledOrders();
        delete Task.instance;
        res.json(result);
        delete result;

        }else{
            res.json('You Are not allowed to perform this operstion')  
        }
    }else{
        res.json(false);
    }

})

AdminRouter.post(`${environment.baseUrlAdmin}Revisions`,autheticateToken,async (req,res)=>{
  //  revision
  const responseToken = await tokens.User(req.body,res);
  const Task ={};
  if(responseToken !==false){
      const {type,id} = responseToken;
      if(type === "super" || type==="manager"){
          Task.instance =new Orders();
      
      const result = await Task.instance.OrdersBeingRevised();
      delete Task.instance;
      res.json(result);
      delete result;

      }else{
          res.json('You Are not allowed to perform this operstion')  
      }
  }else{
      res.json(false);
  }
})

AdminRouter.post(`${environment.baseUrlAdmin}CompletedOrders`,autheticateToken,async (req,res)=>{
    //completed
    const responseToken = await tokens.User(req.body,res);
  const Task ={};
  if(responseToken !==false){
      const {type,id} = responseToken;
      if(type === "super" || type==="manager"){
          Task.instance =new Orders();
      
      const result = await Task.instance.CompletedOrders();
      delete Task.instance;
      res.json(result);
      delete result;

      }else{
          res.json('You Are not allowed to perform this operstion')  
      }
  }else{
      res.json(false);
  }

})

AdminRouter.post(`${environment.baseUrlAdmin}pendingPayments`,autheticateToken,async (req,res)=>{
 
      const responseToken = await tokens.User(req.body,res);
      const Payment = {};
    
      if(responseToken !==false){
          const {type,id} = responseToken;
          if(type === "super" || type==="manager"){
            Payment.instance = new Payments();
          
          const result = await Payment.instance.getPendingPayments();
          delete Payment.instance;
          res.json(result);
          delete result;
  
          }else{
              res.json('You Are not allowed to perform this operstion')  
          }
      }else{
          res.json(false);
      }
})

AdminRouter.post(`${environment.baseUrlAdmin}conFirmPayment`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const Payment = {};
  
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super" || type==="manager"){
          Payment.instance = new Payments();
          //console.log(req.query)
          const {invoice,task_id} = req.query;
          if(invoice == undefined && task_id == undefined) {
                res.json([]);
              return
          }
        const result = await Payment.instance.ConfirmPayment(invoice,task_id);
        delete Payment.instance;
        res.json(result);
        delete result;

        }else{
            res.json('You Are not allowed to perform this operstion')  
        }
    }else{
        res.json(false);
    }
})

AdminRouter.post(`${environment.baseUrlAdmin}LoadInvoices`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const Payment = {};
  
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super" || type==="manager"){
          Payment.instance = new Payments();
          //console.log(req.query)
        
        const result = await Payment.instance.LoadInvoices();
        delete Payment.instance;
        res.json(result);
        delete result;

        }else{
            res.json('You Are not allowed to perform this operstion')  
        }
    }else{
        res.json(false);
    }
})

AdminRouter.post(`${environment.baseUrlAdmin}LoadInvoicesDetails`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const Payment = {};
  
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super" || type==="manager"){
          Payment.instance = new Payments();
          const {invoiceId} = req.query;

          if(invoiceId === undefined || invoiceId === ""){
              return [];
          }
          //console.log(req.query)
        
        const result = await Payment.instance.getInvoiceFullDetails(invoiceId);
        delete Payment.instance;
        res.json(result);
        delete result;

        }else{
            res.json('You Are not allowed to perform this operstion')  
        }
    }else{
        res.json(false);
    }
})

//getRegAdminData

AdminRouter.post(`${environment.baseUrlAdmin}getAdminData`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
  
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super" || type==="manager"){
          User.instance = new Users();
         // const {invoiceI} = req.query;

          //console.log(req.query)
        
        const result = await User.instance.getAdmins(id);
        delete User.instance;
        res.json(result);
        delete result;

        }else{
            res.json('You Are not allowed to perform this operstion')  
        }
    }else{
        res.json(false);
    }
})

AdminRouter.post(`${environment.baseUrlAdmin}getRegAdminData/:user_id`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
  
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super"){
          User.instance = new Users();
          
          const {user_id} = req.params;

          //console.log(req.query)
        
        const result = await User.instance.getAdmin(user_id);
        delete User.instance;
        res.json(result);
        delete result;

        }else{
            res.json('You Are not allowed to perform this operstion')  
        }
    }else{
        res.json(false);
    }
})




AdminRouter.post(`${environment.baseUrlAdmin}updateProfile`,autheticateToken,async (req,res)=>{
    
    const responseToken = await tokens.User(req.body,res);
    const File = {};
    if(responseToken !==false){
   
       
     //   res.json(true);

        
     const {type,id} = responseToken;
        if(type === "super" || type==="manager"){
          
        const {imagePath}= req.query
  

             var Task = new Users();
              // const imagePath =fullUrl + result.path.replace("./public/profiles","/profiles");

               const resul  = await Task.updateAdminProfile(imagePath,id);
             if(resul)
                res.json('success');
             delete Task;
           
        }else{
            //res.json('You Are not allowed to perform this operstion')  
        }
   }else{
        res.json(false);
    }
})

AdminRouter.post(`${environment.baseUrlAdmin}UpdateProfileData`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
  
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super" || type==="manager"){
          User.instance = new Users();
         // const {invoiceI} = req.query;

          //console.log(req.query)
        
        const result = await User.instance.updateProfileData(req.query,id);
        delete User.instance;
        res.json(result);
        delete result;

        }else{
            res.json('You Are not allowed to perform this operstion')  
        }
    }else{
        res.json(false);
    }
})

AdminRouter.post(`${environment.baseUrlAdmin}getAdministrators`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
  
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "super" || type==="manager"){
          User.instance = new Users();
         // const {invoiceI} = req.query;

          //console.log(req.query)
        
        const result = await User.instance.getAdministrators(id);
        delete User.instance;
        res.json(result);
        delete result;

        }else{
            res.json('You Are not allowed to perform this operstion')  
        }
    }else{
        res.json(false);
    }
})

AdminRouter.post(`${environment.baseUrlAdmin}NewSubmitedTask`,autheticateToken,async (req,res)=>{
   
    const responseToken = await tokens.User(req.body,res);
    const Task = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
       
        if(type === "super" || type == "manager"){
            Task.instance = new Orders();

            const result = await Task.instance.NewSubmitedTask();
           
            delete Task.instance;
            res.json(result);
            delete result;
        }
    }else{
            res.json(false);
    }
})
//http://localhost:4000/peakwriter/api/c1/admin/NewSubmitedFiles/2
AdminRouter.post(`${environment.baseUrlAdmin}NewSubmitedFiles/:task_id`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const Task = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
       
        if(type === "super" || type == "manager"){
            Task.instance = new Orders();
            const {task_id} = req.params;

            const result = await Task.instance.NewSubmitedFiles(task_id);
           
            delete Task.instance;
            res.json(result);
            delete result;
        }
    }else{
            res.json(false);
    }
})

AdminRouter.post(`${environment.baseUrlAdmin}requestRevision`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const Task = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
       
        if(type === "super" || type == "manager"){
            Task.instance = new TaskManager();
            const {task_id,message} = req.query;

            const result = await Task.instance.SetTaskForRevision(task_id,message);
           
            delete Task.instance;
            res.json(result);
            delete result;
        }
    }else{
            res.json(false);
    }
})

AdminRouter.post(`${environment.baseUrlAdmin}markComplete/:task_id`,autheticateToken,async (req,res)=>{

   

    const responseToken = await tokens.User(req.body,res);
    const Task = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
       
        if(type === "super" || type == "manager"){
            Task.instance = new TaskManager();
            const {task_id} = req.params;

            const result = await Task.instance.markTaskComplete(task_id);
           
            delete Task.instance;
            res.json(result);
            delete result;
        }
    }else{
            res.json(false);
    }
})

AdminRouter.post(`${environment.baseUrlAdmin}clearReadNotification/:notification_id`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const Task = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
       
        if(type === "super" || type == "manager"){
            Task.instance = new NotificationHandler(req.io);
            const {notification_id} = req.params;

            const result = await Task.instance.clearReadNotifications(notification_id);
           
            delete Task.instance;
            res.json(result);
            delete result;
        }
    }else{
            res.json(false);
    }
})

AdminRouter.post(`${environment.baseUrlAdmin}chatUsers/:sender/:receiver/:task_id`,autheticateToken,async(req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const Task = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
       
        if(type === "super" || type == "manager"){
            Task.instance = new Users();
            const {sender,receiver,task_id} = req.params;

            //console.log(receiver)

            const result = await Task.instance.getChatUsers('admin',sender,receiver,task_id);
           
            delete Task.instance;
            res.json(result);
            delete result;
        }
    }else{
            res.json(false);
    }
})

AdminRouter.post(`${environment.baseUrlAdmin}Tickets`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const Task = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
       
        if(type === "super" || type == "manager"){
            Task.instance = new TaskManager();

            const result = await Task.instance.getOpenTickets();
            
            delete Task.instance;
            //io.sendMessage('booomm');
            
            
           //.log(result)
            res.json(result);
            delete result;
        }
    }else{
            res.json(false);
    }
})

AdminRouter.post(`${environment.baseUrlAdmin}activate/:Key`,autheticateToken,async(req,res)=>{
    const Task = {};

            Task.instance = new Users();

            const result = await Task.instance.ActivateAdmin(req.params.Key);
            console.log(result)
            
            delete Task.instance;
          
            res.json(result);
            delete result;
  
})

AdminRouter.post(`${environment.baseUrlAdmin}Forgot/:email`,autheticateToken,async(req,res)=>{
 
    const Task = {};
  
            Task.instance = new Users();

            const result = await Task.instance.ForgotPassword('admin',req.params.email);
         //   console.log(result)
            
            delete Task.instance;
           
            
            
           //.log(result)
            res.json(result);
            delete result;
 
})

AdminRouter.post(`${environment.baseUrlAdmin}LoadOpenInvoices`,autheticateToken,async(req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    
    const Task = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
       
        if(type === "super" || type == "manager"){
            Task.instance = new TaskManager();

            const result = await Task.instance.LoadOpenInvoices();
            
            delete Task.instance;
            //io.sendMessage('booomm');
            
            
           //.log(result)
            res.json(result);
            delete result;
        }
    }else{
            res.json(false);
    }
})

AdminRouter.post(`${environment.baseUrlAdmin}CloseInvoice/:invoice_id`,autheticateToken,async(req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    
    const Task = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
       
        if(type === "super" || type == "manager"){
            Task.instance = new TaskManager();

            const {invoice_id} = req.params;
            const result = await Task.instance.CloseInvoice(invoice_id);
            
            delete Task.instance;
            //io.sendMessage('booomm');
            
            
           //.log(result)
            res.json(result);
            delete result;
        }
    }else{
            res.json(false);
    }
})
module.exports = AdminRouter;