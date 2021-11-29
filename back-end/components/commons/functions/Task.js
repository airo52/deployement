const { dateGenerator } = require("../../config/config");
const { Database } = require("../../database/database");
const fs = require('fs');
const systemMailer = require("./systemMails");


const db = new Database();
class TaskManager{
    constructor(){
       
    }

   async getTaskDetails(){

    }
  async getUnassignedTask(){//new task
    const result =await db.read('tbl_task',['*'],[`WHERE tbl_task.task_writer='0' OR tbl_task.task_status='cancelled' ORDER BY tbl_task.task_deadline ASC`]);

    if(result === "empty"){
        return [];
    }
   
    return result;
  }

  async assignTask(taskId,user_id){
    
       const taskid = db.Escape(parseInt(taskId));
       const userid = db.Escape(parseInt(user_id));

       //check if user account is active
       var userCheck = await db.read('tbl_writer',['*'],[`WHERE tbl_writer.witer_id=${userid} AND tbl_writer.writer_account_status='1' LIMIT 1 `]);
       if(userCheck === "empty"){
         return "Cant assign Task: User account suspended";
       }

       var taskAllowed = await db.read('tbl_rules',['*'],[``]);
       if(taskAllowed === "empty"){
         return "Provide system with Rules before assigning any task";

       }

       //check if user has reached maximum task assignment
       var checkTask = await db.read('tbl_task',['COUNT(*)'],[`WHERE tbl_task.task_writer=${userid} AND tbl_task.task_status !='completed'`]);
       if(checkTask !=="empty"){
         var count = checkTask[0]['COUNT(*)'];
         if(count < taskAllowed[0]['allowed_task_per_user']){
          
         }else return "User is fully Occupied with Task";
       }
       //check if task is not in progress
       const data =[
        {"task_writer":parseInt(user_id),
        },
        {
         "task_status":"assigned"
        }
        ]
      const response= await db.update('tbl_task',data,`task_id=${taskid}`);

      if(response == true){

      }

      return response;
  }

  


