import React, { useEffect, useState } from "react";
import SingeleTask from "../../NewTask/taskDetails/singleTaskDetails";
import TableCard from "../../../table/TableCard";
import ApiRequest from "src/Api/Requests/Apirequest";


const OrdersBeingRedone =()=>{

    const [isSingleTaskOpen,setShowSingleTask] = useState(false);
    const [singleTaskId,setSingleTaskId] = useState();
    const [Revisions,setRevisions] = useState([]);
  
    const handleShowSingleTask=(id)=>{
      
          setSingleTaskId(id);
          setShowSingleTask(true);
    }
    
  
    const handleCloseTask=()=>{
       setSingleTaskId('');
       setShowSingleTask(false);
    }

    const getOrdersInRevision = async ()=>{
        const result = await ApiRequest.getOrdersInRevision();
       

        const organisedData =[];
        result.data.forEach(element => {
                 var dat ={
                     "#order": element.task_id,
                     "OrderName": element.task_name,
                     "Title": element.task_title,
                     "status": <span className="badge badge-danger">{element.task_status}</span>,
                     "Created": element.task_created_date,
                     "Deadline": element.task_deadline,
                     "Service": element.task_service,
                     "Pages": element.pages,
                     "Action": <button className="btn btn-info" onClick={()=>handleShowSingleTask(element.task_id)}>Details</button> 
                 } 
                 
                 organisedData.push(dat);
        });
setRevisions(organisedData);

    }

  
    useEffect(()=>{
        getOrdersInRevision();
    },[])
    
     
const  columns = [
    {
        dataField:'#order',
         text:  '#order',
    },
    {
        dataField:'OrderName',
         text:  'ordername',
    },
    {
        dataField:'Title',
         text:  'title',
    },
    {
        dataField:'status',
         text:  'status',
    },
    {
        dataField:'Created',
         text:  'created',
    },
    {
        dataField:'Deadline',
         text:  'deadline',
    },
   
    {
        dataField:'Pages',
         text:  'page',
    },
    
    {
        dataField:'Action',
         text:  'action',
    },
 
]
   
    return <React.Fragment>
            {!isSingleTaskOpen && <TableCard columns={columns} products={Revisions}/>}
            {isSingleTaskOpen && <SingeleTask isAccept={false} closeTask={handleCloseTask} id={singleTaskId}/>}
        </React.Fragment> 
}

export default OrdersBeingRedone;