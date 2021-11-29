import { number } from "prop-types";
import { useState } from "react";
import ApiRequest from "src/Api/Data/requestApi";
import swal from "sweetalert";
import DynamicForm from "./dynamicForm";

const AccountSeating =()=>{
  const [allowedTask,setAllowedTask] = useState('');
  const [billingSequence,setBillingSequence] = useState('');


  const HandleSubmitSequence = async ()=>{
      if(billingSequence !=="" && billingSequence !=="0"){
            const result = await ApiRequest.postSequence(billingSequence);
            var data = result.data;
            if(data == true){
              swal("Number of allowed","task updated succesfully","success");
            }else{
              swal("ERROR","Sequence update failed","error");
             }

      }else{
        swal("ERROR","Provide sequence","error");
      }
  }


  const HandleSubmitTask =async ()=>{
     if(allowedTask === ""){
       swal("ERROR","provide task limit by number","warning");
     }
     else{
         const result = await ApiRequest.postAllowedTaskNumber(allowedTask);
        var data = result.data;
        if(data == true){
          swal("Number of allowed","task updated succesfully","success");
        }
        else{
          swal("ERROR","task update failed","error");
         }
       }
  }
    return  <> <div className="container">
    <div className="main-body">
 
        
          
    
          <div className="row gutters-sm">
         
            <div style={{marginTop:"20px"}} className="col-md-12">
            
              <div className="row gutters-sm">
               {/* <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">System </i>Allowed Payment Methods</h6>
                      <div className="form-group">
                           <label for="inputAddress2">PaymentMethods</label>
                         <DynamicForm />
                         </div>
                     
                    </div>
                  </div>
</div>*/}
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body" style={{overflowY:"auto"}}>
                      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">System</i>Billing Sequence</h6>
                      <div className="form-group">
                           <label for="inputAddress2">Current Billing Sequence &nbsp;<span className="badge badge-warning">1 week</span></label>
                         <select onChange={(e)=>setBillingSequence(e.target.value)} className="form-control">
                             <option value="0" selected>
                                ....select Billing sequence...
                             </option>
                             <option value="3">
                                  3 Days
                             </option>
                             <option value="7">
                                  1 week
                             </option>
                             <option value="14">
                                  2 Weeks
                             </option>
                             <option value="30">
                                  1 month
                             </option>
                         </select>
                         </div>
                  
                     <button onClick={()=>HandleSubmitSequence()} style={{width:"100%",height:"40px"}} className="btn btn-info">UPDATE BILLING SEQUENCE</button>
                    </div>
                    
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body" style={{overflowY:"auto"}}>
                      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Writer</i>Number Of Task Allowed To Take Before Complition Of previous Task</h6>
                       <div className="form-group">
                         <label>Current Allowed &nbsp;<span className="badge badge-warning">1</span></label>
                       <input value={allowedTask} onChange={(e)=>setAllowedTask(e.target.value)} type="number" className="form-control" placeholder="number of Task allowed"/>
                      </div>
                     <button onClick={()=>HandleSubmitTask()} style={{width:"100%"}} className="btn btn-info">UPDATE ALLOWED NUMBER OF TASK</button>
                    </div>
                    
                  </div>
                </div>
               
              </div>



            </div>
          </div>

        </div>
    </div>
    </>
}

export default AccountSeating;