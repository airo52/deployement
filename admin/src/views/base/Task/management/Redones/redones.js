import { useEffect, useState } from "react";
import ApiRequest from "src/Api/Data/requestApi";
import ChatBox from "src/views/ChatBox/ChatBox";
import TableCard from "src/views/table/TableCard";
import SingeleTask from "../../TaskDetails/SingleTaskDetails";

const TaskBeingRedone = ({socket})=>{
  const [open,setOpen]=useState(false);
  const [taskDetails,setTaskDetails] = useState(false);
  const [taskId,setTaskId]=useState('');
  const [Redone,setRedone]=useState([]);
  const [show,setShow] = useState(false);
  const [email,setEmail] = useState('');
  const [taskid,setTaskid] =useState('');

  const Open=(mail,taskid)=>{
    setEmail(mail);
    setTaskid(taskid);
    setOpen(!open);
 }

 const CloseTask=()=>{
  setTaskDetails(false);
}

const getOrdersBeingRevised = async ()=>{
  const result = await ApiRequest.getOrdersBeingRevised();
   const organisedData=[];
   result.data.forEach(element => {
         var dat={
          "#taskId":element.task_id,
          title:element.task_title,
          writerName:element.writer_display_name,
          email:element.writer_email,
          status:element.task_status,
          category:element.writer_category,
          sdate:element.taskl_accepted_date,
          ddate:element.task_deadline,
          Action:<>
          <button onClick={()=>TaskDetails(element.task_id)} className="btn btn-info">Task Details</button>
           <button onClick={()=>Open(element.writer_email,element.task_id)} style={{marginLeft:"2px"}}  className="btn btn-success fa fa-comment"></button>
            </>
         }
        setShow(true);
         organisedData.push(dat);
   });

setRedone(organisedData);
 // console.log(result.data);
}

useEffect(()=>{
   getOrdersBeingRevised();
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
            "#taskId":"7888888",
            title:"Lorem ipsume",
            writerName:"John ",
            email:"airotony8@gmail.com",
            status:"Revision",
            category:"Lorem",
            sdate:"2018-9-10",
            ddate:"2019-10-10",
            Action:<><button onClick={()=>TaskDetails(2)} className="btn btn-info">Task Details</button>
                      <button onClick={()=>Open()} style={{marginLeft:"2px"}}  className="btn btn-success fa fa-comment"></button>
              </>

          }
      ]
    return <>
            {!taskDetails && show && <> <TableCard 
             products={Redone}
             columns={columns}
              title={"TASK BEING REVISED"}
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

export default TaskBeingRedone;