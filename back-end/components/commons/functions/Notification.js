


const { dateGenerator } = require('../../config/config');
const { Database } = require('../../database/database');

const db = new Database();
const NotificationForReject =async  function(user_id,task_id){
    //Notifications
        var text =`Task id (${task_id}) has been rejected on ${dateGenerator.date()}`;
    const data =[
          text,
          '001',
          user_id,
          '0',
        dateGenerator.date()
  ];

    var result = await db.insert(data,'Notifications');

    return;

}

const CancelOrderNotification = async function(user_id,task_id){

    var text =`Task id (${task_id}) has been canceled by the writer on ${dateGenerator.date()}`;
    const data =[
          text,
          '001',
          user_id,
          '0',
        dateGenerator.date()
  ];

    var result = await db.insert(data,'Notifications');

    return;

}

const TaskSubmisionNotification = async function(user_id,task_id){
    var text =`Task id (** ${task_id} **) has been submited on ${dateGenerator.date()}`;
    const data =[
          text,
          '001',
          user_id,
          '0',
        dateGenerator.date()
  ];

    var result = await db.insert(data,'Notifications');

    return;
}





module.exports ={
    NotificationForReject,
    CancelOrderNotification,
    TaskSubmisionNotification
}