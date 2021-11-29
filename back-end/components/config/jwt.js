const jwt = require('jsonwebtoken');
//const { use } = require('../commons/router');
const { Database } = require('../database/database');
const {Tokens} = require('./config');



const SignJwt =(user)=>{
    const accessToken = jwt.sign(user,Tokens.Auth_Token_Secret);
    return accessToken;
}

const SignUserJwt=(user)=>{
    const accessToken = jwt.sign(user,Tokens.Auth_Token_Secret,{expiresIn:"40min"});
    
    const refreshToken = jwt.sign(user,Tokens.Refresh_token_secret,{expiresIn:"2days"});

    const data ={
          accessToken,
          refreshToken,
    }

    return data;

}

const VerifyAcessToken =async (accessToken,res)=>{
   if(accessToken ===""){res.sendStatus(403); return false;};
    var callback;
  await jwt.verify(accessToken,Tokens.Auth_Token_Secret,(err,user)=>{
       if(err){
           res.json(false);
       }else{
           
          callback ={success:true,user};
       }
   })

   return callback;
}

const VerifyRefreshToken = async (refreshToken,res)=>{
    const db = new Database();
    if(refreshToken ===""){res.sendStatus(403); return false;};
    const cleanToken = db.Escape(refreshToken.toString());

    var result = await db.read('Tokens',['*'],[`WHERE token=${cleanToken} AND status=0 ORDER BY date DESC LIMIT 1`]);
    if(result === 'empty'){
        
        res.send(false);

    }
    else{
        
        jwt.verify(refreshToken,Tokens.Refresh_token_secret,async (err,user)=>{
            if(err){
                res.json(false)
            }else{
                
                const userData = {
                    id:user.id,
                    username:user.username,
                    profile:user.profile,
                    type:user.type,
                    email:user.email
                   }

                  
                const data =[
                    {"status":1}
                ]
                const userVisibleData = {
                    username:userData.username,
                    profile:userData.profile,
                    email:user.email
                }
                  
                        //"status",
                
                  await db.update('Tokens',data,`token=${cleanToken}`);
                   const token = SignUserJwt(userData);
                   var date = new Date().toISOString().slice(0,10);
                   await db.insert([token.refreshToken,result[0].token_user,date,0],'Tokens');

                   
                   const dat= {
                    tokens:token,
                    data:userVisibleData,
                    type:user.type,
                    success:true
                   }
                   
                   res.json(dat)

                //res.json(tokens);
            }
        })
    }

}

const getUserFromToken =async (token)=>{
    if(token ===""){return false;};
    var callback;
   jwt.verify(token,Tokens.Auth_Token_Secret,(err,user)=>{
       if(err){
           callback=false;
          // res.json(false);
       }else{
           
          callback ={success:true,user};
       }
   })

   return callback;
}
const autheticateToken =(req,res,next)=>{
   const authHeader = req.headers['authorization'];

   const token = authHeader && authHeader.split(' ')[1];

   if(token == null) {return res.sendStatus(401)}

   jwt.verify(token,Tokens.Auth_Token_Secret,(err,user)=>{
       if(err){
           res.sendStatus(403);
       }

       req.user = user;
       next();
   })
}

//console.log(SignUserJwt(user));
module.exports ={
    SignJwt,
    autheticateToken,
    SignUserJwt,
    VerifyAcessToken,
    VerifyRefreshToken,
    getUserFromToken
}

