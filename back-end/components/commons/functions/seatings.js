const { Database } = require("../../database/database");

const db = new Database();
class seatings{

    async addPaymentMethods(){

    }

    async updateAllowedTask(number){
         let cleanNumber = parseInt(number);
         
         //check if ther is any data 
         var rules = await db.read('tbl_rules',['*'],[``]);
         if(rules === "empty"){
             var data=[
                  '0',
                  cleanNumber
             ]
              var InsertResult = await db.insert(data,'tbl_rules');
              if(InsertResult.success !==undefined){
                 return true;
              }else return false;
         }else{
            const data =[
                {"allowed_task_per_user":cleanNumber}
            ]
           const response= await db.update('tbl_rules',data,`rules_id=${rules[0].rules_id}`);
             return response;
         }
         
    }

    async updateBillingSequence(sequence){
        let cleanNumber = parseInt(sequence);
        var rules = await db.read('tbl_rules',['*'],[``]);

        if(rules === "empty"){
            var data=[
                cleanNumber,
                 '0'
           ]
            var InsertResult = await db.insert(data,'tbl_rules');
            if(InsertResult.success !==undefined){
               return true;
            }else return false;
        }else{
        
            const data =[
                {"billing_sequence":cleanNumber}
            ]
           const response= await db.update('tbl_rules',data,`rules_id=${rules[0].rules_id}`);
             return response;
        }
    }

   async getCurrentBillingAndTaskAllowed(){
        
    }

    
}
module.exports = seatings;