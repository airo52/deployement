import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ApiRequest from "src/Api/Data/requestApi";
import ModalCard from "src/views/modal/Modal";
import swal from "sweetalert";
import CreateAdmin from "./CreateAdmins";

const AdminProfile=()=>{

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

  
    //adminProfile

    const Save =async ()=>{
      
      if(profile ===""){
        swal("Error","Provide your new profile",'error');

        return
      }else{
           /*const result = await ApiRequest.UpdateProfile(profile);

           if(result === "success"){
            swal("Success","Profile update succesfull",'success');

            getUserData();
           }*/

           const result = await ApiRequest.UpdateProfile2(profile); //ApiRequest.UpdateProfile(profile);

           if(result !==false){
            const results = await ApiRequest.UpdateProfile(result);
            if(results === "success"){
             
              swal("Success","Profile update succesfull",'success');
    
             getUserData();
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
       }else{
        swal('Error',result.data,'error');
       }

  }

    const getUserData = async ()=>{
          const result = await ApiRequest.getAdminData();
          
          setEmail(result.data[0].user_email);
          setUsername(result.data[0].user_username);
          setCountry(result.data[0].user_country);
          setAdress(result.data[0].address);
          setPhone(result.data[0].user_phone);
          setImage(result.data[0].user_profile);
    }

    useEffect(()=>{
         getUserData();
    },[])

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

  
     return<>   
         <div style={{marginTop:"20px"}} className="container">
     <div className="main-body">
   
      
           
     
           <div className="row gutters-sm">
             <div className="col-md-4 mb-3">
               <div className="card">
                 <div className="card-body">
                   <div className="d-flex flex-column align-items-center text-center">
                     <img src={image} alt="Admin" className="rounded-circle" width="150"/>
                     <div className="mt-3">
                       <h4>{username}</h4>
                       <p className="text-secondary mb-1">Super Admin</p>
                       <p className="text-muted font-size-sm">{address}</p>
                      
                      <div>
                         <button onClick={()=>OpenModal()} className="btn btn-info">UPDATE PROFILE IMAGE</button>
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

     
           </div>
 
         </div>
     </div>
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
export default AdminProfile;