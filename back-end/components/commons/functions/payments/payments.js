const { dateGenerator, urls } = require("../../../config/config");
const { Database } = require("../../../database/database");
const systemMailer = require("../systemMails");

const db = new Database();
class Payments{
    constructor(){

    }

  async getPendingPayments(){
         //
        const pending = await db.read('payment',[`
            payment_id,
            tbl_Invoice.invoice_id AS INvoince,
            tbl_Invoice.Invoice,
            payment_status,
            payment_expected_amount,
            end_date,
            writer_email,
            payment_expected_amount,
            tbl_task.task_id
        `],[`
             INNER JOIN tbl_task ON tbl_task.task_id = payment.task_id INNER JOIN tbl_writer ON tbl_writer.witer_id=tbl_task.task_writer
              
             INNER JOIN tbl_Invoice ON tbl_Invoice.invoice_id = tbl_task.invoice_id WHERE tbl_task.task_status = 'completed' AND payment.payment_status='unpaid'
        `]);

        if(pending === "empty"){
            return [];
        }

        return pending;
    }
   async ConfirmPayment(invoice,taskid){
           const intId = parseInt(taskid);
           const cleanId = db.Escape(taskid);
          

          // const result = db.update()
           //check if task is not in progress
       const data =[
            {
             "payment_status":"paid"
            }
        ]
      const response= await db.update('payment',data,`task_id=${cleanId}`);
       
      if(response == true){
           //send confirmation request email//
            //check and broadcast to user socket

            const User = await db.read('tbl_task',['*'],[`INNER JOIN tbl_writer ON tbl_writer.witer_id=tbl_task.task_writer LIMIT 1`]);
            const Mail = new systemMailer();
            
           // userEmail,invoice,paymentDate,taskId,taskStartDate,taskEndDate,logo,confimationUrl
                 await  Mail.sendEmailForPaymentConfirmation(User[0].writer_email,"#"+invoice,dateGenerator.date(),User[0].task_id,User[0].taskl_accepted_date,User[0].task_deadline,urls.logo,urls.confirmationUrls,User[0].price,urls.SystemUrl,User[0].writer_name);
          return "Payment confirmed";
      }
            
     //  return ;
   }

   async WriterConfirmPayment(taskid){
    
    const cleanId = db.Escape(taskid);
  
const data =[
     {
      "user_confirmation":"1"
     }
 ];

 const datA = await db.read('payment',[`*`],[`WHERE task_id=${cleanId} LIMIT 1`]);
 if(datA !=="empty"){
      const {payment_status} = datA[0];
      if(payment_status === "paid"){
        const response= await db.update('payment',data,`task_id=${cleanId}`);

        if(response == true){
            
             const User = await db.read('tbl_task',['*'],[`INNER JOIN tbl_writer ON tbl_writer.witer_id=tbl_task.task_writer LIMIT 1`]);
             const Mail = new systemMailer();
             
            // userEmail,invoice,paymentDate,taskId,taskStartDate,taskEndDate,logo,confimationUrl
                  await  Mail.sendEmailForPaymentConfirmation(User[0].writer_email,"#"+invoice,dateGenerator.date(),User[0].task_id,User[0].taskl_accepted_date,User[0].task_deadline,urls.logo,urls.confirmationUrls,User[0].price,urls.SystemUrl,User[0].writer_name);
               return "Payment confirmed";
        }
      }else return "this payment cannot be confirmed";
 }else return "this payment cannot be confirmed";

   }

   async LoadInvoices(){
       const result = await db.read('tbl_Invoice',[`*`],[``]);
        
       if(result === 'empty'){
           return [];
       }
       else return result;
   }


   async getInvoiceFullDetails(invoice_id){
           
    const cleanId = db.Escape(invoice_id)

     const result = await db.read('tbl_task',[`*`],[`
        INNER JOIN payment ON payment.task_id = tbl_task.task_id WHERE tbl_task.invoice_id=${cleanId}
     `]);

     if(result === "empty"){
         return [];
     }

     return result;
}


async WriterInvoiceFullDetails(invoice_id,writer_id){
    const cleanId = db.Escape(invoice_id)

    const result = await db.read('tbl_task',[`*`],[`
       INNER JOIN payment ON payment.task_id = tbl_task.task_id WHERE tbl_task.invoice_id=${cleanId} AND tbl_task.task_writer='${writer_id}'
    `]);

    if(result === "empty"){
        return [];
    }

    return result;
}

async writerGetUnpaidInvoices(writer_id){
    
    const pending = await db.read('payment',[`
    payment_id,
    tbl_Invoice.invoice_id AS INvoince,
    tbl_Invoice.Invoice,
    payment_status,
    payment_expected_amount,
    end_date,
    writer_email,
    payment_expected_amount,
    tbl_task.task_id,
    task_writer,
        task_title,
        task_name,
        task_service,
        pages,
        writer_display_name,
        writer_email,
        task_status,
        writer_category,
        taskl_accepted_date,
        task_deadline,
        task_Descipline,
        task_created_date,
        task_description
`],[`
     INNER JOIN tbl_task ON tbl_task.task_id = payment.task_id INNER JOIN tbl_writer ON tbl_writer.witer_id=tbl_task.task_writer
      
     INNER JOIN tbl_Invoice ON tbl_Invoice.invoice_id = tbl_task.invoice_id WHERE tbl_task.task_status = 'completed'  AND payment.payment_status='unpaid' AND tbl_task.task_writer='${writer_id}'
`]);

if(pending === "empty"){
    return [];
}

return pending;
}

async LoadWriterInvoices (writer_id){
    const result = await db.read('tbl_Invoice',[`*`],[`
      INNER JOIN tbl_task ON tbl_task.invoice_id=tbl_Invoice.invoice_id WHERE tbl_task.task_writer='${writer_id}'
    `]);
        
    if(result === 'empty'){
        return [];
    }
    else{
         var invoices =[];
        var organisedData =[];
         for (let index = 0; index < result.length; index++) {
             const element = result[index];
             if(!invoices.includes(element.invoice_id)){
                 invoices.push(element.invoice_id);
                 organisedData.push(element);
             }
                
             
         }
       
       
         return organisedData;
        };
}

}

module.exports = Payments;