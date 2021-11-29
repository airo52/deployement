const { Database } = require('../../database/database');

const db = new Database();
class NotificationHandler {
    constructor(io){
       this.io = io;
    }

   async getUnreadNotificationsForAdmin(admin){
    var result = await db.read('Notifications',['*'],[`WHERE Notifications.status='0'`]);

    if(result !=="empty"){
         let count =0;
         let messages =[];
         result.forEach(element => {
             if(element.messageTo === '001'){
                
                  var text ={
                    text:element.message,
                    id:element.id
                  }
                 count=count+1;
                 messages.push(text);
                
             }
         });

         if(count >0){
             var neW = [];

             neW.push({
                 count:count,
                 data:messages
             })

             this.io.sendAdminNotification(admin,neW);

         }


      }
    }

    async clearReadNotifications(id){
        const data =[
         
            {
             "status":"1"
            }
            ]
          const response= await db.update('Notifications',data,`id=${id}`);
    
    }
}

module.exports = NotificationHandler;