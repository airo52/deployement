const { dateGenerator, urls } = require("../../config/config");
const { encryptData, decryptData } = require("../../config/cryptor");
const { SignUserJwt } = require("../../config/jwt");
const { Database } = require("../../database/database");
const { sendMail } = require("../functions/sendMail");
const { JoiValidation } = require("./JoiValidation");

const db = new Database();

const Authetication={
     InsertActivationId:async function(userId,key,type){
          var date = new Date().toISOString().slice(0,10);
          await db.insert([key,userId,type,0,date],'ActivationKeys');
     },
     confirmEmailBody:function(username,key,activationUrl){
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
                                  <p>
                                      <i class="glyphicon glyphicon-envelope"></i>
                                      <a>email@newsbank.com</a>
                                      <br />
                                  <p>Dear <small style="color: cadetblue;">${username}</small>  ,
                                      <br>
                                      your registration to PEAK-WRITERS is succesfull
                                      <br/>
                                      Your Activation code is (${key})
                                      <br>
                                    
                                      Click <a href="${activationUrl}Key=${key}">Here</a>
                                  </p>
                                      <br />
                                      <i class="glyphicon glyphicon-gift"></i>(${date})</p>
                                 
                                  
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>`
      },
      ConfirmMail:async function(email,username,key,url){
          const body = this.confirmEmailBody(username,key,url);
        return  sendMail(body,email,'PEAK-WRITERS account(Activation)',username);

     },
     Login:async function(email,password,type){
        
          const validate =JoiValidation.LoginValidation({email,password}) //Validation.(email,password);

            
            
          try {
           const err= validate.error['details'][0]['message'];
          
           return err.replace('\"',"").replace('\"',"")
          } catch (error) {
             // return "no error";
           
             const cleanEmail = db.Escape(email.toString());
            
          
             if(type === "admin"){
                 //check other admin
                 const data= await adminLogin(cleanEmail,password);
                 
                 return data;
             }
             if(type === "writer"){
               const result = await db.read('tbl_writer',['*'],[`
               WHERE writer_email = ${cleanEmail} LIMIT 1
                `])
                 var data = await LoginLogic(result,type,password);
                
                return data;
             }
         
          }
     },
     Register:async function(email,password,username,country,phone,address,adminLevel,RegType){

          var fullName = username.split(' ');
          var lastName = fullName[fullName.length - 1];
          var defaultProfile = 'https://media.istockphoto.com/photos/illustration-of-smiling-happy-man-with-laptop-sitting-in-armchair-picture-id1226886130?b=1&k=20&m=1226886130&s=170667a&w=0&h=jMvDQqfHSx2PEdvvRtSNX6FVXPK-_WZ1UzBRToBHv4g=';
       
          if(RegType==="admin"){
               var validate = JoiValidation.adminRegistraTionValidation({email,password,username,country,phone,address,adminLevel})
          
          }

          if(RegType=="writer"){
             var category = adminLevel;
              var validate = JoiValidation.writerRegistraTionValidation({email,password,username,country,phone,address,category});

          }
          try {
               const err= validate.error['details'][0]['message'];
            
               return err.replace('\"',"").replace('\"',"");
          } catch (error) {
               if(RegType=== "admin"){
                  
                    const key = Math.floor(Math.random() * 89909867845) + 9876456557823;
                    const encryptedPassword = encryptData(password,key.toString());
                    
                    var status = 0;
                    const data =[
                           lastName,
                           username,
                           email,
                           encryptedPassword,
                           defaultProfile,
                           adminLevel,
                           status,
                           country,
                           phone,
                           address,
                           dateGenerator.date()
                     ];


                  const cleanEmail = db.Escape(email.toString());
             
                  const check = await db.read('tbl_user',['*'],[`
                   WHERE user_email = ${cleanEmail} LIMIT 1
                 `])

                 if(check === "empty"){
                    const InsertResult =await db.insert(data,'tbl_user');
                     
                     if(InsertResult.success !==undefined){
                         const lastId = InsertResult.info['insertId'];
      
                         const PermisionInsertResult = await db.insert([lastId,key,'tbl_user'],'permisions');
   
                        
      
                         if(PermisionInsertResult.success !==undefined){
                           const confirmationCode = Math.floor(Math.random() * 8990985) + 98823;
                           this.InsertActivationId(lastId,confirmationCode,'admin');
                         await  this.ConfirmMail(email,username,confirmationCode,urls.adminUrl);
                             return true;
                         }else return false;
                     }else return false;
                 }else{
                     return "ACCOUNT EXIST WITH THIS EMAIL";
                 }
               }

               if(RegType === "writer"){
                     
                    const key = Math.floor(Math.random() * 89909867845) + 9876456557823;
                    const encryptedPassword = encryptData(password,key.toString());
                    
                    var status = 0;
                    const data =[
                           username,
                           lastName,
                           email,
                           status,
                           defaultProfile,
                           encryptedPassword,
                           phone,
                           country,
                           address,
                           category,
                           dateGenerator.date()
                          
           
           
                   ];


                  const cleanEmail = db.Escape(email.toString());
             
                  const check = await db.read('tbl_writer',['*'],[`
                   WHERE writer_email = ${cleanEmail} LIMIT 1
                 `])

                 if(check === "empty"){
                    const InsertResult =await db.insert(data,'tbl_writer');
                     
                     if(InsertResult.success !==undefined){
                         const lastId = InsertResult.info['insertId'];
      
                         const PermisionInsertResult = await db.insert([lastId,key,'tbl_writer'],'permisions');
   
                        
      
                         if(PermisionInsertResult.success !==undefined){
                           const confirmationCode = Math.floor(Math.random() * 8990985) + 98823;
                           this.InsertActivationId(lastId,confirmationCode,'writer');
                         await this.ConfirmMail(email,username,confirmationCode,urls.writerUrl);
                             return true;
                         }else return false;
                     }else return false;
                 }else{
                     return "ACCOUNT EXIST WITH THIS EMAIL";
                 }
               }

          }
     },

     Logout:async function(refreshToken,res){
        if(refreshToken ===""){res.sendStatus(403); return false;};
        const cleanToken = db.Escape(refreshToken.toString());
    
        var result = await db.read('Tokens',['*'],[`WHERE token=${cleanToken} ORDER BY date DESC LIMIT 1`]);
        if(result === 'empty'){
            
            res.send(false);
    
        }
        else{
            const data =[
                {"status":1}
            ]
           const response= await db.update('Tokens',data,`token=${cleanToken}`);

           res.json(response);
        }


    },
     
}

async function LoginLogic(data,TYPE,UserpassWord){

     if(TYPE === "writer"){
         //const {author_id,author_display_name,author_account_status,author_profile,password} = data[0];
         const {witer_id,writer_display_name,writer_account_status,writer_profile,password,writer_email} = data[0];
         
         if(writer_account_status === 1){
          const Permision = await db.read('permisions',['perm_key'],[`WHERE permisions.perm_user='${witer_id}' AND permisions.perm_tbl='tbl_writer' LIMIT 1`]);
          
          if(Permision === "empty"){return "Internal server Error";}
 
          const key = Permision[0]['perm_key'];
          const serverPassword = decryptData(password,key);
          if(serverPassword === UserpassWord){
                const userData = {
                                  id:witer_id,
                                  username:writer_display_name,
                                  profile:writer_profile,
                                  email:writer_email,
                                  type:"writer"
                                 }
 
               const userVisibleData = {
                          username:writer_display_name,
                          profile:writer_profile,
                          email:writer_email
                      }
 
                  const Tokens = SignUserJwt(userData);
                       var date = new Date().toISOString().slice(0,10);
                       
                 await db.insert([Tokens.refreshToken,witer_id,date,0],'Tokens');
                
                  return {
                       tokens:Tokens,
                       data:userVisibleData,
                       type:'writer',
                       success:true,
                      
                  }
                   
          }else{
              return "wrong password or email";
          }
 
 
         }else{ return "We are sorry This account is not Activated";}
 
 
     }
     if(TYPE === "admin"){
      const {user_id,user_display_name,user_email,user_password,user_profile,user_type,user_status} = data[0];
      if(user_status === 1){
         const Permision = await db.read('permisions',['perm_key'],[`WHERE permisions.perm_user='${user_id}' AND permisions.perm_tbl='tbl_user' LIMIT 1`]);
         if(Permision === "empty"){return "Internal server Error";}
 
         const key = Permision[0]['perm_key'];
         const serverPassword = decryptData(user_password,key);
         if(serverPassword === UserpassWord){
 
             const userData ={
                 id:user_id,
                 username:user_display_name,
                 profile:user_profile,
                 type:user_type,
                 email:user_email
             }
            
             const userVisibleData = {
                 username:user_display_name,
                 profile:user_profile,
                 email:user_email
             }
             var date = new Date().toISOString().slice(0,10);
             const Tokens = SignUserJwt(userData);
             await db.insert([Tokens.refreshToken,user_id,date,0],'Tokens');
                  return {
                       tokens:Tokens,
                       data:userVisibleData,
                       type:user_type,
                       success:true
                  }
 
         }else{ return "wrong email or password"}
      }else{ return "we are sorry this account can not be accessed Before Activation"};
     }
  
 }
 
 async function adminLogin(email,password){
     const result = await db.read('tbl_user',['*'],[`
     WHERE user_email = ${email} LIMIT 1
  `])
 
  if(result === "empty"){
      return "Wrong password or Email";
  }
  var data = await LoginLogic(result,'admin',password);
 
  return data;
 }

module.exports={Authetication}