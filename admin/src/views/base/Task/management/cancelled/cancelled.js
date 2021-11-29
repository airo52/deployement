import { useEffect, useState } from "react";
import ApiRequest from "src/Api/Data/requestApi";
import TableCard from "src/views/table/TableCard";
import swal from "sweetalert";
import SingeleTask from "../../TaskDetails/SingleTaskDetails";
import ReasignUser from "../assigned/re-assign/reasign";

const CancelledTask = () =>{

  const [taskDetails,setTaskDetails] = useState(false);
  const [taskId,setTaskId]=useState('');
  const [CancelledOrders,setCancelledOrders]=useState([]);
  const [status,setStatus]=useState('');
  const [createDate,setCreatedDate] = useState('');
  const [enDate,setEndDate] = useState('');
  const [description,setDateDescription] = useState('');
  const [title,setTitle] = useState('');
  const [reaAsign,setAssign]=useState(false);
  const [bck,setBck] = useState(true);

  const CloseTask=()=>{
    setTaskDetails(false);
  }

  const Reasign=(taskId,taskName,statu,creatDate,endDat,description)=>{
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

const Buttons=(taskId,title,status,createDate,endDate,description)=>{
  return <>
       
       <div style={{display:"flex",flexDirection:"column"}}>
       <button onClick={()=>TaskDetails(taskId)}  className="btn btn-primary">Details</button>
    <button onClick={()=>Reasign(taskId,title,status,createDate,endDate,description)}  className="btn btn-warning fa fa-repeat"></button>

  
    </div>
       </>
}

  const getCancelledOrders=async()=>{
       const result = await ApiRequest.getCancelledOrders();
         const organisedData=[];
       result.data.forEach(element => {
            var dat={
              "#taskId":element.task_id,
              title:element.task_title,
              writerName:element.writer_display_name,
              email:element.writer_email,
              status:element.task_status,
              category:element.writer_category,
              
              ddate:element.task_deadline,
              Action:Buttons(element.task_id,element.task_title,element.task_status,element.task_created_date,element.task_deadline,element.task_description)
            }
            organisedData.push(dat);

       });

       setCancelledOrders(organisedData);

      // console.log(result.data);
  }

  useEffect(()=>{
     getCancelledOrders();
  },[]);

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
          "#taskId":"686787678",
          title:"iuytfrdfgh",
          writerName:"wilson",
          email:"wilson@gmail.com",
          status:"in-progress",
          category:"Lorem",
          Cdate:'2011-9-10',
          ddate:"2011-8-8",
          Action:<button onClick={()=>TaskDetails(1)} className="btn btn-primary">Details</button>

       }
      ]
    return <>
            {!taskDetails && !reaAsign && <TableCard 
             products={CancelledOrders}
             columns={columns}
              title={"CANCELLED TASK"}
             />}
             

{taskDetails && !reaAsign &&<SingeleTask id={taskId} closeTask={CloseTask} isAccept={false}/>}

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
             taskId={taskId}
             buttonName={"RE-ASSIGN"} setBack={setBck}/></>}
          </>
          
}

export default CancelledTask;