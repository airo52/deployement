import { useEffect, useState } from "react";
import CategoryEdit from "src/views/base/Users/writers/editCategory";
import Profile from "src/views/base/Users/writers/profile/profile";
import TableCard from "src/views/table/TableCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import ApiRequest from "src/Api/Data/requestApi";

const ReasignUser = ({setBack,buttonName,title,status,createDate,endDate,description,taskId})=>{
  
       const [edit,setEdit] = useState(false);
       const [category,setCategory] = useState([]);
       const [userId,setUserId]=useState('');
       const [username,setUsername]=useState('');
       const [writer,setWriter] = useState([]);
       const [state,setState] = useState();

       const notify = (data) => toast(data);

       const [initialSelected,setInititialSelected] = useState([
        { label: "Short Stories.",value:"short"},
        { label: "Technically",value:"technical"},
        { label: "Novellas",value:"novels"},
        { label: "Scripts and Screenplays",value:"scripts"},
        { label: "True Crime. ...",value:"true"},
        { label: " Auto/Biography.",value:"auto"},
       ]);
       const options = [
        { label: "Short Stories.",value:"short"},
        { label: "Technically",value:"technical"},
        { label: "Novellas",value:"novels"},
        { label: "Scripts and Screenplays",value:"scripts"},
        { label: "True Crime. ...",value:"true"},
        { label: " Auto/Biography.",value:"auto"},
      
        ];

        useEffect(()=>{
        setBack(true);
        LoadWriters();
        },[])
        const ReAsignTask=(user_id,task_id)=>{
            swal(`Are You Sure ${buttonName} This Task!?`, {
                buttons: {
                  cancel: "Dont Proceed!",
                  delete: {
                    text: buttonName,
                    value: "reasign",
                  },
                 
                },
              })
              .then((value) => {
                switch (value) {
               
                 
               
                  case "reasign":
                       assignTask(user_id,task_id)
                    //swal(`task`, "Re-assigned Successfully", "success");
                    break;
               
                  default:
                    swal("Process Canceled Succesfully!");
                }
              });
        }


    const assignTask=async (user_id,task_id)=>{
      const result = await ApiRequest.asignTaskToUser(user_id,task_id);

      var response =result.data;
      if(response == true){
        swal(title, "Re-assigned Successfully", "success");
      }else{
        swal("ERROR",response,"error");
      }
     //alert(task_id);
    }
    
      
        const EditUser=(id,username,status)=>{

          setState(status);
            setUsername(username);
            setUserId(id);
            setEdit(true)
            setBack(false);
            
       }

        const Back=()=>{
            setUserId('')
            setEdit(false);
            setBack(true);
          }
      
    const ViewUser=(id)=>{

    }

    const SingleTask=(id)=>{

    }
    const statusMode=(status)=>{
      if(status === "new"){
       return <span className="badge badge-info">{status}</span>
      }
      if(status === "cancelled"){
       return <span className="badge badge-warning">{status}</span>
      }
    if(status === "completed"){
      return <span className="badge badge-success">{status}</span>
    }
    if(status === "in-progress"){
      return <span className="badge badge-primary">{status}</span>
    }
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
            const result = await ApiRequest.BlockUser(id);
            if(result.data == true){
          swal(`${username}`, "Deleted Succesfully", "success");
          LoadWriters();
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
      const result = await ApiRequest.unblockUser(id);
      
     if(result.data == true){
      swal(`${username}`, "unblocked Succesfully", "success");
      LoadWriters();
     }
      break;
 
    default:
      swal("Process Canceled Succesfully!");
  }
});
}

const Buttons =(id,username,status)=>{
  return <>
  <button onClick={()=>ReAsignTask(id,taskId)} style={{marginRight:"3px"}} className="btn btn-success fa fa-check"></button>
  <button onClick={()=>EditUser(id,username,status)} className="btn btn-primary fa fa-user"></button>
</>
}

const LoadWriters = async ()=>{
  const result = await ApiRequest.getWriters();
  const sortedItems=[];
  // console.log(result);
  if(result.data !=="empty" && result.data != false){
  result.data.map((item)=>{
   // =${`badge badge-primary`}
       var data={
       
        username:item.writer_name,
        email:item.writer_email,
        
        action:Buttons(item.witer_id,item.writer_name,checkes(item.writer_account_status))
       }

       sortedItems.push(data);
  })
}


setWriter(sortedItems);
}
const checkes=(status)=>{
return status == "0"?false:true;
}
    const columns=[
        {
            dataField: "username",
            text: "username",
           
          },
          {
            dataField: "email",
            text: "email",
           
          },
          {
            dataField: "action",
            text: "Action",
           
          },
    ]
    const products=[
        {
            username: "Wilson",
            email: "wilson@gmail.com",
            action:<>
                     <button onClick={()=>ReAsignTask(1)} style={{marginRight:"3px"}} className="btn btn-success fa fa-check"></button>
                     <button onClick={()=>EditUser(4,"wilson")} className="btn btn-primary fa fa-user"></button>
                   </>
           
          },
    ]
    return  <> {!edit && 
        
     <div className="container">
    <div className="main-body">
 
        
          
    
          <div className="row gutters-sm">
         
            <div style={{marginTop:"20px"}} className="col-md-12">
            
              <div className="row gutters-sm">
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Orders </i>Details</h6>
                      <div className="form-group">
                           <label for="inputAddress2">Order Dtails</label>
                           <div class="container">

                            <div class="row">
                                <div class="col">
                                     Order Title
                                </div>
                              <div  class="col badge badge-info">
                                  {title}
                               </div>
                                 </div>
                            <div class="row">
                            <div class="col">
                                status
                              </div>
                             <div class="col ">
                               {statusMode(status)}
                             
                           </div>

                         </div>

                         <div class="row">
                           <div class="col">
                                creted on
                              </div>
                             <div class="col badge">
                               {createDate}
                             
                           </div>
                           </div>
                           <div class="row">
                            <div class="col">
                                end Date
                              </div>
                             <div class="col">
                               {endDate}
                             
                           </div>
                           </div>


                         <br/>
                         <div class="row">
                            <div class="col card">
                                <label>Description</label>
                                <div className="col-md-11" dangerouslySetInnerHTML={{ __html:description }} >
                           
                           </div>
                              </div>
                             
                         </div>

                         
                       </div>
                        
                         </div>
                     
                    </div>
                  </div>
                </div>
                
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body" style={{overflowY:"auto"}}>
                      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">System</i>Billing Sequence</h6>
                     
                     <TableCard title={"AVAILABLE USERS"} products={writer} columns={columns}/>
                    
                    </div>
                    
                  </div>
                </div>
             
               
              </div>



            </div>
          </div>

        </div>
    </div>}

    {edit && <Profile
       category={[]}
       existingCategories={initialSelected}
       back={Back}
       DisableUser={DisableUser}
       id={userId}
       BlockUserPermanet={BlockUserPermanet}
       username={username}
       checkeds={state}
    /> }
    <ToastContainer/>
    </>
}

export default ReasignUser;