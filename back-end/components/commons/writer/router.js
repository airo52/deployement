const express = require('express');
var formidable = require('formidable');
var forms = formidable({ multiples: false });
const { environment } = require('../../config/config');
const { autheticateToken, VerifyRefreshToken, VerifyAcessToken } = require('../../config/jwt');
const { tokens } = require('../../config/retrieveClientToken');
const { Authetication } = require('../Auth/Authentication');
const { ProcessFormData, FileHandler, FormSafeExtractor } = require('../functions/fileHandler');
const { NotificationForReject, CancelOrderNotification } = require('../functions/Notification');
const { FilesManager } = require('../functions/outApi/filesApi');
const Payments = require('../functions/payments/payments');
const TaskManager = require('../functions/Task');
const Users = require('../functions/Users');
const WriterDashboard = require('./dashboard/writerDashBoard');
const WriterTaskManager = require('./Task/writerTaskManager');
const WriterData = require('./writerData/writerData');

const WriterRouter = express.Router();


WriterRouter.post(`${environment.baseUrlWriter}Login`,autheticateToken,async (req,res)=>{
   // console.log(req)
    
    const {email,password}=req.query;
    const type = "writer";
    

    const result = await Authetication.Login(email,password,type);

   // console.log(result)
  
    res.json(result);
})

WriterRouter.post(`${environment.baseUrlWriter}Logout/:refreshToken`,async (req,res)=>{
    const refreshToken= req.params.refreshToken;

      await Authetication.Logout(refreshToken,res);
})

WriterRouter.post(`${environment.baseUrlWriter}veryAccessToken`,autheticateToken,async (req,res)=>{
    const {accessToken}=req.query;
   
   const result = await VerifyAcessToken(accessToken,res);
    res.json(result);
})

WriterRouter.post(`${environment.baseUrlWriter}refreshToken`,autheticateToken,async (req,res)=>{
    const {refreshToken} = req.query;

    await VerifyRefreshToken(refreshToken,res);
    
})

WriterRouter.post(`${environment.baseUrlWriter}Dashboard`,autheticateToken,async (req,res)=>{

    
    const responseToken = await tokens.User(req.body,res);
    const dashBoard = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "writer"){
        
        dashBoard.instance= new WriterDashboard(id);

        const result =await dashBoard.instance.getDashBoardData(); 
        delete dashBoard.instance;
        res.json(result);
        delete result;
        }
    }else{
        res.json(false);
    }
})

WriterRouter.post(`${environment.baseUrlWriter}assigned`,autheticateToken,async (req,res)=>{
    
    const responseToken = await tokens.User(req.body,res);
    const Data = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "writer"){
        
        Data.instance= new WriterData(id);

        const result =await Data.instance.getAssignedTask(); 
        delete Data.instance;
        res.json(result);
        delete result;
        }
    }else{
        res.json(false);
    }
})


