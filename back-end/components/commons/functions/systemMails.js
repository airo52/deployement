const Invoice = require("./invoice");
const { sendMail } = require("./sendMail");

class systemMailer{
    constructor(){
        
    }

    async paymentConfirmationBody(invoice_id,taskId,username,email,taskStartDate,taskEndDate,paymntDate,logo,confimationUrl,amountPaid,SystemUrl){
       // var logo ='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.123rf.com%2Fstock-photo%2Fbeauty_logo.html&psig=AOvVaw2oiSJNFgiptw5iah8pRsQv&ust=1636750215266000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOCSk--XkfQCFQAAAAAdAAAAABAD'
        
      
        var tableData = `
               <tr>
                  <td align="left" width="75%" style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">task ${taskId}</td>
                  <td align="left" width="25%" style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">Ksh ${amountPaid}</td>
                </tr>
                `;
                    var result = Invoice(invoice_id,taskId,username,email,taskStartDate,taskEndDate,paymntDate,logo,tableData,confimationUrl,SystemUrl);

      // console.log(result[0])
       return result[0];
    }

    async userPaymentConfirmationBody(invoice_id,taskId,username,email,taskStartDate,taskEndDate,paymntDate,logo,confimationUrl,amountPaid,SystemUrl){
        var body =`
            <center>
              Dear ${username} You have succesfully confirmed task (${taskId}) Payment of Ksh (${amountPaid})
              on ${paymntDate}<br/>

              Thank you and Welcome.
            </center>
        `;
    }
   async sendEmailForPaymentConfirmation(userEmail,invoice,paymentDate,taskId,taskStartDate,taskEndDate,logo,confimationUrl,amountPaid,SystemUrl,username){
       //
       var body = await this.paymentConfirmationBody(invoice,taskId,username,userEmail,taskStartDate,taskEndDate,paymentDate,logo,confimationUrl,amountPaid,SystemUrl);
       var data= await  sendMail(body,userEmail,'PEAKWRITER(payment invoice)',invoice);

     //  console.log(data)
    }

    async senEmailForUserPayMentConfirmation(userEmail,invoice,paymentDate,taskId,taskStartDate,taskEndDate,logo,confimationUrl,amountPaid,SystemUrl,username){
      var body = await this.userPaymentConfirmationBody(invoice,taskId,username,userEmail,taskStartDate,taskEndDate,paymentDate,logo,confimationUrl,amountPaid,SystemUrl);
      var data= await  sendMail(body,userEmail,'PEAKWRITER(payment confirmed)',invoice);
      

    }

    async NotifyTaskReject(userEmail,username,taskId,date){
           var body = `
                      <p style="blackground-color:'#ffff',padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                             Dear ${username} this is to inform you that you have succesfully Rejected task (**${taskId}**)
                             <br/>
                           (${date})
                      </p>
                    `;
           await sendMail(body,userEmail,`PEKWRITER task (${taskId}) cancelation`,'task cancelled');         
    }

    async NotifyTaskAccept(userEmail,username,taskId,date,invoice,deadline,pages,pricePerpage,price){
      var body = `
      <p style="blackground-color:'#ffff',padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
             Dear ${username} this is to inform you that you have succesfully Accepted task (**${taskId}**)
             <br/>
             This task Falls  under Invoice (${invoice}) .Task to be submited before (${deadline})

              <br/>
              Pages: ${pages} &nbsp; PricePerpage: ${pricePerpage} &nbsp; TotalPrice:${price}
             <br/>
           (${date})
      </p>
       `;

       await sendMail(body,userEmail,`PEKWRITER task (${taskId}) accepted`,'task accepted');  

    }

    async NotifyTaskSubmited(userEmail,username,taskId,date){
      var body = `
      <p style="blackground-color:'#ffff',padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
             Dear ${username} this is to inform you that you have succesfully Submited Your task (**${taskId}**)
             <br/>
             on
           (${date})
      </p>
    `;
await sendMail(body,userEmail,`PEKWRITER task (${taskId}) Submision`,'task submited');  
    }

  async TaskRevisionDetailsa(userEmail,taskEndDate,task_id,userName,message,date){
    var body = `
    <p style="blackground-color:'#ffff',padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
           Dear ${userName} this is to inform you that your submited task (**${task_id}**) Has been Rejected and requested to Submit Revision of the same before 

           (${taskEndDate})
          
        
    </p>
         ${message}
         <p>
         (${date})
         </p>
     `;
         await sendMail(body,userEmail,`PEAKWRITER task (${task_id})`,'Revision Request'); 
    }

    async NotifyCompletion(userEmail,taskPayDate,task_id,userName,date){
      var body = `
      <p style="blackground-color:'#ffff',padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
             Dear ${userName} this is to inform you that your submited task (**${task_id}**) Has been succefully accepted  
  
             Payment To be made On ${taskPayDate}
            
          
      </p>
           
           <p>
           (${date})
           </p>
       `;
           await sendMail(body,userEmail,`PEAKWRITER task (${task_id})`,'Congratulation'); 
    }
}

module.exports = systemMailer;