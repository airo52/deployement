//import { cilMediaStepBackward } from "@coreui/icons";
//import { cilMediaStepBackward } from "@coreui/icons";
import { useEffect, useState } from "react";
import TableCard from "src/views/table/TableCard";
import swal from "sweetalert";
import ReasignUser from "./re-assign/reasign";
import SingleTask from '../../TaskDetails/SingleTaskDetails';
import ApiRequest from "src/Api/Data/requestApi";


const AssignedTask = ()=>{
  
  const [reaAsign,setAssign]=useState(false);
  const [bck,setBck] = useState(true);
  const [taskDetails,setTaskDetails] = useState(false);
  const [taskId,setTaskId]=useState('');
  const [status,setStatus]=useState('');
  const [createDate,setCreatedDate] = useState('');
  const [enDate,setEndDate] = useState('');
  const [description,setDateDescription] = useState('');
  const [title,setTitle] = useState('');
  const [assignedTask,setAssignedTask] = useState([]);

  const getAssignedTask=async ()=>{
    const result = await ApiRequest.getAssignedTask();
      const organisedData=[];
      result.data.forEach(element => {
          var data={
            "#taskId":element.task_id,
          title:element.task_title,
          writerName:element.writer_display_name,
          email:element.writer_email,
          status:TaskStatus(element.task_status),
          category:element.task_Descipline,
          date:element.task_created_date,
          
          deadline:element.task_deadline,
          Action:Buttons(element.task_id,element.task_title,element.task_status,element.task_created_date,element.task_deadline,element.task_description)
          }

          organisedData.push(data);
      });

    setAssignedTask(organisedData);
    //console.log(result.data);
  }

  const TaskStatus =(state)=>{
      if(state ==="Rejected"){
           return <span className="badge badge-danger">{state}</span>
      }
      else return <span className="badge badge-info">{state}</span>
  }


  useEffect(()=>{
    getAssignedTask();
      setBck(true);
  },[])
  
  const Reasign=(taskId,taskName,statu,creatDate,endDat,description)=>{
    //alert(taskId)
       setStatus(statu);
       setCreatedDate(creatDate);
       setEndDate(endDat);
       setDateDescription(description);
       setTaskId(taskId);
       setTitle(taskName);

     swal(`Are you sure to reasign`,`${taskName}`,"warning",{
       buttons:{
         cancel:"cancel !",
         proceed:{
           text:"PROCEED",
           value:"proceed"
         }
       }
     })
     .then((value)=>{
         switch (value) {
           case 'proceed':
              setAssign(true);
              setBck(false)
             break;
         
           default:
             break;
         }
     })
  }
  const back=()=>{
    setAssign(false);
  }

  const CloseTask=()=>{
    setTaskDetails(false);
  }
  const TaskDetails=(taskId)=>{
    setTaskId(taskId);
     setTaskDetails(true);
  }

  const Buttons=(taskId,title,status,createDate,endDate,description)=>{
        return <>
             
             <div style={{display:"flex",flexDirection:"column"}}>
          <button onClick={()=>Reasign(taskId,title,status,createDate,endDate,description)} style={{marginBottom:"4px",width:'40px'}} className="btn btn-warning fa fa-repeat"></button>
          <button onClick={()=>TaskDetails(taskId)} style={{marginBottom:"4px",width:'40px'}} className="btn btn-info">Task</button>
        
          </div>
             </>
  }

  const WriterDeatails=(writerId)=>{

  }
    const columns = [
        {
          dataField: "#taskId",
          text: "#taskId",
         
        },
        {
          dataField: "title",
          text: "Title",
        
          sort: true
        },
        {
          dataField: "writerName",
          text: "Writer Username",
       
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
          
            dataField: "category",
            text: "Category",
          
          
        },
        {
          
            dataField: "date",
            text: "Assigned Date",
          
          
        },
      
        {
          
            dataField: "deadline",
            text: "Deadline",
          
          
        },
        {
            dataField: "Action",
            text: "Action",
         
          }
      ];
   
    return <>
            {!reaAsign && !taskDetails &&  <TableCard 
             products={assignedTask}
             columns={columns}
              title={"ASSIGNED TASK"}
             />}

             {reaAsign && !taskDetails && <> <br/>
             {bck && <><div style={{height:"60px",display:"flex",flexDirection:"row",justifyContent:"space-between"}} className="card">
            <h4 style={{marginTop:"10px",marginLeft:"20px"}}><i>Go Back</i></h4>
             <button  onClick={()=>back()}  style={{width:"40px",height:"40px",marginRight:"10px",marginTop:"7px",borderRadius:"20px"}} className="btn btn-primary fa fa-history"></button>
               </div></>}
             <ReasignUser
              title={title}
             status={status}
             createDate={createDate}
             endDate={enDate}
             description={description}
             buttonName={"RE-ASSIGN"} 
             taskId={taskId}
             setBack={setBck}/></>}

             {!reaAsign && taskDetails &&<SingleTask id={taskId} closeTask={CloseTask} isAccept={false}/>}
          </>
          
}

export default AssignedTask;