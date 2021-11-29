import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import ApiRequest from "src/Api/Data/requestApi";
import ChatBox from "src/views/ChatBox/ChatBox";
import ModalCard from "src/views/modal/Modal";
import TableCard from "src/views/table/TableCard";
import swal from "sweetalert";
import './_.css';
const Profile = ({category,existingCategories,back,id,DisableUser,BlockUserPermanet,username,checkeds,email,socket})=>{
    const [Details,setDetails]=useState([]);
    const [status,setStatus] = useState();
    const [save,setSave] = useState(true);
    const [open,setOpen]=useState(false);
    const [show, setShow] = useState(false);
    const [isShowLoader,setShowLoader] = useState(true);
    const [data,setData]=useState([]);
    const [categor,setCategory] = useState('');
   
    const [taskid,setTaskid] =useState('');


    const Open=(mail,taskid)=>{
      setTaskid(taskid);
    //  setEmail(mail);
       setOpen(!open);
    }

    const UpdateWriterCategory =async ()=>{
      if(categor === "0" || categor === ""){
        swal("ERROR","select category","error");
        return;
      }else{
          const result = await ApiRequest.updateCategory(categor,id);
          var data = result.data;
         if(data == true){
          swal('success',"Category updated","success");
         }
      }

    }

    const assignTask=async (user_id,task_id)=>{
      const result = await ApiRequest.asignTaskToUser(user_id,task_id);

      var response =result.data;
      if(response == true){
        swal("task assigned","succesfully","success");
      }else{
        swal("ERROR",response,"error");
      }
     //alert(task_id);
    }

    const Close=()=>{
      setShow(false)
    }
    const OpenModal=(id)=>{
      setShow(true);
      LoadUnassignedTask();
    }

    
const  Btns =(task_id)=>{
     return <button onClick={()=>assignTask(id,task_id)} className="btn btn-primary">assign task</button>;
}
    const AssignContent=()=>{
      const columns = [
        {
          dataField: "taskid",
          text: "#id",
         
        },
        {
          dataField: "status",
          text: "Task status",
        
          sort: true
        },
        {
          dataField: "start",
          text: "start date",
        
          sort: true
        },
        {
          dataField: "deadline",
          text: "Deadline",
        
          sort: true
        },
       
        {
            dataField: "Action",
            text: "Action",
         
          }
      ];

     
       return <TableCard
                 columns={columns}
                 products={data}
                 title={"Assign "+username+" Task"}
              />
    }
  


    const LoadUserData=async (id)=>{
      setSave(true);
         const result = await ApiRequest.getUserDetails(id);
       //  console.log(result);

         setDetails(result);
        // console.log(result)
         setSave(false);
    }

    const LoadUnassignedTask=async ()=>{
      const filteredData=[];
      const result = await ApiRequest.getUnAssignedTask();
      result.data.forEach(element => {
      var dat=  {
          taskid:element.task_id,
          status:element.task_status,
          start:element.task_created_date,
          deadline:element.task_deadline,
           Action:Btns(element.task_id)
        }

        filteredData.push(dat);
      });
      setShowLoader(false);
      setData(filteredData)

    }

    useEffect(()=>{
        LoadUserData(id);
    },[]);


  
    return <>
    
      {!save && <div className="container">
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
                    <img src={Details['result'][0].writer_profile} alt="Admin" className="rounded-circle" width="150"/>
                    <div className="mt-3">
                      <h4>{Details['result'][0].writer_name}</h4>
                      <p className="text-secondary mb-1">{Details['result'][0].address}</p>
                      <p className="text-muted font-size-sm">{Details['result'][0].country}</p>
                     
                      <button  onClick={()=>checkeds==true?BlockUserPermanet(id,username):DisableUser(id,username)} className={checkeds?"fa fa-unlock btn btn-info":"fa fa-lock btn btn-warning"}></button> 
           
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3">
                <ul className="list-group list-group-flush">
                 
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                        SET CATEGORY
                        </h6>
                    <span className="text-secondary">
                        CATEGORY
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <div style={{width:"100%"}}>
                      <select onChange={(e)=>setCategory(e.target.value)}  className="form-control">
         <option value="0" selected>..select category..</option>
         {category.map((item)=>{
           return <option>{item.category_name}</option>
         })}
        </select>
                      </div>
                    
                   
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                        <button onClick={()=>UpdateWriterCategory()} style={{border:"1px solid blue",outline:"none"}} className="btn">UPDATE WRITER CATEGORY</button>
                    </h6>
                    
                  </li>
                </ul>
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
                       // console.log(item);
                        return  <div className="card">
                        <span style={{marginLeft:"5px"}}>name</span>
                        <div>
                          <button style={{outline:"none",border:"0px",marginRight:"10px",marginBottom:"5px",marginLeft:"5px"}} className="badge badge-info">{item.task_title}</button>
                          <button style={{outline:"none",border:"0px",marginRight:"10px",marginBottom:"5px"}} onClick={()=>Open(Details['result'][0].writer_email,item.task_id)} className="badge badge-info">Chat</button>
                       
                        </div>
                        

                    </div>
                      })}
                     

                         <button style={{width:"100%"}}  onClick={()=>OpenModal(id)} className="btn btn-info">Assign New Task</button>
                    
                        
                      </div>
                    
                   
                  </li>
                 
                </ul>
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

    { save && <div className="spinner">
    
  
    <Loader
  type="Circles"
  color="#00BFFF"
  height={100}
  width={100}
  //3 secs
  />
  </div>} 

  {open && <ChatBox
    open={open}
    SetOpen={Open}
    email={email}
    socket={socket}
    taskid={taskid}
   />}

<ModalCard
       Show={show}
       Close={Close}
       isShowLoader={isShowLoader}
       ButtonName={username}
       content={<AssignContent/>}
      
     /> 
          </>
}

export default Profile;