WriterRouter.post(`${environment.baseUrlWriter}getSingleTaskDetails/:task_id`,autheticateToken,async (req,res)=>{
    
    const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "writer"){
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

WriterRouter.post(`${environment.baseUrlWriter}AcceptTask/:task_id`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "writer"){
            User.instance= new WriterTaskManager()
        
        const {task_id}=req.params;
       
 
        const result =await User.instance.acceptTask(task_id,id);
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

WriterRouter.post(`${environment.baseUrlWriter}RejectTask/:task_id`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "writer"){
            User.instance= new WriterTaskManager()
        
        const {task_id}=req.params;
      
 
        const result =await User.instance.RejectTask(id,task_id);
        await NotificationForReject(id,task_id);
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

WriterRouter.post(`${environment.baseUrlWriter}completedTask`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "writer"){
            
            User.instance= new WriterData(id)
        
     
       
 
        const result =await User.instance.getCompletedTask();
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

WriterRouter.post(`${environment.baseUrlWriter}inprogress`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "writer"){
            
        User.instance= new WriterData(id);

        const result =await User.instance.getOngoingOrders();
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



WriterRouter.post(`${environment.baseUrlWriter}cancelOrder/:task_id`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "writer"){
             const {task_id} = req.params;
        User.instance= new WriterTaskManager()

        const result =await User.instance.CancelOrder(id,task_id);

        await CancelOrderNotification(id,task_id);
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

WriterRouter.post(`${environment.baseUrlWriter}submitTask`,autheticateToken,async (req,res)=>{
   
   
    
   
   
    const responseToken = await tokens.User(req.body,res);
    const File = {};
   // console.log(req)
    if(responseToken !==false){
   
    
     const {type,id} = responseToken;
        if(type === "writer"){
         
      const {FilePath,task_id} = req.query;
   

             var Task = new WriterTaskManager();
               //const imagePath =fullUrl + result.path.replace("./public/files","/files");
               const imagePath = FilePath;
               const resul  = await Task.SubmitTask(task_id,imagePath,id);
           //  if(resul)
                res.json(true);
             delete Task;
             //res.end();
        
         
        }
       delete result;
      //  }else{
            //res.json('You Are not allowed to perform this operstion')  
      //  }
   }else{
        res.json(false);
    }
})

WriterRouter.post(`${environment.baseUrlWriter}TaskBeingReviewd`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "writer"){
            
        User.instance= new WriterData(id);

        const result =await User.instance.getOrdersBeingReviewd();
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

WriterRouter.post(`${environment.baseUrlWriter}Cancelled`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "writer"){
            
        User.instance= new WriterData(id);

        const result =await User.instance.getCancelledOrders();
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

WriterRouter.post(`${environment.baseUrlWriter}Revision`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "writer"){
            
        User.instance= new WriterData(id);

        const result =await User.instance.getOrdersBeingRedone();
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

WriterRouter.post(`${environment.baseUrlWriter}Unpaid`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "writer"){
             
        User.instance= new Payments();

        const result =await User.instance.writerGetUnpaidInvoices(id);
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

WriterRouter.post(`${environment.baseUrlWriter}LoadInvoices`,autheticateToken,async (req,res)=>{
   
    const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "writer"){
             
        User.instance= new Payments();

        const result =await User.instance.LoadWriterInvoices(id);
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


WriterRouter.post(`${environment.baseUrlWriter}LoadInvoiceData/:invoice_id`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "writer"){
              const {invoice_id} = req.params;
        User.instance= new Payments();

        const result =await User.instance.WriterInvoiceFullDetails(invoice_id,id);
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

WriterRouter.post(`${environment.baseUrlWriter}getUserDetails`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "writer"){
             
        User.instance= new Users();

        const result =await User.instance.getWriterFullDetails(id);
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

WriterRouter.post(`${environment.baseUrlWriter}updateProfile`,autheticateToken,async (req,res)=>{

    const responseToken = await tokens.User(req.body,res);
   // const File = {};
    if(responseToken !==false){
   
   
        
     const {type,id} = responseToken;
        if(type === "writer"){
       
        const {imagePath}= req.query;


             var Task = new Users();
               const resul  = await Task.updateWriterProfile(imagePath,id);
             if(resul){
                res.json('success');
             delete Task;
        }
          
        }else{
         
        }
   }else{
        res.json(false);
    }
})

WriterRouter.post(`${environment.baseUrlWriter}UpdateProfileData`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const User = {};
  
    if(responseToken !==false){
        const {type,id} = responseToken;
        if(type === "writer"){
          User.instance = new Users();
         // const {invoiceI} = req.query;

          //console.log(req.query)
        
        const result = await User.instance.updateWriterProfileData(req.query,id);
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


WriterRouter.post(`${environment.baseUrlWriter}clearReadNotification/:notification_id`,autheticateToken,async (req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const Task = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
       
        if(type === "writer"){
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

WriterRouter.post(`${environment.baseUrlWriter}chatUsers/:sender/:receiver/:task_id`,autheticateToken,async(req,res)=>{
    const responseToken = await tokens.User(req.body,res);
    const Task = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
       
        if(type === "writer"){
            Task.instance = new Users();
            const {sender,receiver,task_id} = req.params;

            //console.log(receiver)

            const result = await Task.instance.getChatUsers('writer',sender,receiver,task_id);
           
            delete Task.instance;
            res.json(result);
            delete result;
        }
    }else{
            res.json(false);
    }
})

WriterRouter.post(`${environment.baseUrlWriter}Tickets`,autheticateToken,async (req,res)=>{
   
    const responseToken = await tokens.User(req.body,res);
    const Task = {};
    if(responseToken !==false){
        const {type,id} = responseToken;
       
        if(type === "writer"){
            Task.instance = new TaskManager();

            const result = await Task.instance.getOpenTicketsForWriter(id);
            ///console.log(result)
            
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


WriterRouter.post(`${environment.baseUrlWriter}activate/:Key`,autheticateToken,async(req,res)=>{
   
    const Task = {};
   // if(responseToken !==false){
      ///  const {type,id} = responseToken;
       
       // if(type === "writer"){
            Task.instance = new Users();

            const result = await Task.instance.ActivateWriter(req.params.Key);
          //  console.log(result)
            
            delete Task.instance;
            //io.sendMessage('booomm');
            
            
           //.log(result)
            res.json(result);
            delete result;
       // }
   // }else{
    //        res.json(false);
   // }
})

WriterRouter.post(`${environment.baseUrlWriter}Forgot/:email`,autheticateToken,async(req,res)=>{
    //const responseToken = await tokens.User(req.body,res);
    const Task = {};
   
            Task.instance = new Users();

            const result = await Task.instance.ForgotPassword('writer',req.params.email);
            
            delete Task.instance;
            
            res.json(result);
            delete result;
    
})

WriterRouter.post(`${environment.baseUrlWriter}ConfirmPayMent/:task_id`,autheticateToken,async (req,res)=>{
    const Task = {};
   
    Task.instance = new Payments();

    const result = await Task.instance.WriterConfirmPayment(req.params.task_id);
    
    delete Task.instance;
    
    res.json(result);
    delete result;
})



module.exports = WriterRouter;


