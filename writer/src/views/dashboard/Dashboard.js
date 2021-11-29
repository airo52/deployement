import React, { lazy, useEffect, useState } from 'react'
import ApiRequest from 'src/Api/Requests/Apirequest.js';

import NewTask from '../base/NewTask/NewTask.js'
import SingeleTask from '../base/NewTask/taskDetails/singleTaskDetails.js';
import AssignedOrders from '../base/Orders/assigned/index.js';




const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
//const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {

  
  const [isSingleTaskOpen,setShowSingleTask] = useState(false);
  const [singleTaskId,setSingleTaskId] = useState();

  const [dashboard,setDashBoard]= useState([]);
  const [set,setSet]=useState(false);

  const HandleDashBoard=async ()=>{
   var data= await ApiRequest.DashBoardData();
    console.log(data.data)
   setDashBoard([data.data]);
   setSet(true);
  }


  useEffect(()=>{
    
    HandleDashBoard();
  },[]);

  const handleShowSingleTask=(id)=>{
    
    
        setSingleTaskId(id);
        setShowSingleTask(true);
  }

  const handleCloseTask=()=>{
     setSingleTaskId('');
     setShowSingleTask(false);
  }
  return (
    <React.Fragment>
      {!isSingleTaskOpen && set &&  <WidgetsDropdown dashboard={dashboard}/>}
     
       {<AssignedOrders/>}
      {/*!isSingleTaskOpen && <NewTask showSingleTask={handleShowSingleTask}/>*/}
      {isSingleTaskOpen && <SingeleTask closeTask={handleCloseTask} id={singleTaskId}/>}
      

     
    </React.Fragment>
  )
}

export default Dashboard