  async postTask(title,category,time,expectedDate,pages,pricePerpage,totalAmountTobePaid,description,work_type,service,adminId,invoiceState,EndDate,invoiceID){
    var billingSequence = await db.read('tbl_rules',['*'],[``]);
    //get Current Invoice 
   /*
    const Invoice = await db.read('tbl_Invoice',['*'],[`ORDER BY end_date DESC LIMIT 1`]);
    var invoice='';
  
    if(Invoice === "empty"){
      //create A new Invoice
      invoice ="#t"+Math.floor(Math.random() * 89979) + 98768498;
        //console.log(',,,')

    }else{
      //get remaining days from the invoice
      var curentDate = dateGenerator.date();
      var invoiceEndDate = Invoice[0].end_date;
      var createdDate = Invoice[0].created_date;

      
      
      var timeRemainInTheInvoice = dateGenerator.dayDifrence(invoiceEndDate,expectedDate);
      var timeForTaskToTake = dateGenerator.dayDifrence(curentDate,expectedDate);
      var newDate = dateGenerator.addDaysFromPointX(createdDate,timeForTaskToTake);

      var timeFit = dateGenerator.dayDifrence(newDate,invoiceEndDate);
      
   
        
      if(timeFit > 1 || timeFit === 0){
        invoice = Invoice[0].Invoice;
      }else{
        invoice ="#t"+Math.floor(Math.random() * 89979) + 98768498;
      }


      //check if the submited is greater than remaining
      //create new invoice
    }

    //check if its the same invoice

   var check= await db.read('tbl_Invoice',['*'],[`WHERE tbl_invoice.Invoice='${invoice}'`]);
   var invoiceId ='';
   var  endDate = '';
   if(check === "empty"){
      //generate new dates 
      if(billingSequence !== "empty"){
        //var result= await db.read('tbl_Invoice',['*'],[`WHERE tbl_invoice ORDER BY end_date DESC LIMIT 1`]);
        var timeForTaskToTake = dateGenerator.dayDifrence(curentDate,expectedDate);
        //console.log(timeForTaskToTake)
        //console.log(billingSequence[0].billing_sequence)
        var newinvoiceEnddate='';
        if(timeForTaskToTake > billingSequence[0].billing_sequence){
          newinvoiceEnddate= dateGenerator.addDaysToDate(timeForTaskToTake);
        }else{
          newinvoiceEnddate= dateGenerator.addDaysToDate(billingSequence[0].billing_sequence);
        }

      //insert new invice
      var data=[
             invoice,
             dateGenerator.date(),
             newinvoiceEnddate
         ];
       endDate= newinvoiceEnddate;

      const InsertResult=  await db.insert(data,'tbl_Invoice');

      if(InsertResult.success !==undefined){
          invoiceId = InsertResult.info['insertId'];
        }else return "failed to create invoice";
      }else return "provide system rules before posting task";
   }else{
     endDate = check[0]['end_date'];
     invoiceId = check[0]['invoice_id'];
   }

   
   const dataTobeInserted=[
       title,
       title,
       work_type,
       service,
       category,
       dateGenerator.date(),
       dateGenerator.getFromProvidedDate(expectedDate),
       time,
       '0',
       adminId,
       'new',
       description,
       pages,
       totalAmountTobePaid,
       pricePerpage,
       '0000-00-00',
       invoiceId

   ];



    const InsertResult=  await db.insert(dataTobeInserted,'tbl_task');
    if(InsertResult.success !==undefined){
     const lastId = InsertResult.info['insertId'];
     const paymentData = [
      invoiceId,
      'unpaid',
       dateGenerator.date(),
      totalAmountTobePaid,
      '0',
      lastId,
      '0'
      
]

      await db.insert(paymentData,'payment')

     return {success:true,lastId};
    
    }else{
      return {success:false,lastId:null};
    }
*/
    //var invoice='';
   if (invoiceState ==="new") {
   var  invoice ="#t"+Math.floor(Math.random() * 89979) + 98768498;
    var invoiceId='';
   if(billingSequence !== "empty"){
    //var result= await db.read('tbl_Invoice',['*'],[`WHERE tbl_invoice ORDER BY end_date DESC LIMIT 1`]);
   // var timeForTaskToTake = dateGenerator.dayDifrence(curentDate,expectedDate);
    //console.log(timeForTaskToTake)
    //console.log(billingSequence[0].billing_sequence)
    var newinvoiceEnddate='';
    //if(timeForTaskToTake > billingSequence[0].billing_sequence){
     // newinvoiceEnddate= dateGenerator.addDaysToDate(timeForTaskToTake);
   // }else{
      newinvoiceEnddate= dateGenerator.addDaysFromPointX(EndDate,billingSequence[0].billing_sequence);//addDaysToDate(billingSequence[0].billing_sequence);
   // }

  //insert new invice
  var data=[
         invoice,
         dateGenerator.date(),
         newinvoiceEnddate,
         '0'
     ];
  // endDate= newinvoiceEnddate;

  const InsertResult=  await db.insert(data,'tbl_Invoice');

  if(InsertResult.success !==undefined){
      invoiceId = InsertResult.info['insertId'];
    }else return "failed to create invoice";

    const dataTobeInserted=[
      title,
      title,
      work_type,
      service,
      category,
      dateGenerator.date(),
      dateGenerator.getFromProvidedDate(expectedDate),
      time,
      '0',
      adminId,
      'new',
      description,
      pages,
      totalAmountTobePaid,
      pricePerpage,
      '0000-00-00',
      invoiceId

  ];


  const InsertResults=  await db.insert(dataTobeInserted,'tbl_task');
  if(InsertResults.success !==undefined){
   const lastId = InsertResults.info['insertId'];
   const paymentData = [
    invoiceId,
    'unpaid',
     dateGenerator.date(),
    totalAmountTobePaid,
    '0',
    lastId,
    '0'
    
]

    await db.insert(paymentData,'payment')

   return {success:true,lastId};
  
  }else{
    return {success:false,lastId:null};
  }



  }else return "provide system rules before posting task";

  // var expectedDate = 
   }

   if(invoiceState !=="new" && invoiceID !==""){

   
        
    const dataTobeInserted=[
      title,
      title,
      work_type,
      service,
      category,
      dateGenerator.date(),
      dateGenerator.getFromProvidedDate(expectedDate),
      time,
      '0',
      adminId,
      'new',
      description,
      pages,
      totalAmountTobePaid,
      pricePerpage,
      '0000-00-00',
      invoiceID

  ];


  const InsertResult=  await db.insert(dataTobeInserted,'tbl_task');
  if(InsertResult.success !==undefined){
   const lastId = InsertResult.info['insertId'];
   const paymentData = [
    invoiceID,
    'unpaid',
     dateGenerator.date(),
    totalAmountTobePaid,
    '0',
    lastId,
    '0'
    
]

    await db.insert(paymentData,'payment')

   return {success:true,lastId};
  
  }else{
    return {success:false,lastId:null};
  }

   }

   

}

