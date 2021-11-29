import { useEffect, useState } from "react";
import ApiRequest from "src/Api/Requests/Apirequest";
import swal from "sweetalert";
import ModalCard from "../Modal/Modal";
import CreateAdmin from "./CreateAdmins";

const Profile = ()=>{

  const [Details,setDetails]=useState([]);
  const [save,setSave] = useState(true);

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
  const [userId,setUserId]=useState('');
  const [image,setImage] = useState('https://bootdey.com/img/Content/avatar/avatar7.png');
  const [profile,setProfile] = useState('');


  const Save =async ()=>{
      
    if(profile ===""){
      swal("Error","Provide your new profile",'error');

      return
    }else{
         const result = await ApiRequest.UpdateProfile2(profile); //ApiRequest.UpdateProfile(profile);

         if(result !==false){
          const results = await ApiRequest.UpdateProfile(result);
          if(results === "success"){
           
            swal("Success","Profile update succesfull",'success');
  
            LoadUserData();
           }

         }

         
    }

  
}

const UpdateDetails = async ()=>{
        
  if(password !=="" || ConfirmPassword !==""){
    if(password !== ConfirmPassword){
         swal('Error','Your password cant be updated make sure they mach or leave them blank','error');
      return
    }
  }

  const data = "email="+email+"&password="+password+"&country="+country+"&address="+address+"&phone="+phone+"&username="+username;
  
  const result = await ApiRequest.UpdateData(data);

  if(result.data === 'success'){
   swal('successs','profile update success','success');
   LoadUserData();
  }else{
   swal('Error',result.data,'error');
  }

}


const Close=()=>{
  setShow(false)
}
const OpenModal=()=>{
  setShow(true);
}

const Content=()=>{
  

  const HandleImage =async  (event)=>{

    //  unction  FileRead(event) {
          var file = event.target.files[0];
          var reader = new FileReader();
          reader.onload = function(event) {
          
           const resul= event.target.result;
      
           setImage(resul);
          // setImage(file);

          setProfile(file);

              
           
          };
          reader.readAsDataURL(file);

  }

  return <>
           <form>
<div class="form-group">
    <label for="exampleFormControlFile1">Click To Select Your Profile</label>
     <input type="file" onChange={(e)=>HandleImage(e)} class="form-control-file" id="exampleFormControlFile1"/>
 </div>
  </form>
        </>
}

  const LoadUserData=async (id)=>{
    setSave(true);
    
       const result = await ApiRequest.getUserDetails();
    

       setDetails(result.data);
       setEmail(result.data.result[0].writer_email);
       setUsername(result.data.result[0].writer_name);
       setCountry(result.data.result[0].country);
       setAdress(result.data.result[0].address);
       setPhone(result.data.result[0].phone);
       setImage(result.data.result[0].writer_profile);
    
       setSave(false);
  }

  useEffect(()=>{
      LoadUserData()
  },[]);
    return <>
             {!save && <div className="container">
    <div className="main-body">
    <div style={{height:"60px",display:"flex",flexDirection:"row",justifyContent:"space-between"}} className="card">
            <h4 style={{marginTop:"10px",marginLeft:"20px"}}><i>Go Back</i></h4>
             <button  style={{width:"40px",height:"40px",marginRight:"10px",marginTop:"7px",borderRadius:"20px"}} className="btn btn-primary fa fa-history"></button>
        </div>
        
          
    
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src={Details['result'][0].writer_profile} alt="Admin" className="rounded-circle" width="150"/>
                    <div className="mt-3">
                      <h4>{Details['result'][0].writer_name}</h4>
                      <p className="text-secondary mb-1">{Details['result'][0].address}</p>
                      <p className="text-muted font-size-sm">{Details['result'][0].country}</p>
                      <div>
                         <button onClick={()=>OpenModal()} className="btn btn-info">UPDATE PROFILE IMAGE</button>
                      </div>
                  
                    </div>
                  </div>
                </div>
              </div>
          


              <div className="card mt-3">
                <ul className="list-group list-group-flush">
                 
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      CURRENT ASSIGNED TASK
                        </h6>
                    <span className="text-secondary">
                      TASK
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <div style={{width:"100%"}}>
                      {Details['state']['currentAssigneTask'][0].length < 1?"NO TASK ASSIGNED":Details['state']['currentAssigneTask'][0].map((item,index)=>{
               
                        return  <div className="card">
                        <span style={{marginLeft:"5px"}}>name</span>
                        <div>
                          <button style={{outline:"none",border:"0px",marginRight:"10px",marginBottom:"5px",marginLeft:"5px"}} className="badge badge-info">{item.task_title}</button>
                          <button style={{outline:"none",border:"0px",marginRight:"10px",marginBottom:"5px"}}  className="badge badge-info">Chat</button>
                       
                        </div>
                        

                    </div>
                      })}
                     

                        
                      </div>
                    
                   
                  </li>
                 
                </ul>
              </div>







              <div className="row gutters-sm">
                 <div className="col-sm-12 mb-3">
                   <div className="card h-100">
                     <div className="card-body">
                       <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">UPDATE</i>ACCOUNT</h6>
                        <CreateAdmin
                          isShowLoader={isShowLoader}
                          email={email}
                          setEmail={setEmail}
                          password={password}
                          setPassword={setPassword}
                          ConfirmPassword={ConfirmPassword}
                          setConfirmPassword={setConfirmPassword}
                          country={country}
                          setCountry={setCountry}
                          address={address}
                          setAdress={setAdress}
                          phone={phone}
                          setPhone={setPhone}
                          username={username}
                          setUsername={setUsername}
                          isShowButton={true}
                          Save={UpdateDetails}
                        />
                      
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
                      {Details['result'][0].writer_name}
                    </div>
                  </div>
                 <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {Details['result'][0].writer_email}
                    </div>
                  </div>
                 <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {Details['result'][0].phone}
                    </div>
                  </div>
                 <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Mobile</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {Details['result'][0].phone}
                    </div>
                  </div>
                 <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                       
                    {Details['result'][0].address}
                    </div>
                  </div>
                 <hr/>
                 
                </div>
              </div>

              <div className="row gutters-sm">
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Writer</i>Account Status</h6>
                      <small>CompletedTask({Details['state']['completedTask'][0].count} of {Details['state']['completedTask'][0].of})</small>
                      <div className="progress mb-3" style={{height:"5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width:Details['state']['completedTask'][0].value+"%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Payment Progress</small>
                      <div className="progress mb-3" style={{height:"5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width:Details['state']['paymentProgress'][0].value+"%"}} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Assigned Task({Details['state']['assignedTask'][0].count} of {Details['state']['assignedTask'][0].of})</small>
                      <div className="progress mb-3" style={{height:"5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width:Details['state']['assignedTask'][0].value+"%"}} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Attempted Task({Details['state']['attemptedTask'][0].count} of {Details['state']['attemptedTask'][0].of})</small>
                      <div className="progress mb-3" style={{height:"5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width:Details['state']['attemptedTask'][0].value+"%"}}aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                     
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body" style={{overflowY:"auto"}}>
                      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Writer</i>Existing Categories</h6>
                     
                      
                     <button style={{width:"100%"}} className="btn btn-info">{Details['result'][0].writer_category}</button>
                    
                     <hr/>

                     <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Writer</i>Total Earned</h6>
                      <h2> <small>$ {Details['state'].totalCashEarned[0]}</small></h2>
                    </div>
                    
                  </div>
                </div>
               
              </div>



            </div>








          </div>

        </div>
    </div>}

    <ModalCard
       Show={show}
       Close={Close}
       isShowLoader={isShowLoader}
       ButtonName={"upload profile"}
       content={<Content/>}
       Save={Save}
     /> 

          </>
}

export default Profile;