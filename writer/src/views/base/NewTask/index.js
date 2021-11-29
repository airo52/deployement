import React, { useState } from "react";
import SingeleTask from "./taskDetails/singleTaskDetails";



const { default: NewTask } = require("./NewTask")

const AllAvailableTask = ()=>{
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

    
      return <React.Fragment>
             {!isSingleTaskOpen && <NewTask limit={100} showSingleTask={handleShowSingleTask}/>}
              {isSingleTaskOpen && <SingeleTask closeTask={handleCloseTask} id={singleTaskId}/>}
      </React.Fragment>
   
}

export default AllAvailableTask;