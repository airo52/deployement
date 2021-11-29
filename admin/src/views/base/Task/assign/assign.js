import download from "downloadjs";
import { useEffect, useState } from "react";
//import { Alert } from "react-bootstrap";
import ApiRequest from "src/Api/Data/requestApi";
import TableCard from "src/views/table/TableCard";
import swal from "sweetalert";
import SingeleTask from "../TaskDetails/SingleTaskDetails";
import AsignUser from "./Asigne/Asign";

const AssignTask = ({socket})=>{
  const [taskDetails,setTaskDetails] = useState(false);
  const [taskId,setTaskId]=useState('');
  const [assign,setAssign] = useState(false);
  const [bck,setBck] = useState(true);
  const [unAssignedTask,setUnassignedTask] = useState([]);
  const [taskID,setTaskID]= useState('');
  
  const AssignTasks=TaskId=>{
      setTaskID(TaskId);
    setAssign(true);
      
  }
  const Button=(task_id)=>{
    return <>
    
    
             <button onClick={()=>TaskDetails(task_id)} style={{marginLeft:"2px"}} className="btn btn-primary">Details</button>
            <button onClick={()=>AssignTasks(task_id)}  style={{marginLeft:"2px"}} className="btn btn-info">Assign Task</button>
            <button  onClick={()=>DeleteTask(task_id)} style={{marginLeft:"2px"}}  className="btn btn-success fa fa-trash"></button>
              </>
     
  }

  const getUnAssignedTask = async ()=>{
       const result = await ApiRequest.getUnAssignedTask();
       const filteredData=[];
  
       result.data.forEach(element => {
       var dat =  {
           "#taskId":element.task_id,
            title:element.task_title,
            writerName:"",
            email:"",
            status:State(element.task_status),
            category:element.task_Descipline,
            sdate:element.task_created_date,
            ddate:element.task_deadline,
            Action:Button(element.task_id)
         }
 
         filteredData.push(dat);
       });
       
        
       setUnassignedTask(filteredData);
  }

  useEffect(()=>{
  
      getUnAssignedTask();
  },[])

const State=(state)=>{
    if(state === "new"){
      return <div className="badge badge-info">{state}</div>
    }
    if(state === "cancelled"){
      return <div className="badge badge-warning">{state}</div>
    }
}

  const Delete=async (id)=>{
       var data = await ApiRequest.deleteTask(id);
       
       if(data.data ==="done"){
        getUnAssignedTask();
        swal("Deleted","succefully","success");
        
       }else{
        swal("Failed",data.data,"error");
       }
  }

  const DeleteTask=TaskId=>{
     swal("Are you sure To Delete This Task","","warning",{
           buttons:{
             cancel:'Cancel !',
             procceed:{
                 text:"Delete !",
                 value:"delete"
             }
           }
     })
     .then((value)=>{
         switch (value) {
           case 'delete':

              Delete(TaskId);
               // swal("Deleted","succefully"+TaskId,"success");
             break;
         
           default:
             break;
         }
     })
  }

  const CloseTask=()=>{
    setTaskDetails(false);
  }

  const TaskDetails=(taskId)=>{
    setTaskId(taskId);
     setTaskDetails(true);
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
          
            dataField: "status",
            text: "status",
          
          
        },
        {
          
            dataField: "category",
            text: "Category",
          
          
        },
        {
          
          dataField: "sdate",
          text: "Submited-Date",
        
        
      },
      {
          
        dataField: "ddate",
        text: "Deadline",
      
      
      },
        {
            dataField: "Action",
            text: "Action",
         
          }
      ];
      const products=[
       { 
         "#taskId":"7888888",
            title:"Lorem ipsume",
            writerName:"John ",
            email:"airotony8@gmail.com",
            status:"Revision",
            category:"Lorem",
            sdate:"2018-9-10",
            ddate:"2019-10-10",
            Action:<>
             <button onClick={()=>TaskDetails(1)} style={{marginLeft:"2px"}} className="btn btn-primary">Details</button>
            <button onClick={()=>AssignTasks(1)}  style={{marginLeft:"2px"}} className="btn btn-info">Assign Task</button>
            <button  onClick={()=>DeleteTask(1)} style={{marginLeft:"2px"}}  className="btn btn-success fa fa-trash"></button>
              </>
       }
      ]
    return <>
         {!taskDetails && !assign &&<div className="container card"> <TableCard 
             products={unAssignedTask}
             columns={columns}
              title={"NEW TASK NOT ASSIGNED"}
             />
             </div>
         }
         {taskDetails && !assign && <SingeleTask id={taskId} closeTask={CloseTask} isAccept={false}/>}
         {assign && <AsignUser taskId={taskID} isBck={bck} setAssign={setAssign} setBack={setBck}/>}
          </>

          
}

export default AssignTask;