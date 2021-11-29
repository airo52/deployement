//import { cilSortNumericDown } from "@coreui/icons";
import { useEffect, useState } from "react";
import ModalCard from "src/views/modal/Modal";
import TableCard from "src/views/table/TableCard";
import swal from "sweetalert";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SingeleTask from "../../TaskDetails/SingleTaskDetails";
import ApiRequest from "src/Api/Data/requestApi";
import Urls from "src/Api/urls";


const NewTaskSubmited = ()=>{

  const [Show,setShow]=useState(false);
  const [showRedoneModal,setRedoneModal]= useState(false);
  const [showSingleTask,setShowSingleTask]= useState(false);
  const [newSubmited,setNewSubmited] = useState([]);
  const [taskId,setTaskId] = useState('');
  const [revisionContent,setRevision]=useState('');
 

  const [task,setTask]=useState([]);

  const OpenModal =(id,invoice)=>{
       setTaskId(id);
      setTask({taskid:id,invoice:invoice});
      setShow(true);

    //  console.log(task);
      
      
  }

  const Close=()=>{
      setShow(false);
      setTask([]);
  }
  const CloseRedone=()=>{
      setRedoneModal(false);
      setShow(true)
  }

  const SubmitRevisionDetails=async ()=>{
       
    if(revisionContent === ""){
    
      swal(`Error`, "provide revision details", "error");
      return;
    }
 
    var result = await ApiRequest.sendRevisionRequest(taskId,revisionContent);

    if(result.data === "done"){
      swal(`REVISION REQUEST`, "Sent Succesfully", "success")
    
      setShow(false);
      setRedoneModal(false);
      setTask([]);
      LoadNewSubmitedTask();
      return
    }
    else{
      swal(`Error`, "process failed", "error");
    }

   
   
   
  }
  //{`/* <span style={{cursor:"pointer"}} className="badge badge-primary badge-pill">Download</span>*/'}
  const Content =()=>{

    const [submitedFiles,setSubmitedFiles] = useState([]);

      const loadFiles = async ()=>{
            const result = await ApiRequest.getSubmitedFiles(taskId);
            setSubmitedFiles(result.data);
      }
     
      if(Show){
        loadFiles();
      }
  
      return <>
 <ul className="list-group">
    {submitedFiles.map((item)=>{
      
     // tbl_task_submited_url
     return <li className="list-group-item d-flex justify-content-between align-items-center">
           {item.tbl_task_submited_url.split('uploads/')[1]}
           <a style={{cursor:"pointer"}}  href={Urls.fileDownloadUrl+item.tbl_task_submited_url.split('uploads/')[1]} className="badge badge-primary badge-pill">Download</a>
  
          </li>
      
    })}
 
</ul>
       </>
  }

  const RevisionContenT=()=>{

    

      return <>
               {<h6>REVISION REQUEST FOR ORDER {task['taskid']}</h6>}
               <br/>
                 <label>Revision Details</label>
               <CKEditor
       
       editor={ ClassicEditor }
      // data={message}
    
       onReady={ editor => {
           // You can store the "editor" and use when it is needed.
           //console.log( 'Editor is ready to use!', editor );
           editor.editing.view.change((writer) => {
            writer.setStyle(
                "height",
                "300px",
                editor.editing.view.document.getRoot()
            );
            });
       } }
       onChange={ ( event, editor ) => {
           const data = editor.getData();
                 
          setRevision(data);
       } }
      
   />
            </>
  }

  const RequestRedone=()=>{
      setShow(false);
      setRedoneModal(true);

  }

  const OpenSingleTaskDetails=(id,invoice)=>{
    setTask({taskid:id,invoice:invoice});
      setTaskId(id);
      setShowSingleTask(!showSingleTask);
     
  }

    const OpenMoreModal=(id,invoice)=>{
      swal(`INVOICE +${invoice}`,{
            buttons:{
                file:{
                    text:"SUBMITED FILES",
                    value:"file",
                    className:"btn btn-outline-info"
                },
               
                details:{
                    text:"ORDER DETAILS",
                    value:"details",
                    className:"btn btn-info"
                },
            }
      })
      .then((value)=>{
          switch (value) {
              case "file":
                  OpenModal(id,invoice);
                  break;
               
                    case "details":
                          OpenSingleTaskDetails(id,invoice);
                        break;  
          
              default:
                  break;
          }
      })
    }
    const Buttons=(id,invoice)=>{
        return <button onClick={()=>OpenMoreModal(id,invoice)} className="btn btn-primary">More</button>
     }

     const MarkTaskcomplete = async ()=>{
         const result = await ApiRequest.markTaskCompleted(taskId);
       

         if(result.data === "done"){
           swal(`Task Completed`, " Succesfully", "success")
         
           setShow(false);
           setRedoneModal(false);
           setTask([]);
           LoadNewSubmitedTask();
           return
         }else{
          swal(`Error`,result.data, "error")
         }

     }

   const AcceptOrder=()=>{
       swal(`You Are About To Mark Order ${task['taskid']} As Complete`,{
           buttons:{
               cancel:"Cancel !",
               complete:{
                   text:"COMPLETED?",
                    value:"complete",
                    className:"btn btn-success"
               }
           }
       })
       .then((value)=>{
           switch (value) {
               case 'complete':
                MarkTaskcomplete();
                     ///swal("ORDER COMPLETED","succesfully","success");
                setShow(false);
                setRedoneModal(false);
                   break;
           
               default:
                   swal("Process Cancelled ","succesfully","success");
                   break;
           }
       })
   }  

     const Btns=()=>{
        return <> 
                  <button onClick={()=>RequestRedone()} className="btn btn-info">REQUEST REDONE</button>
                  <button onClick={()=>AcceptOrder()}  className="btn btn-success">ACCEPT ORDER</button>
                 
              </>
     }
  

 const LoadNewSubmitedTask =async ()=>{
   const result = await ApiRequest.getNewSubmitedFiles();

   var organisedData=[];
       result.data.forEach(element => {
              var dat ={
                "#taskId":element.task_id,
                username:element.writer_display_name,
                email:element.writer_email,
                taskTitle:element.task_title,
                status:<span className="badge badge-info">{element.task_status}</span>,
                edate:element.taskl_accepted_date,
                action:Buttons(element.task_id,element.task_id)
              }

              organisedData.push(dat);
       });

       setNewSubmited(organisedData);


 }   
 
 useEffect(()=>{
   LoadNewSubmitedTask();
 },[]);




    const columns=[
        {
            dataField: "#taskId",
            text: "#taskId",
           
          },
          {
            dataField: "username",
            text: "writername",
           
          },
          {
            dataField: "email",
            text: "writer email",
           
          },
          {
            dataField: "taskTitle",
            text: "Task Title",
           
          },
          {
            dataField: "status",
            text: "status",
           
          },
          {
            dataField: "edate",
            text: "DeadLine",
           
          },
          {
            dataField: "action",
            text: "Actions",
           
          },
    ]
  

    return <>
          {showSingleTask && <SingeleTask id={task['taskid']} isAccept={false} closeTask={OpenSingleTaskDetails}/>}
           <ModalCard
            Show={Show} Close={Close}
            showBtn={false}
            Buttons={Btns}
            content={Content()}
             />

             <ModalCard
              Show={showRedoneModal}
               ButtonName={"SEND REVISION REQUEST"}
               content={RevisionContenT()}
               Save={SubmitRevisionDetails}
               Close={CloseRedone}

             />
        {!showSingleTask &&  <TableCard products={newSubmited} columns={columns} title={"NEW SUBMITED TASK"}/>}
     </>
  

}

export default NewTaskSubmited;