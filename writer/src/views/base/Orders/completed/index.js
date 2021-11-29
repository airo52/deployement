import React, { useEffect, useState } from "react";
import SingeleTask from "../../NewTask/taskDetails/singleTaskDetails";
//import TableCard from "../../Table/tableCard";
import TablCard from '../../../table/TableCard';
import ApiRequest from "src/Api/Requests/Apirequest";

const CompletedOrders = ()=>{

    const [isSingleTaskOpen,setShowSingleTask] = useState(false);
    const [singleTaskId,setSingleTaskId] = useState();
    const [completed,setCompleted] = useState([]);

    const getCompletedTask =async ()=>{
             const result = await ApiRequest.getCompletedTask();
               var organisedData =[];
            result.data.forEach(element => {
                  var dat= {
                  "#order": '#'+element.task_id,
                  "OrderName": element.task_name,
                  "Title": element.task_title,
                  "status": <span className="badge badge-danger">{element.task_status}</span>,
                  "Createdon":element.task_created_date,
                  "Deadline":element.task_deadline,
                  "Service":element.task_service,
                  "Pages":element.pages,
                  "Action": <button className="btn btn-info" onClick={()=>ViewItemDetails(element.task_id)}>Details</button>
            }

            organisedData.push(dat);
            });

            setCompleted(organisedData)
    }
  
    const handleShowSingleTask=(id)=>{
      
          setSingleTaskId(id);
          setShowSingleTask(true);
    }
    
    useEffect(()=>{
           getCompletedTask();
    },[]);
  
    const handleCloseTask=()=>{
       setSingleTaskId('');
       setShowSingleTask(false);
    }

    const ViewItemDetails =(id)=>{
       // alert(id);
       handleShowSingleTask(id);
    }

    

  
     const columns= [
                {
                    dataField: '#order',
                    text:'#order',
                },
                {
                    dataField: 'OrderName',
                    text:'ordername',
                },
                {
                    dataField: 'Title',
                    text:'title',
                },
                {
                    dataField: 'status',
                    text:'status',
                },
                {
                    dataField: 'Createdon',
                    text:'created',
                },
                {
                    dataField: 'Deadline',
                    text:'deadline',
                },
                {
                    dataField: 'Service',
                    text:'service',
                },
                {
                    dataField: 'Pages',
                    text:'page',
                },
                
                {
                    dataField: 'Action',
                    text:'action',
                },

               
             
            ]
       
       
   

     const data=[
         {
            "#order": "committee-c15dw",
            "ordername": "editor-ktsjo",
            "title": 3,
            "status": <span className="badge badge-danger">cancelled</span>,
            "created": '2021-07-7',
            "deadline": '2021-07-7',
            "service": "paraprhrasing",
            "page": "5",
            "action": <button className="btn btn-info" onClick={()=>ViewItemDetails(5)}>Details</button>
         }
     ]
    return <React.Fragment>

    {!isSingleTaskOpen && <TablCard title={"COMPLETED ORDERS"} columns={columns} products={completed}/>}
    {isSingleTaskOpen && <SingeleTask isAccept={false} closeTask={handleCloseTask} id={singleTaskId}/>}
</React.Fragment> 
}

export default CompletedOrders;