  async postFileUrl(lastId,imagePath){
     const dataTobeInserted=[
          lastId,
          imagePath
     ]
    const InsertResult = await db.insert(dataTobeInserted,'tbl_task_files');
    if(InsertResult.success !==undefined){
          return true;
    }
  }

  async getAssignedTask(){
    const result = await db.read('tbl_task',[`
    task_id,
    task_title,
    writer_display_name,
    writer_email,
    task_status,
    writer_category,
    taskl_accepted_date,
    task_deadline
 `],[`
 WHERE tbl_task.task_status='new' AND tbl_task.task_writer !='0'
 `]);
 if(result === "empty"){
     return [];

 }else{
     return result;
 }
  }

  async getTaskFullDetails(task_id){
    //get taskdetails
    const writerDetails = [];
    const witerSubmitedFiles=[];
    const orderFiles =[];
    var cleanId = db.Escape(task_id);
     const result = await db.read('tbl_task',['*'],[`WHERE tbl_task.task_id=${cleanId} LIMIT 1`]);

     var files = await db.read('tbl_task_files',['*'],[`WHERE tbl_task_files.task_order_id=${cleanId}`]);
    
     if(files !=="empty"){
       files.forEach(element => {
             var data={
                 filename:element.task_file_url.split('uploads/')[1],
                 path:element.task_file_url.split('uploads/')[1]
             }
            //console.log(element)
             orderFiles.push(data);
       });
     }


     var writerFiles = await db.read('tbl_task_submited_files',['*'],[`WHERE tbl_task_submited_files.tbl_task_id=${cleanId}`]);
     if(writerFiles !=="empty"){
       writerFiles.forEach(element => {
             var data={
              filename:element.task_file_url,//.split('uploads/')[1],
              path:element.task_file_url,//.split('uploads/')[1]
             }
             witerSubmitedFiles.push(data);
       });
     }

     var writerId = result[0].task_writer;
     if(writerId === 0){
         
     }else{
       var writer = await db.read('tbl_writer',['*'],[`WHERE tbl_writer.witer_id='${writerId}'`]);
       var details={
           name:writer[0].writer_name,
           email:writer[0].writer_email,
           phone:writer[0].phone
       }

       writerDetails.push(details);



     }

var mainData={
     result,
     writerDetails,
     witerSubmitedFiles,
     orderFiles
};

return mainData;






  }

  async deleteTask(task_id){
           var cleanId = db.Escape(task_id);
           var check = await db.read('tbl_task',['*'],[`WHERE tbl_task.task_id=${cleanId} LIMIT 1`]);

           if(check === "empty") return "failed";
           else {
             const user = check[0].task_writer;
             
             if(user !=='0'){
               return "task is already assigned";
             }
           }
       //delete table

       const deleteTable = await db.delete('tbl_task','tbl_task.task_id',task_id);

       if(deleteTable !==true){
         return "failed";
       }



       //check if their are files,

       var checkFiles =await db.read('tbl_task_files',['*'],[`WHERE task_order_id='${task_id}'`]);

       if(checkFiles !=="empty"){
         //delete files
         checkFiles.forEach((element) => {
               const file = element.task_file_url.split('files/')[1];
               var fullUrl = './public/files/'+file;
              
               //remove file
               fs.unlink(fullUrl,async function(err) {
                if(err && err.code == 'ENOENT') {
                    // file doens't exist
                   
                } else if (err) {
                   
                } else {
                     await db.delete('tbl_task_files','tbl_task_files.task_file_id',element.task_file_id);
                   // console.info(`removed`);
                }
            });
         });
       }
       //delete

       return "done";



       //push notification
  }

