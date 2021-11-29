import React, { useEffect, useState } from "react";

const AssignedTask = React.lazy(()=>import('./assigned/assigned'));
const CancelledTask = React.lazy(()=>import('./cancelled/cancelled'));
const CompletedTask = React.lazy(()=>import('./completed/completed'));
const TaskInProgress = React.lazy(()=>import('./in-progress/progress'));
const TaskBeingRedone = React.lazy(()=>import('./Redones/redones'));
const NewTaskSubmited = React.lazy(()=>import('./submited/submited'));

const TaskManagement = ({socket})=>{
      const [id,setId]= useState('');
      const SetId=(id)=>{
          setId(id);
      }

      useEffect(()=>{
         setId(1);
      },[])
    return <>
    <ul className="nav nav-tabs">
    <li className="nav-item">
      
      <a className={1== id?"nav-link active":"nav-link"} onClick={()=>SetId(1)}  href="javascript:void(0)">New Submited</a>
    
  </li>
  <li className="nav-item">
      
      <a className={2== id?"nav-link active":"nav-link"}
         onClick={()=>SetId(2)}
       href="javascript:void(0)">Assigned Orders</a>
    
  </li>
  <li className="nav-item">
 
  <a className={3== id?"nav-link active":"nav-link"}
    onClick={()=>SetId(3)}
  href="javascript:void(0)">Orders In Progress</a>
  </li>
  <li className="nav-item">
    <a className={4== id?"nav-link active":"nav-link"} 
    onClick={()=>SetId(4)}
    href="javascript:void(0)">Cancelled Orders</a>
  </li>
  <li className="nav-item">
    <a className={5== id?"nav-link active":"nav-link"}
     onClick={()=>SetId(5)}
    href="javascript:void(0)">Revisions</a>
  </li>
  <li className="nav-item">
    <a className={6== id?"nav-link active":"nav-link"} 
    onClick={()=>SetId(6)}
    href="javascript:void(0)">Completed Orders</a>
  </li>
 
</ul>
<div className="container">
    {id === 1 ?<NewTaskSubmited/>:""}
    {id === 2 ?<AssignedTask/>:""}
    {id === 3 ?<TaskInProgress socket={socket}/>:""}
    {id === 4 ?<CancelledTask/>:""}
    {id === 5 ?<TaskBeingRedone socket={socket}/>:""}
    {id === 6 ?<CompletedTask/>:""}
</div>


  </>
}

export default TaskManagement;