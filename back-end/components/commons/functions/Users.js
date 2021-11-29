const { encryptData, decryptData } = require("../../config/cryptor");
const { Database } = require("../../database/database");
const { JoiValidation } = require("../Auth/JoiValidation");
const { sendMail } = require("./sendMail");

const db = new Database();
class Users{
    constructor(){
         this.stete={
             completedTask:[],
             paymentProgress:[],
             assignedTask:[],
             attemptedTask:[],
             currentAssigneTask:[],
             totalCashEarned:[],


         }
    }
   
   async getWriters(){
        const result =await db.read('tbl_writer',['witer_id,writer_name,writer_display_name,writer_email,writer_account_status,writer_profile,phone,country,address,writer_category,writer_reg_date'],[``]);
         
        if(result === "empty"){
            return [];
        }else return result;
    }

   async getWriterFullDetails(id){
          const totalTask = await await db.read('tbl_task',['COUNT(*)'],[``]);
          var count =totalTask[0]['COUNT(*)'];

        const result = await db.read('tbl_writer',['witer_id,writer_name,writer_display_name,writer_email,writer_account_status,writer_profile,phone,country,address,writer_category,writer_reg_date'],[`WHERE tbl_writer.witer_id='${id}'`]);
        const Task = await db.read('tbl_task',['COUNT(*)'],[`WHERE tbl_task.task_writer='${id}'`]);

        var currentAssigneTask = await db.read('tbl_task',['*'],[`WHERE tbl_task.task_writer='${id}'  AND tbl_task.task_status !='completed'`]);
        if(currentAssigneTask === "empty"){
            this.stete.currentAssigneTask.push([]);

        }else this.stete.currentAssigneTask.push(currentAssigneTask);
        var taskCount = Task[0]['COUNT(*)'];
        var tc={
            of:count,
            count:taskCount,
            value:(taskCount/count)*100,

        }
        this.stete.assignedTask.push(tc);
        this.stete.attemptedTask.push(tc);

        const completedTask = await db.read('tbl_task',['COUNT(*)'],[`WHERE tbl_task.task_writer='${id}' AND tbl_task.task_status='completed'`]);
        var completedCount = completedTask[0]['COUNT(*)'];
        var ct={
            of:count,
            count:completedCount,
            value:(completedCount/count)*100,
        }
        this.stete.completedTask.push(ct);

        const payments = await db.read('tbl_task',['*'],[`INNER JOIN payment ON payment.task_id=tbl_task.task_id WHERE tbl_task.task_writer='${id}'`]);
        //const payment= await db.read('payment',['*'],[`WHERE `])
        var amount =0;
        if(payments !== "empty"){
            var tc=0;
            var paid=0;
            var unpaid=0;
            payments.forEach(element => {
                 if(element.payment_status === 0){
                   unpaid = unpaid+1;
                 }
                 if(element.payment_status === 1){
                     paid=paid+1;
                     amount = amount + element.payment_amount_paid;
                 }
                 tc = tc+1;
            });

            var pay ={
                of:tc,
                count:paid,
                value:(paid/tc)*100,  
            }
            this.stete.totalCashEarned.push(amount);

            this.stete.paymentProgress.push(pay);
        }else{
            var pay ={
                of:0,
                count:0,
                value:0,  
            }
            this.stete.totalCashEarned.push(amount);
      this.stete.paymentProgress.push(pay);
      
           // this.state.paymentProgress.push(pay);
        }
        if(result == "empty"){
                 
            var data={
                result:[],
                state:this.state
            }
          
           return data;
        }else {
            
              var data={
                  result,
                  state:this.stete
              }

            
             return data;
        };
    }

    async getAdmins(admin){
        const cleaId = db.Escape(admin)
        const result =await db.read('tbl_user',[`*`],[`
           WHERE tbl_user.user_id=${cleaId} LIMIT 1
        
        `]);
         
        if(result === "empty"){
            return [];
        }else return result;
    }

