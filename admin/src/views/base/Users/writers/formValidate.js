function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassWord(password){
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
    return reg.test(password);
}

function validatePhone(Phone){
    var pHONE =/^([0-9]{10}|[0-9]{12})$/ ///^[0-9]+$/;
    return pHONE.test(Phone);
}

const FormValidation={
    RegisterForm:(email,username,password,ConfirmPassword,country,address,phone,category)=>{
            if(validateEmail(email)){
              if(username !==""){
               if(validatePassWord(password)){
                   if(password ===ConfirmPassword){
                    if(country !==""){
                      if(address !==""){
                        if(validatePhone(phone)){
                            
                            if(category !==" " && category !=="0"){
                               return true;
                            }else return "Provide writer category";
                        }else return "invalid Phone format";
                      }else return "Provide Writer Address";
                    }else return "Provide Country";
                   }else return "Password much Error";
               }else return "Ensure Password is not less than 8 and has atleast 1 speacial character and one uppercase,one lowercase and one digit";
              }else return "Provide Username";
            }else return "Enter Correct Email Format";
    },
 
    postTaskForm:(title,category,time,expectedDate,pages,pricePerpage,totalAmountTobePaid,description,service,workType,selectedInvoice)=>{
      if(title !==""){
        if(category !==""){
          if(time !==""){
            if(expectedDate !==""){
              if(pages !==""){
               if(pricePerpage !==""){
                  if(description !==""){
                    if(service !==""){
                      if(workType !==""){
                        if(selectedInvoice !==""){
                        return true;
                        }else return "provide invoice ,select new date or assign existing invoice";
                      }else return "provide worktype";
                    }else return "provide service name";
                      
                  }else return "provide task description";
               }else return "provide price per page for this task";
              }else return "provide pages for this task";
            }else return "provide date for submision";
          }else return "provide time for submision";
        }else return "provide category";
      }else return "provide task title";

    }

}

export default FormValidation;