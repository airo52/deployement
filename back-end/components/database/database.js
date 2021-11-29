const con = require('../config/db');

class Database{
    insert(values,table){
         var Fields = Array();

         return new Promise(function(resolve,reject){
             con.query(
                 `SELECT * FROM `+table,
                 function(err,rows,fields){
                     if(err) reject(new Error(err));
                     if(fields){
                         for (let index = 0; index < fields.length; index++) {
                             const element = fields[index]['name'];

                             Fields.push(element);
                             
                         }

                         var clearFields = "`"+Fields.join("`,`")+"`";
                         var clearSanitizedValues = "'"+values.join("','")+"'";

                         var Sql ="INSERT INTO `"+table+"` ("+clearFields+") VALUES ("+null+","+clearSanitizedValues+")";

                         con.query(Sql,(err,result)=>{
                             if(err){reject(new Error("error4: "+err))}
                             else{
                                 resolve({success:true,info:result});
                             }
                         })
                     }
                 }
             )
         })
    }

    read(tableName,arrayVal,condition){
           return new Promise(function(resolve,reject){
                try {
                    var arrayKeys = arrayVal.join(", ");
                    var Condition = condition.join(",");

                    var sql = `SELECT ${arrayKeys} FROM ${tableName} ${Condition}`;

                    con.query(sql,(err,rows)=>{
                        if(err) reject(err);
                        else if(!rows.length) resolve("empty");
                        else resolve(rows);
                    })
                } catch (error) {
                       reject(error);
                }
           })
    }

    delete(table,column,value){
         return new Promise(function(resolve,reject){

            var val = con.escape(value);

            const sql = `DELETE FROM ${table} WHERE ${column}=${val}`;
            con.query(sql,(err,result)=>{
                if(err){reject(err);};
               // console.log(result)
                 if(result.affectedRows > 0) resolve(true);
                 else resolve(false);

            })

         })
    }

    update(table,data,where){
       return new Promise(function(resolve,reject){
           var Sql =  buildSqlUpadte(table,data,where);

           con.query(Sql,(err,result)=>{
              if(err){
                  console.log(err);

                  reject(err);
              }
              if(result.affectedRows > 0){resolve(true);}
               else resolve(false);
           })
       })
    }

  
    Escape(data){
        return con.escape(data);
     } 
}

function buildSqlUpadte(table,data,where) {
       var cols = Array();
       
       for(let index = 0; index < data.length; index++){
           const element = data[index];

           const Key=  Object.keys(element);
           const name = con.escape(data[index][Object.keys(element)]);

           const build = "`"+Key+"`"+"="+""+name+"";

           cols.push(build);
       }

       var column  = cols.join(",");

       var Sql = `UPDATE ${table} SET ${column} WHERE ${where}`;
       
       
       return Sql;
}


module.exports = {Database};