    async getAdmin(admin){
       
        const cleaId = db.Escape(admin)
        const result =await db.read('tbl_user',[`*`],[`
           WHERE tbl_user.user_id=${cleaId} LIMIT 1
        
        `]);

        const total = await await db.read('tbl_task',[`COUNT(*)`],[``]);
        var filte = total[0]['COUNT(*)'];

        const totalTaskUpload = await db.read('tbl_task',[`COUNT(*)`],[`WHERE tbl_task.task_administrator='${admin}'`]);
        var filter = totalTaskUpload[0]['COUNT(*)'];
      
        
         return [
              result,
              {"totalTaskUoloaded":filter},
              {"task":filte},
              {"range":(filter/filte)*100}  
         ];
       // if(result === "empty"){
         //   return [];
       // }else return result;
    }

    async BlockWriter(id){
        const cleaId = db.Escape(id);

        
        const data =[
            {"writer_account_status":0}
        ]
       const response= await db.update('tbl_writer',data,`witer_id=${cleaId}`);

       return response;
    }

    async UblockWriter(id){
        const cleaId = db.Escape(id);

        
        const data =[
            {"writer_account_status":1}
        ]
       const response= await db.update('tbl_writer',data,`witer_id=${cleaId}`);

       return response;
    }

    async BlockAdmins(id){
        const cleaId = db.Escape(id);

        
        const data =[
            {"user_status":0}
        ]
       const response= await db.update('tbl_user',data,`user_id=${cleaId}`);

       return response;
    }

    async UblockAdmin(id){
        const cleaId = db.Escape(id);

        
        const data =[
            {"user_status":1}
        ]
       const response= await db.update('tbl_user',data,`user_id=${cleaId}`);

       return response;
    }

   async updateWriterCategory(category,user_id){
    const cleaId = db.Escape(user_id);

        
    const data =[
        {"writer_category":category}
    ]
   const response= await db.update('tbl_writer',data,`witer_id=${cleaId}`);

   return response;
    }

    async updateAdminProfile(imagePath,user_id){
        const cleaId = db.Escape(user_id);

        
        const data =[
            {"user_profile":imagePath}
        ]
       const response= await db.update('tbl_user',data,`user_id=${cleaId}`);
    
       return response;
    }


    async updateWriterProfile(imagePath,user_id){
        const cleaId = db.Escape(user_id);

        
        const data =[
            {"writer_profile":imagePath}
        ]
       const response= await db.update('tbl_writer',data,`witer_id=${cleaId}`);
    
       return response;
    }

    async updateProfileData(data,user_id){

           var dat =[];
           var stack ={};

        const {email,password,country,address,phone,username} = data;
         if(email === ''){

             return 'email can not be updated to empty';
         }
         if(password !== ''){
              const user = await db.read('permisions',[`*`],[`WHERE permisions.perm_user='${user_id}' LIMIT 1`]);

              const key = user[0]['perm_key'];

              
               
              const encryptedPassword = encryptData(password,key.toString());

              stack.user_password = encryptedPassword;


            
         }

         if(country ===''){
             return 'you have to provide your country for update';
         }
         if(address ===''){
             return "provide address for update";
         }

         if(phone === ''){
             return 'provide phone number for update';
         }

         if(username === ''){
             return 'provide username for update';
         } 

         stack.user_username= username;
         stack.user_email = email;
         stack.user_country = country;
         stack.user_phone = phone;
         stack.address = address;

         for (const key in stack) {
            const daTa ={
                [key]: stack[key]
            }
            dat.push(daTa);
            //console.log(`${key}: ${stack[key]}`);
        }

       

      const response= await db.update('tbl_user',dat,`user_id='${user_id}'`);

     if(response){
           return "success";
       }
      
     
    }