  async CancellTask(task_id){
    var cleanId = db.Escape(task_id);
    var check = await db.read('tbl_task',['*'],[`WHERE tbl_task.task_id=${cleanId} LIMIT 1`]);
    if(check === "empty"){
      return "can not cancell task";
    }

       //check if task is not in progress
       const data =[
        {
         "task_status":"cancelled"
        }
        ]
      const response= await db.update('tbl_task',data,`task_id=${cleanId}`);

      if(response == true){
        //build Notification
        return "done";
      }else{
        return "false";
      }
    
  }

  async SetTaskForRevision(task_id,message){
    var cleanId = db.Escape(task_id);
    var check = await db.read('tbl_task',['*'],[`INNER JOIN tbl_writer ON tbl_writer.witer_id=tbl_task.task_writer WHERE tbl_task.task_id=${cleanId} LIMIT 1`]);
    if(check === "empty"){
      return "can not set task for Revision";
    }

       //check if task is not in progress
       const data =[
        {
         "task_status":"revision"
        }
        ]
      const response= await db.update('tbl_task',data,`task_id=${cleanId}`);

      if(response == true){
        //build Notification
         const Mail = new systemMailer();

         await Mail.TaskRevisionDetailsa(check[0]['writer_email'],check[0]['task_deadline'],task_id,check[0]['writer_name'],message,dateGenerator.date());

        return "done";
      }else{
        return "false";
      }
  }

  async markTaskComplete(task_id){
    var cleanId = db.Escape(task_id);
    var check = await db.read('tbl_task',['*'],[`INNER JOIN tbl_writer ON tbl_writer.witer_id=tbl_task.task_writer INNER JOIN tbl_Invoice ON tbl_Invoice.invoice_id = tbl_task.invoice_id WHERE tbl_task.task_id=${cleanId} LIMIT 1`]);
    if(check === "empty"){
      return "can not mark task Complete";
    }

       //check if task is not in progress
       const data =[
        {
         "task_status":"completed"
        }
        ]
      const response= await db.update('tbl_task',data,`task_id=${cleanId}`);

      if(response == true){
        //build Notification
         const Mail = new systemMailer();

         await Mail.NotifyCompletion(check[0]['writer_email'],check[0]['end_date'],task_id,check[0]['writer_name'],dateGenerator.date());

        return "done";
      }else{
        return "false";
      }
  }

  async getOpenTickets(){
    //Tickets
    const result = await db.read('tbl_task',[`
    task_id,
    task_title,
    writer_display_name,
    writer_email,
    writer_profile,
    task_status,
    writer_category,
    taskl_accepted_date,
    task_deadline
 `],[`INNER JOIN tbl_writer ON tbl_writer.witer_id=tbl_task.task_writer WHERE tbl_task.task_status !='completed' AND tbl_task.task_status !='cancelled' AND tbl_task.task_status !='new'`]);
    if(result === "empty"){
        return [];
    }else return result;
  }

  async getOpenTicketsForWriter(id){
        //Tickets
        const result = await db.read('tbl_task',[`
        task_id,
        task_title,
      
        user_email,
        user_profile,
        task_status,
     
        taskl_accepted_date,
        task_deadline
     `],[`INNER JOIN tbl_user ON tbl_user.user_id=tbl_task.task_administrator WHERE tbl_task.task_status !='completed' AND tbl_task.task_status !='cancelled' AND tbl_task.task_status !='new' AND tbl_task.task_writer='${id}'`]);
        if(result === "empty"){
            return [];
        }else return result;
  }

  async LoadOpenInvoices(){
       const result =  await db.read('tbl_Invoice',['*'],[`WHERE tbl_Invoice.status='0'`]);

      


       if(result === "empty"){
         return [];
       }else{
         return result;
       }
  }

  async CloseInvoice(invoice_id){
    var cleanId = db.Escape(invoice_id);
    const data =[
      {
       "status":"1"
      }
      ]
    const response= await db.update('tbl_Invoice',data,`invoice_id=${cleanId}`);

    if(response == true){
      return "done";
    }else{
      return "false";
    }
  }
/*
  async getTaskInprogress(){

  }

  async getCancelledTask(){

  }

  async getTaskRevisions(){

  }

  async getCompletedTask(){

  }

  
  */


}

module.exports = TaskManager;