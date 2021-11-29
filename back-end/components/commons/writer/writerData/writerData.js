const { Database  } = require('../../../database/database');

var db = new Database();

class WriterData{
    constructor(id){
        this.id = id;
    }

   async getAssignedTask(){
    const result = await db.read('tbl_task',[`
    task_id,
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
    `],[`INNER JOIN tbl_writer ON tbl_writer.witer_id=tbl_task.task_writer WHERE tbl_task.task_status='assigned' AND tbl_task.task_writer ='${this.id}'`]);
    if(result === "empty"){
        return [];
    }
    else return result;
    }

   async getCompletedTask(){
    const result = await db.read('tbl_task',[`
    task_id,
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
 `],[`INNER JOIN tbl_writer ON tbl_writer.witer_id=tbl_task.task_writer WHERE tbl_task.task_status='completed' AND tbl_task.task_writer ='${this.id}'`]);
    if(result === "empty"){
        return [];
    }else return result;
    }

    async getOngoingOrders(){
        const result = await db.read('tbl_task',[`
        task_id,
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
     `],[`INNER JOIN tbl_writer ON tbl_writer.witer_id=tbl_task.task_writer WHERE tbl_task.task_status='in-progress' OR tbl_task.task_status='revision' AND tbl_task.task_writer ='${this.id}'`]);
        if(result === "empty"){
            return [];
        }else return result;
    }

    async getOrdersBeingRedone(){
        console.log(this.id)
        const result = await db.read('tbl_task',[`
        task_id,
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
     `],[`INNER JOIN tbl_writer ON tbl_writer.witer_id=tbl_task.task_writer WHERE tbl_task.task_status='revision' AND tbl_task.task_writer ='${this.id}'`]);
        if(result === "empty"){
            return [];
        }else return result;
    }

    async getOrdersBeingReviewd(){
        const result = await db.read('tbl_task',[`
        task_id,
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
     `],[`INNER JOIN tbl_writer ON tbl_writer.witer_id=tbl_task.task_writer WHERE tbl_task.task_status='pending' AND tbl_task.task_writer ='${this.id}'`]);
        if(result === "empty"){
            return [];
        }else return result;
    }

    async getCancelledOrders(){
        const result = await db.read('tbl_task',[`
        task_id,
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
     `],[`INNER JOIN tbl_writer ON tbl_writer.witer_id=tbl_task.task_writer WHERE tbl_task.task_status='cancelled' AND tbl_task.task_writer ='${this.id}'`]);
        if(result === "empty"){
            return [];
        }else return result;  
    }

}

module.exports =WriterData;