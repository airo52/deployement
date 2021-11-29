import React, { useState } from "react";
import Invoice from "../../Invoice/invoice";
import SingeleTask from "../../NewTask/taskDetails/singleTaskDetails";

const NextPeriodPayment=()=>{
  const [isSingleTaskOpen,setShowSingleTask] = useState(false);
  const [singleTaskId,setSingleTaskId] = useState();

  const handleShowSingleTask=(id)=>{
    
        setSingleTaskId(id);
        setShowSingleTask(true);
  }
  

  const handleCloseTask=()=>{
     setSingleTaskId('');
     setShowSingleTask(false);
  }
    return<> 
    <div style={{height:"60px"}} className="card">
        <h4 style={{marginLeft:"10px",marginTop:"10px",marginBottom:"2px"}}>
           <center> Payment Of this Order is Expected To Done By (January 18,2021)</center>
        </h4>
    </div>
  <div className="container-fluid jumbotron card bg-white text-dark">
       <div>
       <React.Fragment> 
         
              {!isSingleTaskOpen && <Invoice showSingleTask={handleShowSingleTask}/>}
              {isSingleTaskOpen &&<SingeleTask isAccept={false} closeTask={handleCloseTask} id={singleTaskId}/>}
          </React.Fragment>
       </div>
     
  </div>
  </>
}

export default NextPeriodPayment;