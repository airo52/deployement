import Axios from "../config";

function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validateLogin (email,password){
    if(email !==""){
        if(validateEmail(email)){
            if(password !==""){
                  return true;
            }else{return "password is required"}
        }else{ return "wrong email format"}
    }else{ return "email is required"}
 }

 const Loginn = async (email,password,Profile)=>{
    try {
         var res = validateLogin(email,password);
         if(res == true){
            var data = "password="+password+"&email="+email
        const endPoint =`Login/admin?${data}`;

       // console.log(endPoint)
       
       const result = await Axios.post(endPoint);
       
       if(result.data.success !==undefined && result.data.success == true){
          if(result.data.type === "super" || result.data.type ==="manager"){
              
            const { accessToken,refreshToken } = result.data.tokens;
            
            const ta=accessToken;
            const tr=refreshToken;
            
            localStorage.setItem('ta',ta);
            localStorage.setItem('tr',tr);
            //localStorage.setItem('if',JSON.stringify(result.data.data));


            Profile(result.data.data);
            return(result.data.success);
            //window.location.href="/#/home";

          }
        }else{ return result.data;}
      
                  // return false;
       // return result.data;
        }else{
            return res;
        }
   } catch (error) {
         console.log(error)
   }
}

const Activate = async (Key)=>{
    const key = parseInt(Key);
   

    const endPoint =`/admin/api/c2/activate/${key}`;

    const result = await Axios.post(endPoint);
   
    return result.data;

}

const Logout = async ()=>{
    const accessToken = localStorage.getItem('ta');
    const refreshToken = localStorage.getItem('tr');

     const endPoint = `Logout/${refreshToken}`;

     const result = await Axios.post(endPoint);
      
     if(result.data == true){
        
         localStorage.clear();
         window.location.reload();
     }
  //  localStorage.setItem('ta',ta);
   // localStorage.setItem('tr',tr);
}

export {
    Loginn,
    Logout,
    Activate
}