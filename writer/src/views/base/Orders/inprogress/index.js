import React, { useEffect, useState } from "react";
import SingeleTask from "../../NewTask/taskDetails/singleTaskDetails";
import TableCard from "../../../table/TableCard";
import ApiRequest from "src/Api/Requests/Apirequest";
import swal from "sweetalert";
import ModalCard from "../../Modal/Modal";
import Frezer from "src/Freezer";



const OrdersInProgress =()=>{

    const [isSingleTaskOpen,setShowSingleTask] = useState(false);
    const [singleTaskId,setSingleTaskId] = useState();
    const [inprogress,setInprogress] = useState([]);
    const [image,setImage] = useState('');
    const [profile,setProfile] = useState('');
    const [taskId,setTaskId] = useState('');

    const [show, setShow] = useState(false);
    const [isShowLoader,setShowLoader] = useState(false);

    const handleShowSingleTask=(id)=>{
      
          setSingleTaskId(id);
          setShowSingleTask(true);
    }

    
    const getTaskInprogress =async ()=>{
     <Frezer/>
           const result = await ApiRequest.getOrdersInprogress();
        
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
                        "Action": Buttons(element.task_id)
                    } 
                    
                    organisedData.push(dat);
           });

           setInprogress(organisedData);
    }
    
  
    const handleCloseTask=()=>{
       setSingleTaskId('');
       setShowSingleTask(false);
    }

    useEffect(()=>{
      getTaskInprogress();
    },[]);
    const HandleSubmitTask=(task_id)=>{
      setTaskId(task_id);
     setShow(true);
    }

    const ViewItemDetails =(id)=>{
       // alert(id);
       handleShowSingleTask(id);
    }
  
 

const CancelOrder = async (id)=>{
    const result = await ApiRequest.cancelOrder(id);
     if(result.data == true){
         swal('success','Task canceled successfully','success');
     }else{
        swal('Error','Process failed','error');
     }
}

const Buttons =(id)=>{
    return <React.Fragment>
        <button className="btn btn-danger" onClick={()=>HandleSubmitTask(id)}>Submit Order</button>&nbsp;
         <button className="btn btn-danger" onClick={()=>CancelOrder(id)}>cancel Order</button>&nbsp;
         <button className="btn btn-info" onClick={()=>ViewItemDetails(id)}>Details</button>
    </React.Fragment>
}

const Close=()=>{
    setShow(false)
  }
  const SubmitTask=async ()=>{
       if(profile !== ''){

        const result = await ApiRequest.SubmitTask2(profile);

        if(result !==false){
            const results = await ApiRequest.SubmitTask(result,taskId);
           
            if(results == true){
                swal('success','Task submited succesfully','success');
                getTaskInprogress();
            }else{
                swal('Error','Proccess Failed','error');
            }
        }

           /*const result = await ApiRequest.SubmitTask(profile,taskId);
           
            if(result == true){
                swal('success','Task submited succesfully','success');
                getTaskInprogress();
            }else{
                swal('Error','Proccess Failed','error');
            }*/
       }else{
           swal('Error','Provide file to submit','error');
       }
      //alert('submit')
      
  }

  const Content=()=>{
      

    const HandleImage =async  (event)=>{

      //  unction  FileRead(event) {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onload = function(event) {
            
             const resul= event.target.result;
        
             setImage(resul);
            // setImage(file);

            setProfile(file);

                
             
            };
            reader.readAsDataURL(file);
  
    }

    return <>
   
             <form>
  <div class="form-group">
      <label for="exampleFormControlFile1">Click To Select Your Profile</label>
       <input type="file" onChange={(e)=>HandleImage(e)} class="form-control-file" id="exampleFormControlFile1"/>
   </div>
    </form>
          </>
  }


const columns = [
            {
                dataField:'#order',
                text: '#order',
            },
            {
                dataField:'OrderName',
                text: 'ordername',
            },
            {
                dataField:'Title',
                text: 'title',
            },
            {
                dataField:'status',
                text: 'status',
            },
            {
                dataField:'Created',
                text: 'created',
            },
            {
                dataField:'Deadline',
                text: 'deadline',
            },
            {
                dataField:'Service',
                text: 'service',
            },
            {
                dataField:'Pages',
                text: 'page',
            },
            
            {
                dataField:'Action',
                text: 'action',

            },

           
         
        ]

return <React.Fragment>
{!isSingleTaskOpen && <TableCard title={"Order in progress"} columns={columns} products={inprogress}/>}
{isSingleTaskOpen && <SingeleTask isAccept={false} closeTask={handleCloseTask} id={singleTaskId}/>}

<ModalCard 
Close={Close}
content={Content()}
ButtonName={"Submit Task"}
Show={show} 
 Save={SubmitTask}
/>

</React.Fragment> 
}

export default OrdersInProgress;