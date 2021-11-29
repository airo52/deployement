import { useEffect, useState } from "react";
import ApiRequest from "src/Api/Data/requestApi";
import ChatBox from "src/views/ChatBox/ChatBox";
import TableCard from "src/views/table/TableCard";
import swal from "sweetalert";
import SingeleTask from "../../TaskDetails/SingleTaskDetails";

const TaskInProgress=({socket})=>{
      
  const [open,setOpen]=useState(false);
  const [taskDetails,setTaskDetails] = useState(false);
  const [taskId,setTaskId]=useState('');
  const [Items,setItems]= useState([]);
  const [checkSEnt,setSent] = useState(false);
  const [email,setEmail] = useState('');
  const [taskid,setTaskid] =useState('');

const GetTableData=async ()=>{
  if(!checkSEnt){
      const result = await ApiRequest.getOrdersInProgress();
     // console.log(result);
       
      var sortedItems = [];
    result.data.forEach(element => {
          var data ={
            "#taskId":element.task_id,
            title:element.task_title,
            writerName:element.writer_display_name,
            email:element.writer_email,
            status:element.task_status,
            category:element.writer_category,
            Adate:element.taskl_accepted_date,
            ddate:element.task_deadline,
            Action:Buttons(element.writer_email,element.task_id)
          }
          sortedItems.push(data);

    });
    setSent(true);
    setItems(sortedItems);
  }
  
}


  useEffect(()=>{
//console.log(socket);
   // socket.emit('joins',{name:"bb",room:"bbb"}, () =>{
    //});
      GetTableData();
  },[]);

  const Open=(mail,taskid)=>{
    setEmail(mail);
    setTaskid(taskid);

     setOpen(!open);
  }
  const CloseTask=()=>{
    setTaskDetails(false);
  }

  const TaskDetails=(taskId)=>{
    setTaskId(taskId);
     setTaskDetails(true);
  }

  const Cancel =async (taskId)=>{
    const result = await ApiRequest.CancellOrder(taskId);
     //console.log(result.data)
    if(result.data == "done"){
      GetTableData();
      swal("Order Cancelled","succesfully","success");
    }else{
      swal("Error","Cancelletion Failed","error");
    }

  }

  const CancelOrder=(orderId)=>{
    swal("YOU ARE ABOUT TO CANCEL ONGOING ORDER",{
       buttons:{
         cancel:"NO",
         yes:{
           text:"YES",
           value:"yes"
         }
       }
    })
    .then((value)=>{
          switch (value) {
            case 'yes':
                Cancel(orderId);
                ///  swal("Order Cancelled","succesfully","success");
              break;
          
            default:

              break;
          }
    })
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
          
          dataField: "Adate",
          text: "Accepted-Date",
        
        
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

      const Buttons = (mail,taskid)=>{
             return <>
                   <button onClick={()=>Open(mail,taskid)} style={{marginRight:"3px"}} className="btn btn-primary fa fa-comment"></button>
                   <button onClick={()=>CancelOrder(taskid)}  style={{marginRight:"3px"}} className="btn btn-warning">Cancel</button>
                   <button onClick={()=>TaskDetails(taskid)} className="btn btn-info">Details</button>
                   </>
      }
     
    return <>
            {!taskDetails && <> <TableCard 
             products={Items}
             columns={columns}
              title={"ORDERS-IN-PROGRESS"}
             />
             {open && <ChatBox
    open={open}
    SetOpen={Open}
    email={email}
    socket={socket}
    taskid={taskid}
   />}
             </>
             }
             {taskDetails &&<SingeleTask id={taskId} closeTask={CloseTask} isAccept={false}/>}
          </>
          
}

export default TaskInProgress;