import { useEffect, useState } from "react";
import ApiRequest from "src/Api/Data/requestApi";
import ModalCard from "src/views/modal/Modal";
import swal from "sweetalert";
//import ModalCard from "src/views/modal/Modal";
//import CreateAdmin from "./CreateAdmins";


const RegisteredAdminProfile=({back,id})=>{

    const [show, setShow] = useState(false);
    const [isShowLoader,setShowLoader] = useState(false);

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [ConfirmPassword,setConfirmPassword] = useState('');
    const [country,setCountry] = useState('');
    const [address,setAdress] = useState('');
    const [phone,setPhone] = useState('');
    const [category,setCategory] = useState([]);
    const [username,setUsername] = useState('');
  //  const [userId,setUserId]=useState('');
    const [image,setImage] = useState('');
    const [profile,setProfile] = useState('');
    const [total,setTotal] = useState('');
    const [uploaded,setUploaded] = useState('');
    const [percent,sePercent] = useState('');
    const [status,setStatus] = useState('');


   
    const [userId,setUserId]=useState('');

     
    const getUserData = async ()=>{
      const result = await ApiRequest.getRegAdminData(id);

      //console.log(result.data[0][0].user_email);
      //console.log(result.data)
      setEmail(result.data[0][0].user_email);
      setUsername(result.data[0][0].user_username);
      setCountry(result.data[0][0].user_country);
      setAdress(result.data[0][0].address);
      setPhone(result.data[0][0].user_phone);
      setImage(result.data[0][0].user_profile);
      setCategory(result.data[0][0].user_type);
      setUploaded(result.data[1].totalTaskUoloaded)
      setTotal(result.data[2].task);
      setStatus(result.data[0][0].user_status);

      sePercent(result.data[3].range+"%");
      
}

const BlockUserPermanet=(id,username)=>{
  swal("You Are About To Permanently Block "+username+"!?", {
      buttons: {
        cancel: "Dont Block!",
        delete: {
          text: "Block User",
          value: "delete",
        },
       
      },
    })
    .then(async (value) => {
      switch (value) {
     
       
     
        case "delete":
            const result = await ApiRequest.BlockAdmin(id);
            if(result.data == true){
          swal(`${username}`, "Deleted Succesfully", "success");
         getUserData();
         // LoadWriters();
            }
          break;
     
        default:
          swal("Process Canceled Succesfully!");
      }
    });
}

const DisableUser =(id,username)=>{
swal("","Unblock "+username+"!?","warning", {
  buttons: {
    cancel: "Cancel!",
    delete: {
      text: "Unblock User",
      value: "unblock",
    },
   
  },
})
.then(async (value) => {
  switch (value) {
 
   
 
    case "unblock":
      const result = await ApiRequest.unblockAdmin(id);
      
     if(result.data == true){
      swal(`${username}`, "unblocked Succesfully", "success");
      getUserData();
     // LoadWriters();
     }
      break;
 
    default:
      swal("Process Canceled Succesfully!");
  }
});
}

    const Checks = (s)=>{
      if(s == 1){
        return true;
      }else{
        return false;
      }
    }

    const Buttons =(id,username,checkeds)=>{
      return <> 
           
         
           <button style={{width:"100%"}}  onClick={()=>checkeds==true?BlockUserPermanet(id,username):DisableUser(id,username)} className={checkeds?"fa fa-unlock btn btn-info":"fa fa-lock btn btn-warning"}></button> 
           
       </>
         }

  
    useEffect(()=>{
      getUserData();
    },[]);

   //let id=1;
     return<>   
         <div style={{marginTop:"20px"}} className="container">
     <div className="main-body">
     <div style={{height:"60px",display:"flex",flexDirection:"row",justifyContent:"space-between"}} className="card">
            <h4 style={{marginTop:"10px",marginLeft:"20px"}}><i>Go Back</i></h4>
             <button onClick={()=>back()}  style={{width:"40px",height:"40px",marginRight:"10px",marginTop:"7px",borderRadius:"20px"}} className="btn btn-primary fa fa-history"></button>
        </div>
      
           
     
           <div className="row gutters-sm">
             <div className="col-md-4 mb-3">
               <div className="card">
                 <div className="card-body">
                   <div className="d-flex flex-column align-items-center text-center">
                     <img src={image} alt="Admin" className="rounded-circle" width="150"/>
                     <div className="mt-3">
                       <h4>{username}</h4>
                       <p className="text-secondary mb-1">{category}</p>
                       <p className="text-muted font-size-sm">{address}</p>
                      
                      <div>
                        {Buttons(id,username,Checks(status))}
                      </div>
                     </div>
                   </div>
                 </div>
               </div>
              
 
 
              
 
             </div>
             <div className="col-md-8">
               <div className="card mb-3">
                 <div className="card-body">
                   <div className="row">
                     <div className="col-sm-3">
                       <h6 className="mb-0">Full Name</h6>
                     </div>
                     <div className="col-sm-9 text-secondary">
                       {username}
                     </div>
                   </div>
                  <hr/>
                   <div className="row">
                     <div className="col-sm-3">
                       <h6 className="mb-0">Email</h6>
                     </div>
                     <div className="col-sm-9 text-secondary">
                       {email}
                     </div>
                   </div>
                  <hr/>
                   <div className="row">
                     <div className="col-sm-3">
                       <h6 className="mb-0">Phone</h6>
                     </div>
                     <div className="col-sm-9 text-secondary">
                       {phone}
                     </div>
                   </div>
                  <hr/>
                   <div className="row">
                     <div className="col-sm-3">
                       <h6 className="mb-0">Mobile</h6>
                     </div>
                     <div className="col-sm-9 text-secondary">
                       {phone}
                     </div>
                   </div>
                  <hr/>
                   <div className="row">
                     <div className="col-sm-3">
                       <h6 className="mb-0">Address</h6>
                     </div>
                     <div className="col-sm-9 text-secondary">
                        
                      {address}
                     </div>
                   </div>


                  <hr/>
                  <div className="row">
                     <div className="col-sm-3">
                       <h6 className="mb-0">COUNTRY</h6>
                     </div>
                     <div className="col-sm-9 text-secondary">
                        
                      {country}
                     </div>
                   </div>
                  
                 </div>
               </div>
 
               <div className="row gutters-sm">
                 <div className="col-sm-12 mb-3">
                   <div className="card h-100">
                     <div className="card-body">
                       <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">SYSTEM</i>ACCTIVITIES FULL REPORT</h6>
                       <div className="col-sm-12 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Writer</i>Account Status</h6>
                      <small>Total Task Uploaded( {uploaded} of {total})</small>
                      <div className="progress mb-3" style={{height:"5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width:percent}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                     
                     
                    </div>
                  </div>
                </div>
                      
                     </div>
                   </div>
                 </div>


                 
                
                
               </div>
 
 
 
             </div>
           </div>
 
         </div>
     </div>
   
     </>
}
export default RegisteredAdminProfile;