//const { getUserFromToken } = require("../../config/jwt");

const { getUserFromToken } = require("./jwt");

const tokens ={
      accessToken:(data)=>{
          
          return data['x-access-key'];
      },
      refreshToken:(data)=>{
          return data['x-access-token'];
      },
      User:async (body)=>{
       //  console.log(body)
        const accessTokens= tokens.accessToken(body)//accessToken(body)//tokens.accessToken(req.body);
        const refreshToken = tokens.refreshToken(body);

       // console.log(accessTokens)

        const data =await getUserFromToken(accessTokens);

        if(data == false){
            return false;
        }else{
          
         const {type,id,email} = data['user'];

         return {type,id,email};
        }

      

      }
}
module.exports= {
    tokens
}