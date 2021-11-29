import Axios from "./config";
async function UpdateToken(refreshToken){
    try {
        const endPoint ='refreshToken?refreshToken='+refreshToken;
       
        const result = await Axios.post(endPoint);
        
        if(result.data == false){
          
         window.location.href="/#/login";
        }else{
           
            if(result.data.type === "super" ){
                
                const { accessToken,refreshToken } = result.data.tokens;
                
                const ta=accessToken;
                const tr=refreshToken;
                
                
                localStorage.setItem('ta',ta);
                localStorage.setItem('tr',tr);
               
                return true;
            }
            //console.log(result.data)
            
        }
    } catch (error) {
        //console.log(error);
    } 
}

async function requestRefreshToken(refreshToken,Profile){
    try {
        const endPoint ='refreshToken?refreshToken='+refreshToken;
       
        const result = await Axios.post(endPoint);
        
        if(result.data == false){
          
         window.location.href="/#/login";
        }else{
           
            if(result.data.type === "super" ){
                
                const { accessToken,refreshToken } = result.data.tokens;
                
                const ta=accessToken;
                const tr=refreshToken;
                
                
                localStorage.setItem('ta',ta);
                localStorage.setItem('tr',tr);
               // localStorage.setItem('gh',tr);
               
                Profile(result.data.data);
                return true;
            }
            //console.log(result.data)
            
        }
    } catch (error) {
       // console.log(error);
    }
   
}
/*async function verifyAccessToken(accessToken,Profile){

   try {
          
           const endPoint ='veryAccessToken?accessToken='+accessToken;
           const result = await Axios.post(endPoint);
           console.log(result)

           if(result.data.success !==undefined && result.data.success == true){
            if(result.data.type === "super"){
          
              const { accessToken,refreshToken } = result.data.tokens;
                
              const ta=accessToken;
              const tr=refreshToken;
             // console.log(result.data.tokens);
              
              localStorage.setItem('ta',ta);
              localStorage.setItem('tr',tr);
  
  
              Profile(result.data.data);
               return result.data.success;
            }
          }else{ return false;}


          
   } catch (error) {
         console.log(error)
  }

}*/

async function veryAccessTokens(accessToken,Profile){
    try {
          
        const endPoint ='veryAccessToken?accessToken='+accessToken;
        const result = await Axios.post(endPoint);
      //  console.log(result)

        if(result.data.success !==undefined && result.data.success == true){
         if(result.data.user.type === "super"){
           
           


            Profile(result.data.user);
            return result.data.user;
         }
       }else{ return false;}


       
} catch (error) {
     // console.log(error)
}
}



const Tokens = function(){
    const accessToken = localStorage.getItem('ta');
    const refreshToken = localStorage.getItem('tr');

    

    return {accessToken,refreshToken};
}

export {requestRefreshToken,Tokens,veryAccessTokens,UpdateToken}