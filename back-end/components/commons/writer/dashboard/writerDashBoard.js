const { Database } = require("../../../database/database");

var db = new Database();
class WriterDashboard{
     constructor(id){
          this.id = id;
         this.state={
             assignedOrders:[],
             ordersBeingRedone:[],
             cancelledOrders:[],
             completedOrders:[],
             pendingReviews:[],
             totalUsers:[],
             totalTask:[],
            
         }
     }

   async getAssignedOrders(){
          const result = await db.read('tbl_task',['COUNT(*)'],[`WHERE tbl_task.task_status='in-progress' AND tbl_task.task_writer ='${this.id}'`]);
          var count =result[0]['COUNT(*)'];
         
          const points = await db.read('tbl_task',["COUNT(*)"],[`WHERE tbl_task.task_status='in-progress' AND tbl_task.task_writer ='${this.id}' GROUP BY DATE_FORMAT(taskl_accepted_date,'%m')`]);
            const data =[];
            var total = this.state.totalTask[0].count; 
            if(points !=="empty"){
          points.forEach((element,index) => {
                   var percent =(element['COUNT(*)']/total)*100;
                  data.push(percent);
            });
          }
          this.state.assignedOrders.push({count,points:points === "empty"?0:data});
     }

   async getOrdersBeingredone(){
       const result = await db.read('tbl_task',['COUNT(*)'],[`
           WHERE tbl_task.task_status='revision' AND tbl_task.task_writer ='${this.id}'
       `])
       var count =result[0]['COUNT(*)'];
      
       const points = await db.read('tbl_task',['COUNT(*)'],[`
       WHERE tbl_task.task_status='revision' AND tbl_task.task_writer ='${this.id}' GROUP BY DATE_FORMAT(taskl_accepted_date,'%m')
       `])

       const data =[];
       var total = this.state.totalTask[0].count; 
       if(points !=="empty"){
     points.forEach((element,index) => {
              var percent =(element['COUNT(*)']/total)*100;
             data.push(percent);
       });
      }
       this.state.ordersBeingRedone.push({count,points:points === "empty"?0:data});
   }
 

   async getCancelledOrders(){
    const result = await db.read('tbl_task',['COUNT(*)'],[`
    WHERE tbl_task.task_status='cancelled' AND tbl_task.task_writer ='${this.id}'
   `])
   var count =result[0]['COUNT(*)'];

   const points = await db.read('tbl_task',['COUNT(*)'],[`
   WHERE tbl_task.task_status='cancelled' AND tbl_task.task_writer ='${this.id}' GROUP BY DATE_FORMAT(taskl_accepted_date,'%m')
   `])

   const data =[];
   var total = this.state.totalTask[0].count; 
   if(points !=="empty"){
   points.forEach((element,index) => {
       var percent =(element['COUNT(*)']/total)*100;
      data.push(percent);
   });
}
this.state.cancelledOrders.push({count,points:points === "empty"?0:data});
   }
   

   async getCompletedOrders(){
    const result = await db.read('tbl_task',['COUNT(*)'],[`
    WHERE tbl_task.task_status='completed' AND tbl_task.task_writer ='${this.id}'
   `])
   var count =result[0]['COUNT(*)'];

   const points = await db.read('tbl_task',['COUNT(*)'],[`
   WHERE tbl_task.task_status='completed' AND tbl_task.task_writer ='${this.id}' GROUP BY DATE_FORMAT(taskl_accepted_date,'%m')
   `])

   const data =[];
   var total = this.state.totalTask[0].count; 
   if(points !=="empty"){
   points.forEach((element,index) => {
       var percent =(element['COUNT(*)']/total)*100;
      data.push(percent);
   });
}
this.state.completedOrders.push({count,points:points === "empty"?0:data});
   }
   async getpendingReviews(){
    const result = await db.read('tbl_task',['COUNT(*)'],[`
    WHERE tbl_task.task_status='pending' AND tbl_task.task_writer ='${this.id}'
   `])
   var count =result[0]['COUNT(*)'];

   const points = await db.read('tbl_task',['COUNT(*)'],[`
   WHERE tbl_task.task_status='pending' AND tbl_task.task_writer ='${this.id}' GROUP BY DATE_FORMAT(taskl_accepted_date,'%m')
   `])

   const data =[];
   var total = this.state.totalTask[0].count; 
   if(points !=="empty"){
   points.forEach((element,index) => {
       var percent =(element['COUNT(*)']/total)*100;
      data.push(percent);
   });
}
this.state.pendingReviews.push({count,points:points === "empty"?0:data});
   }

   async getTotalUsers(){
    const result = await db.read('tbl_writer',['COUNT(*)'],[`
    WHERE tbl_writer.writer_account_status='1' 
   `])
   var count =result[0]['COUNT(*)'];

  

   const data =[0];

this.state.totalUsers.push({count,points:data});
   }
   async getTotalTask(){
    const result = await db.read('tbl_task',['COUNT(*)'],[``]);
   var count =result[0]['COUNT(*)'];

   const points = await db.read('tbl_task',['COUNT(*)'],[`
   GROUP BY DATE_FORMAT(task_created_date,'%m')
   `])

   const data =[];
  // var total = this.state.totalTask[0].count; 
   if(points !=="empty"){
   points.forEach((element,index) => {
       var percent =(element['COUNT(*)']/count)*100;
      data.push(percent);
   });
}
this.state.totalTask.push({count,points:points === "empty"?0:data});

    //  this.state.totalTask.push({count:2});
   }

   

   async getDashBoardData(){
       await this.getTotalTask();
       await this.getAssignedOrders();
       await this.getOrdersBeingredone();
       await this.getCancelledOrders();
       await this.getCompletedOrders();
       await this.getpendingReviews();
       await this.getTotalUsers();
      
      

       return this.state;
   }

   async getCategories(){
    const result = await db.read('category',['*'],[`
   `])

   if(result === "empty"){
       return [];
   }

   return result;
   }
}

module.exports =WriterDashboard;