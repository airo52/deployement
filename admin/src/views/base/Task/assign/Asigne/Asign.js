import { useEffect, useState } from "react";
import ApiRequest from "src/Api/Data/requestApi";
import ReasignUser from "../../management/assigned/re-assign/reasign";

const AsignUser=({setBack,setAssign,isBck,taskId})=>{
  const [details,setDetails] = useState([]);
    const [view,setView] = useState(false);

    const getDetails=async()=>{
      const result = await ApiRequest.getSingleTaskFullDetails(taskId);

      setDetails(result.data.result[0]);
      //console.log(result.data.result[0]); 
      //console.log(details)
      setView(true);
     // await ApiRequest.fileDownload("http://localhost:4000/files/Task367960GRADUATION LIST- DEC 2021 FOR NOTICE BOARD.pdf");
    
    }

    useEffect(()=>{
         getDetails();
    },[]);

  
    return <>
           {isBck && <div style={{height:"60px",display:"flex",flexDirection:"row",justifyContent:"space-between"}} className="card">
            <h4 style={{marginTop:"10px",marginLeft:"20px"}}><i>Go Back</i></h4>
             <button  onClick={()=>setAssign(false)}  style={{width:"40px",height:"40px",marginRight:"10px",marginTop:"7px",borderRadius:"20px"}} className="btn btn-primary fa fa-history"></button>
               </div>
          }
          
       {view &&   <ReasignUser 
          title={details.task_title} 
          setBack={setBack}
          status={details.task_status}
          createDate={details.task_created_date}
          endDate={details.task_deadlin}
          description={details.task_description}
          taskId={details.task_id}
           buttonName={"ASSIGN USER"}/>}
           </>
}

export default AsignUser;