    async updateWriterProfileData(data,user_id){
        var dat =[];
        var stack ={};

     const {email,password,country,address,phone,username} = data;
      if(email === ''){

          return 'email can not be updated to empty';
      }
      if(password !== ''){
           const user = await db.read('permisions',[`*`],[`WHERE permisions.perm_user='${user_id}' LIMIT 1`]);

           const key = user[0]['perm_key'];

           
            
           const encryptedPassword = encryptData(password,key.toString());

           stack.user_password = encryptedPassword;


         
      }

      if(country ===''){
          return 'you have to provide your country for update';
      }
      if(address ===''){
          return "provide address for update";
      }

      if(phone === ''){
          return 'provide phone number for update';
      }

      if(username === ''){
          return 'provide username for update';
      } 

      stack.writer_name= username;
      stack.writer_email = email;
      stack.country = country;
      stack.phone = phone;
      stack.address = address;

      for (const key in stack) {
         const daTa ={
             [key]: stack[key]
         }
         dat.push(daTa);
         //console.log(`${key}: ${stack[key]}`);
     }

    

   const response= await db.update('tbl_writer',dat,`witer_id='${user_id}'`);

  if(response){
        return "success";
    }
   
    }

    async getAdministrators(id){
             const result = await db.read('tbl_user',[`*`],[`WHERE tbl_user.user_id !='${id}'`]);

             if(result === 'empty'){
                 return [];
             }

             return result;
    }

   async getChatUsers(type,sender,receiver,task_id){
       if(type==='admin'){
           try {
               
         // console.log(task_id)
        const result = await db.read('tbl_user',[`*`],[`WHERE tbl_user.user_email ='${sender}' LIMIT 1`]);

        const receivedata = await db.read('tbl_writer',[`*`],[`WHERE tbl_writer.writer_email ='${receiver}' LIMIT 1`]);

        const Data = await db.read('chats',['*'],[`WHERE (chats.sender_id = '${sender}' AND chats.receiver_id = '${receiver}' AND chats.task_id='${task_id}') OR
                (chats.sender_id= '${receiver}' AND chats.receiver_id = '${sender}' AND chats.task_id='${task_id}')
        ORDER BY chats.chat_id ASC
        `])

        var data = {
              sender:result,
              receiver:receivedata,
              messages:Data === "empty"?[]:Data
        }
        return data;
    } catch (error) {
          console.log(error);        
    }
       }
       if(type === 'writer'){
        const result = await db.read('tbl_user',[`*`],[`WHERE tbl_user.user_email ='${receiver}' LIMIT 1`]);

        const receivedata = await db.read('tbl_writer',[`*`],[`WHERE tbl_writer.writer_email ='${sender}' LIMIT 1`]);

        const Data = await db.read('chats',['*'],[`WHERE (chats.sender_id = '${sender}' AND chats.receiver_id = '${receiver}' AND chats.task_id='${task_id}') OR
        (chats.sender_id= '${receiver}' AND chats.receiver_id = '${sender}' AND chats.task_id='${task_id}')
ORDER BY chats.chat_id ASC
`])


        var data = {
              sender:result,
              receiver:receivedata,
              messages:Data === "empty"?[]:Data
        }
        return data;
       }
    }

    async ActivateWriter(Key){
        //ActivationKeys
         const cleanId = db.Escape(Key);
        const result = await db.read('ActivationKeys',['*'],[`WHERE ActivationKeys.activation_key=${cleanId} AND ActivationKeys.user_type='writer' LIMIT 1`]);
        if(result === "empty"){
            return 'wrong key';
        }else{
           if(result[0].status ==0){
           // writer_account_status
           var dat1=[{
              "status":1
           }]
           const response= await db.update('ActivationKeys',dat1,`activation_key=${cleanId}`);

            if(response){
                var userId = result[0].user_id;
               var respon= await this.UblockWriter(userId);

               if(respon){
                   return "done";
               }

            };
             
           }else{
               return "Account is active contact administrator";
           }
        }
    }

