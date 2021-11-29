import React, { lazy, useEffect, useState } from 'react'
//import Tables from '../table/table.js'
//import TableCard from '../table/TableCard.js';
//import { Dropdown } from "react-bootstrap";
import MoreButton from './moreButton.js';
//import DashBoardData from 'src/Api/Data/requestApi.js';
import TaskInProgress from '../base/Task/management/in-progress/progress.js';
import ApiRequest from 'src/Api/Data/requestApi.js';


const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))

const columns = [
  {
    dataField: "#Order",
    text: "Order Id",
   
  },
  {
    dataField: "Title",
    text: "Title",
  
    sort: true
  },
  {
    dataField: "status",
    text: "Status",
 
  },
  {
    dataField: "created",
    text: "Created On",
  
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

const style={
  button:{
    width:"90%",
    border:"0px",
   outline:"none",
   
    height:"40px",
    borderRadius:"4px",
    marginTop:"2px",
    marginBottom:"2px",
    marginLeft:"6px"
    
  }
}





const Dashboard = ({socket}) => {

   const [dashboard,setDashBoard]= useState([]);
   const [set,setSet]=useState(false);

   const HandleDashBoard=async ()=>{
    var data= await ApiRequest.DashBoardData();
    
    setDashBoard([data.data]);
    setSet(true);
   }

   useEffect(()=>{
     
     HandleDashBoard();
   },[]);

  const AcceptTask=(id)=>{
    alert('accept'+id);
  }
  const TaskDetails=(id)=>{
    alert("Task Details"+id);
  }

  const writerDetails=(id)=>{
     alert('writer detail'+id);
  }

  const RejectRequest=(id)=>{
    alert('Reject request'+id);
  }

  const products = [
    {
      '#Order': "#7882992",
      price: 100,
      Title: 10,
      status: "japan",
      created:"2020-7-19",
      deadline:"2019-18-10",
      Action:<MoreButton 
          writer={writerDetails}
         accept={AcceptTask}
         Reject={RejectRequest}
         task={TaskDetails}
         taskid={8}
         writerId={5}
      />
  
    },
  
  ];
  
  return (
    <>
      {set && <WidgetsDropdown dashboard={dashboard}/>}
      <div className="container card">

      <TaskInProgress socket={socket}/>
     {/* <TableCard title={"Writers Task Request"} columns={columns} products={products}/>*/}
      </div>
    
    </>
  )
}


export default Dashboard
