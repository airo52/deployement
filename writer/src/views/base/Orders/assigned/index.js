
import React, { useEffect, useState } from "react";
import SingeleTask from "../../NewTask/taskDetails/singleTaskDetails";
//import TableCard from "../../Table/tableCard";
import TableCard from '../../../table/TableCard';
import ApiRequest from "src/Api/Requests/Apirequest";
import swal from "sweetalert";

const AssignedOrders = ()=>{
    const [isSingleTaskOpen,setShowSingleTask] = useState(false);
    const [singleTaskId,setSingleTaskId] = useState();

    const [assignedTask,setAssignedTask] = useState([]);


    const HandleAssignedTask = async ()=>{
        const result = await ApiRequest.getAssignedTask();
          var organisedData = [];
         // console.log(result.data)
        result.data.forEach(element => {
             var dat ={
                    "#order": element.task_id,
                    "OrderName":element.task_name,
                    "Title": element.task_title,
                    "status": <span className="badge badge-danger">{element.task_status}</span>,
                    "created": element.task_created_date,
                    "deadline": element.task_deadline,
                    "Service": element.task_service,
                    "page": element.pages,
                    "Action": Buttons(element.task_id)
                 }

                 organisedData.push(dat);
             
        });

        setAssignedTask(organisedData);

       
    }
    
    useEffect(()=>{
      HandleAssignedTask();
    },[]);
  
    const handleShowSingleTask=(id)=>{
      
          setSingleTaskId(id);
          setShowSingleTask(true);
    }
    
  
    const handleCloseTask=()=>{
       setSingleTaskId('');
       setShowSingleTask(false);
    }

 const ViewItemDetails =(id)=>{
    handleShowSingleTask(id)
    //alert(id);
}
const Reject=async (id)=>{
    const result = await ApiRequest.RejectTask(id);
    if(result.data === "done"){
        swal('success','Task Rejected succesfully','success');
        HandleAssignedTask();
    }

}

const Accept = async (id)=>{
     const result = await ApiRequest.AcceptTask(id);

     if(result.data === "done"){
         swal('success','Task accepted succesfully','success');
         HandleAssignedTask();
     }
}

const RejectOrder = (id)=>{

    swal(`Are You Sure To Reject This Task!?`, {
        buttons: {
          cancel: "Dont Proceed!",
          delete: {
            text: "Reject Task",
            value: "reasign",
          },
         
        },
      })
      .then((value) => {
        switch (value) {
       
         
       
          case "reasign":
              Reject(id);
              // assignTask(user_id,task_id)
            //swal(`task`, "Re-assigned Successfully", "success");
            break;
       
          default:
            swal("Process Canceled Succesfully!");
        }
      });
    //alert(id);
}

const acceptTask = (id)=>{
    swal(`Are You Sure To Accept This Task!?`, {
        buttons: {
          cancel: "Dont Proceed!",
          delete: {
            text: "Accept Task",
            value: "reasign",
          },
         
        },
      })
      .then((value) => {
        switch (value) {
       
         
       
          case "reasign":
              Accept(id)
              // assignTask(user_id,task_id)
            //swal(`task`, "Re-assigned Successfully", "success");
            break;
       
          default:
            swal("Process Canceled Succesfully!");
        }
      });
}

const Buttons =(Ids)=>{
   // alert(id)
    return <React.Fragment>
         <button className="btn btn-danger" onClick={()=>RejectOrder(Ids)}>Reject</button>&nbsp;
         <button className="btn btn-info" onClick={()=>ViewItemDetails(Ids)}>Details</button>
    </React.Fragment>
}




 const columns = [
    
        {
            dataField: '#order',
           text: '#order',
        },
        {
            dataField: 'OrderName',
           text: 'ordername',
        },
        {
            dataField: 'Title',
           text: 'title',
        },
        {
            dataField: 'status',
           text: 'status',
        },
        {
            dataField: 'created',
           text: 'created',
        },
        {
            dataField: 'deadline',
           text: 'deadline',
        },
        {
            dataField: 'Service',
           text: 'service',
        },
        {
            dataField: 'page',
           text: 'page',
        },
        
        {
            dataField: 'Action',
           text: 'action',

        },
    
 ]


return <React.Fragment>
{!isSingleTaskOpen && <TableCard title={"assigned Orders"} columns={columns} products={assignedTask}/>}
{isSingleTaskOpen && <SingeleTask acceptTask={acceptTask} closeTask={handleCloseTask} id={singleTaskId}/>}
</React.Fragment> 
}
export default AssignedOrders;