    async ActivateAdmin(Key){
        const cleanId = db.Escape(Key);
        const result = await db.read('ActivationKeys',['*'],[`WHERE ActivationKeys.activation_key=${cleanId} AND ActivationKeys.user_type='admin' LIMIT 1`]);
        if(result === "empty"){
            return 'wrong key';
        }else{
           if(result[0].status ==0){
           // writer_account_status
           var dat1=[{
              "status":1
           }]
           const response= await db.update('ActivationKeys',dat1,`activation_key=${cleanId}`);

            if(response){
                var userId = result[0].user_id;
               var respon= await this.UblockAdmin(userId);

               if(respon){
                   return "done";
               }

            };
             
           }else{
               return "Account is active contact administrator";
           }
        }
    } 

  async  confirmEmailBody(key){
        var date = new Date().toISOString().slice(0,10);
           return ` <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
           <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-6">
                    <div class="well well-sm">
                        <div class="row">
                            <div class="col-sm-6 col-md-4">
                                <img  src="https://images.unsplash.com/photo-1632908112019-0e27ef1e70d8?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8Ym84alFLVGFFMFl8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" alt="" class="img-rounded img-responsive" />
                            </div>
                            <div class="col-sm-6 col-md-8">
                                <h4>
                                      PEAK-WRITERS
                                </h4>
                                <small><cite title="San Francisco, USA">NAIROBI,KENYA <i class="glyphicon glyphicon-map-marker">
                                </i></cite></small>
                               <small> <p>
                                    <i class="glyphicon glyphicon-envelope"></i>
                                    <a>email@peakwriters.com</a>
                                    <br />
                                <p></small>  
                                    <br>
                                    your password retrival  is succesfull
                                    <br/>
                                    Your password  is (${key})
                                    <br>
                                  
                                   
                                </p>
                                    <br />
                                    <i class="glyphicon glyphicon-gift"></i>(${date})</p>
                               
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }
 

    async sendForgotPassword(email,password){
       
        const body = await this.confirmEmailBody(password);
        return  sendMail(body,email,'PEAK-WRITERS ForgotPassword','password reset');
    }

    async ForgotPassword(type,email){
         
        const validate =JoiValidation.ForgotEmail(email) //Validation.(email,password);

            
            
          try {
           const err= validate.error['details'][0]['message'];
          
           return err.replace('\"',"").replace('\"',"")
          } catch (error) {
            const cleanEmail = db.Escape(email.toString());
            if(type === "admin"){
                const result = await db.read('tbl_user',['*'],[`
                WHERE user_email = ${cleanEmail} LIMIT 1
             `])
            
             if(result === "empty"){
                 return "Wrong  or Email";
             }

             const {user_id,user_display_name,user_email,user_password,user_profile,user_type,user_status} = result[0];
           if(user_status === 1){
           const Permision = await db.read('permisions',['perm_key'],[`WHERE permisions.perm_user='${user_id}' AND permisions.perm_tbl='tbl_user' LIMIT 1`]);
         if(Permision === "empty"){return "Internal server Error";}
 
              const key = Permision[0]['perm_key'];
              const serverPassword = decryptData(user_password,key);
              await this.sendForgotPassword(user_email,serverPassword);

              return "done";
            }
            }
            if(type === 'writer'){
                const result = await db.read('tbl_writer',['*'],[`
                WHERE writer_email = ${cleanEmail} LIMIT 1
                 `])

                 if(result === "empty"){
                    return "Wrong  or Email";
                }

                const {witer_id,writer_display_name,writer_account_status,writer_profile,password,writer_email} = result[0];
         
                if(writer_account_status === 1){
                 const Permision = await db.read('permisions',['perm_key'],[`WHERE permisions.perm_user='${witer_id}' AND permisions.perm_tbl='tbl_writer' LIMIT 1`]);
                 
                 if(Permision === "empty"){return "Internal server Error";}
        
                 const key = Permision[0]['perm_key'];
                 const serverPassword = decryptData(password,key);

                 await this.sendForgotPassword(writer_email,serverPassword);

                 return "done";
            }
        }
          }
    }




}

module.exports = Users;