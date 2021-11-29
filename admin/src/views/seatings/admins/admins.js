import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ModalCard from "src/views/modal/Modal";
import TableCard from "src/views/table/TableCard";
import CreateAdmin from "./CreateAdmins";
import RegisteredAdminProfile from "./registeredAdmins/registeredAdminsProfile";

import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import ApiRequest from "src/Api/Data/requestApi";
import FormValidation from "src/views/base/Users/writers/formValidate";




const Administrators=()=>{
    const [edit,setEdit] = useState(false);

    const notify = (data) => toast(data);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [ConfirmPassword,setConfirmPassword] = useState('');
    const [country,setCountry] = useState('');
    const [address,setAdress] = useState('');
    const [phone,setPhone] = useState('');
    const [category,setCategory] = useState([]);
    const [username,setUsername] = useState('');
    const [userId,setUserId]=useState('');

    const handleClose = () => {setShow(false);setEdit(false)};
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [isShowLoader,setShowLoader] = useState(false);
    const [Administrators,setAdministrators]= useState([]);



    const CreateNewAdmin = async ()=>{
      
      setShowLoader(true);
      
          const test = FormValidation.RegisterForm(email,username,password,ConfirmPassword,country,address,phone,category);
          if(test == true){
               const result = await ApiRequest.RegisterAdmins(email,username,password,ConfirmPassword,country,address,phone,'super');
                if(result.data == true){
                  notify('Admin added Succesfully');
                  setShowLoader(false);
                 LoadAdministrators()
           setEmail('');
           setPassword('');
           setAdress('');
           setPassword('');
           setConfirmPassword('');
           setCountry('');
           setPhone('');
           setUsername('');
                }else{
                     notify(result.data);
                     setShowLoader(false);
                    /* setEmail('');
                      setPassword('');
                      setAdress('');
                      setPassword('');
                        setConfirmPassword('');
                      setCountry('');
                   setPhone('');
                   setUsername('');
                   */
                }

          }else{

     notify(test);
     setTimeout(() => {
           setShowLoader(false);
        /*  setEmail('');
           setPassword('');
           setAdress('');
           setPassword('');
           setConfirmPassword('');
           setCountry('');
           setPhone('');
           setUsername('');
           */
     }, 2000);
    }
  }

    const Save = ()=>{
        setShowLoader(true);
    }

    const state = (state)=>{
      return state == 1?<span className="badge badge-success">Active</span>:<span className="badge badge-warning">Deactivated</span>;
    }

    const LoadAdministrators = async ()=>{
              const result = await ApiRequest.getAllAdministrators();
                 var organisedData =[];
              result.data.forEach(element => {
                   var bat={
                    
                      "#Id":element.user_id,
                       image:ProfileImage(element.user_profile),
                       writerName:element.user_username,
                       email:element.user_email,
                       status:state(element.user_status),
                       level:element.user_type,
                       Action:Buttons(element.user_id,element.user_username,Checks(element.user_status))
                    
                   }

                   organisedData.push(bat);
              });

              setAdministrators(organisedData);

            //  console.log(result.data);
    }

    const Category=()=>{
        return <>
              <select className="form-control">
                  <option value="O" selected>chose</option>
                  <option>Super Admin</option>
                  <option>Manager</option>
              </select>
            </>
    }

    const ProfileImage=image=>{
    
      return <img 
              style={{
                width:"50px",
                height:"50px",
                borderRadius:'25px'
              }}
          src={image} alt="profile"/>
    }

    useEffect(()=>{
      LoadAdministrators();
    },[])
   

  const EditUser=(id)=>{
       setUserId(id);
      setEdit(true)
  }
  const Back=()=>{
    setUserId('')
    setEdit(false);
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
            LoadAdministrators();
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
        LoadAdministrators();
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
           <button style={{color:"blue"}} onClick={()=>EditUser(id)} className="fa fa-edit btn"></button> 
         
           <button  onClick={()=>checkeds==true?BlockUserPermanet(id,username):DisableUser(id,username)} className={checkeds?"fa fa-unlock btn btn-info":"fa fa-lock btn btn-warning"}></button> 
           
       </>
         }
    

    const columns = [
        {
          dataField: "#Id",
          text: "Id",
         
        },
        {
          dataField: "image",
          text: "Profile",
        
          sort: true
        },
        {
          dataField: "writerName",
          text: "Username",
       
        },
        {
          dataField: "email",
          text: "email",
        
        },
        {
          
            dataField: "status",
            text: "status",
          
          
        },
        {
          
            dataField: "level",
            text: "Administartor Type",
          
          
        },
        {
            dataField: "Action",
            text: "Action",
         
          }
      ];
      const products=[
         {
           "#Id":"33444",
            image:ProfileImage('https://media.istockphoto.com/photos/senior-man-remembering-picture-id1166588777?b=1&k=20&m=1166588777&s=170667a&w=0&h=lNpNLSTkPOAvvo4TwEbUQa_p0IjFUQ6K5bjodzSzJok='),
            writerName:"Airo",
            email:"airotony8@",
            status:"status",
            level:"level",
            Action:Buttons(5,"airo")
         }
      ]
 return <>  {!edit && <> <div style={{height:"60px",display:"flex",flexDirection:"row",justifyContent:"space-between"}} className="card">
    <h4 style={{marginTop:"10px",marginLeft:"20px"}}><i>CREATE NEW ADMINISTRATOR</i></h4>
     <button onClick={()=>handleShow()} style={{width:"40px",height:"40px",marginRight:"10px",marginTop:"7px"}} className="btn btn-primary fa fa-plus"></button>
</div>
<div className="container card">
<TableCard products={Administrators} columns={columns} title={"Admin-Strators"}/>
</div>


 <ModalCard 
  content={<CreateAdmin
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
     category={<Category/>}
     setCategory={setCategory}
     username={username}
     setUsername={setUsername}/>}

     ButtonName={"CREATE NEW ADMIN"}
     Save={CreateNewAdmin}
     isShowLoader={isShowLoader}
 Show={show} Close={handleClose}/>
</>}

{edit && <RegisteredAdminProfile id={userId} back={Back}/>}

<ToastContainer />
</>
}

export default Administrators;