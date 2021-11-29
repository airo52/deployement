const { Database } = require("../../../database/database");

var db = new Database();
class Orders{
    constructor(){

    }

   async ordersInProgress(){
    const result = await db.read('tbl_task',[`
       task_id,
       task_title,
       writer_display_name,
       writer_email,
       task_status,
       writer_category,
       taskl_accepted_date,
       task_deadline
    `],[`INNER JOIN tbl_writer ON tbl_writer.witer_id=tbl_task.task_writer WHERE tbl_task.task_status='in-progress' AND tbl_task.task_writer !='0'`]);
       if(result === "empty"){
           return [];
       }else return result;
    }

    async CancelledOrders(){
        const result = await db.read('tbl_task',[`
        task_id,
        task_title,
        writer_display_name,
        writer_email,
        task_status,
        writer_category,
        taskl_accepted_date,
        task_deadline
     `],[`INNER JOIN tbl_writer ON tbl_writer.witer_id=tbl_task.task_writer WHERE tbl_task.task_status='cancelled'`]);
        if(result === "empty"){
            return [];
        }else return result;
    }

    async OrdersBeingRevised(){
        const result = await db.read('tbl_task',[`
        task_id,
        task_title,
        writer_display_name,
        writer_email,
        task_status,
        writer_category,
        taskl_accepted_date,
        task_deadline
     `],[`INNER JOIN tbl_writer ON tbl_writer.witer_id=tbl_task.task_writer WHERE tbl_task.task_status='revision'`]);
        if(result === "empty"){
            return [];
        }else return result;
    }

    async AssignedOrders(){
        const result = await db.read('tbl_task',[`
        task_id,
        task_title,
        writer_display_name,
        writer_email,
        task_status,
        writer_category,
        taskl_accepted_date,
        task_deadline,
        task_Descipline,
        task_created_date,
        task_description
        `],[`INNER JOIN tbl_writer ON tbl_writer.witer_id=tbl_task.task_writer WHERE tbl_task.task_status='assigned' OR tbl_task.task_status='Rejected'`]);
        if(result === "empty"){
            return [];
        }
        else return result;
    }

    async CompletedOrders(){
        const result = await db.read('tbl_task',[`
        task_id,
        task_title,
        writer_display_name,
        writer_email,
        task_status,
        writer_category,
        taskl_accepted_date,
        task_deadline
     `],[`INNER JOIN tbl_writer ON tbl_writer.witer_id=tbl_task.task_writer WHERE tbl_task.task_status='completed'`]);
        if(result === "empty"){
            return [];
        }else return result;
    }

    async NewSubmitedTask(){
        const result = await db.read('tbl_task',[`
        task_id,
        task_title,
        writer_display_name,
        writer_email,
        task_status,
        writer_category,
        taskl_accepted_date,
        task_deadline,
        task_Descipline,
        task_created_date,
        task_description
        `],[`INNER JOIN tbl_writer ON tbl_writer.witer_id=tbl_task.task_writer WHERE tbl_task.task_status='pending'`]);
        if(result === "empty"){
            return [];
        }
        else{ 
            //console.log(result);
            return result};
    }

    async NewSubmitedFiles(task_id){
        //tbl_task_submited_files

        var cleanId = db.Escape(task_id);

        const result = await db.read('tbl_task_submited_files',[`*`],[`WHERE tbl_task_submited_files.tbl_task_id=${cleanId}`]);
        if(result === "empty"){
            return [];
        }
        
        else {
            
            return result
        };
    }


    /*async getTaskNotAssigned(){
      
    }*/
}

module.exports = Orders;