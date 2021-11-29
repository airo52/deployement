import { useEffect, useState } from "react";
import ApiRequest from "src/Api/Data/requestApi";
import TableCard from "src/views/table/TableCard";
import SingeleTask from "../../TaskDetails/SingleTaskDetails";

const Completed =()=>{
  const [taskDetails,setTaskDetails] = useState(false);
  const [taskId,setTaskId]=useState('');
  const [Completed,setCompleted] = useState([]);

  const CloseTask=()=>{
    setTaskDetails(false);
  }

  const getCompletedOrders = async ()=>{
    const result = await ApiRequest.getCompletedOrders();
    var sortedItems = [];
         result.data.forEach(element => {
               var dat={
                "#taskId":element.task_id,
                title:element.task_title,
                writerName:element.writer_display_name,
                email:element.writer_email,
                status:<span className="badge badge-success">{element.task_status}</span>,
               
                sdate:element.taskl_accepted_date,
                ddate:element.task_deadline,
                Action:<button onClick={()=>TaskDetails(element.task_id)}  className="btn btn-info">Details</button>
               }

               sortedItems.push(dat);
         });

         setCompleted(sortedItems);
  }

  useEffect(()=>{
        getCompletedOrders();
  },[])
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
          "#taskId":"686787678",
          title:"iuytfrdfgh",
          writerName:"wilson",
          email:"wilson@gmail.com",
          status:"in-progress",
          category:"Lorem",
          sdate:'2011-9-10',
          ddate:"2011-8-8",
          Action:<button onClick={()=>TaskDetails(2)}  className="btn btn-info">Details</button>
        }
      ]
    return <>
            {!taskDetails && <TableCard 
             products={Completed}
             columns={columns}
              title={"COMPLETED ORDERS"}
             />
            }

{taskDetails &&<SingeleTask id={taskId} closeTask={CloseTask} isAccept={false}/>}
          </>
          
}

export default Completed;