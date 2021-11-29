const { dateGenerator } = require('../../../config/config');
const { Database } = require('../../../database/database');
const { FileHandler } = require('../../functions/fileHandler');
const { TaskSubmisionNotification } = require('../../functions/Notification');
const systemMailer = require('../../functions/systemMails');

const db = new Database();

class WriterTaskManager{
   
 async acceptTask(task_id,user_id){
  const data =[
    {
     "task_status":"in-progress"
    },
    {
      "taskl_accepted_date":dateGenerator.date()
     }
    ]

    var userDetails = await db.read('tbl_writer',['*'],[`
    WHERE witer_id='${user_id}' LIMIT 1
 `])

    const cleanId = db.Escape(task_id);
    const response= await db.update('tbl_task',data,`task_id=${cleanId}`);
       
  

    if(response == true){
      var Details = await db.read('tbl_task',[`*`],[`INNER JOIN tbl_Invoice ON tbl_Invoice.invoice_id =tbl_task.invoice_id WHERE tbl_task.task_id=${cleanId} LIMIT 1`]);

      
      var pages = Details[0]['pages'];
      var price = Details[0]['price'];
      var pricePerpage = Details[0]['price_per_page'];
      var deadLine = Details[0]['task_deadline'];
      var invoice = Details[0]['Invoice'];
      
      
      

    var Mail = new systemMailer();
     await Mail.NotifyTaskAccept(userDetails[0]['writer_email'],userDetails[0]['writer_name'],task_id,dateGenerator.date(),invoice,deadLine,pages,pricePerpage,price);
      return 'done';
    }
    }

    async RejectTask(user_id,task_id){
      var userDetails = await db.read('tbl_writer',['*'],[`
         WHERE witer_id='${user_id}' LIMIT 1
      `])

      const data =[
        {
         "task_status":"Rejected"
        }
        ]

      
        const cleanId = db.Escape(task_id);
      const response= await db.update('tbl_task',data,`task_id=${cleanId}`);
      

      if(response == true){
        var Mail = new systemMailer();
        
      await Mail.NotifyTaskReject(userDetails[0]['writer_email'],userDetails[0]['writer_name'],task_id,dateGenerator.date());
        //build Notification
        return "done";
      }else{

        return "false";
      }
      //return 'done';
    }

    async CancelOrder(user_id,task_id){
      //cancelled
      const data =[
        {
         "task_status":"cancelled"
        }
        ]

      
        const cleanId = db.Escape(task_id);
      const response= await db.update('tbl_task',data,`task_id=${cleanId}`);
      

      if(response == true){
        return true;
      }
    }

    async SubmitTask(task_id,FilePath,user_id){
      //pending
      const data =[
        {
         "task_status":"pending"
        }
        ]

      
        const cleanId = db.Escape(task_id);
      const response= await db.update('tbl_task',data,`task_id=${cleanId}`);
      

      if(response == true){
         var dat =[
             task_id,
             FilePath
         ]
        const result = await db.insert(dat,'tbl_task_submited_files');
        var userDetails = await db.read('tbl_writer',['*'],[`
        WHERE witer_id='${user_id}' LIMIT 1
         `])

         var Mail = new systemMailer();
        
         await Mail.NotifyTaskSubmited(userDetails[0]['writer_email'],userDetails[0]['writer_name'],task_id,dateGenerator.date());
           //build Notification
        await TaskSubmisionNotification(user_id,task_id);
 
        return true;
      }
    }

    
}

module.exports = WriterTaskManager;