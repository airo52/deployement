import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import ApiRequest from "src/Api/Data/requestApi";
import TableCard from "src/views/table/TableCard";
import SingeleTask from "../../Task/TaskDetails/SingleTaskDetails";
import 'react-toastify/dist/ReactToastify.css';

const PendingPayments= ()=>{

  const notify = (data) => toast(data);
  const [isShowSingleTask,setIsShowSingleTask]=useState(false);
  const [taskId,setTaskId]=useState('');
  const [markedOrders,setMarkedOrders] = useState([]);
  const [unpaidTask,setUnpaidTask] = useState([]);
  const [isShowLoader,setShowLoader] = useState(false);

  const ShowSingleTasks =taskid=>{
    setTaskId(taskid);
  
   setIsShowSingleTask(true);
  }
  const CloseSingleTask=()=>{
    setTaskId('');
    // setIsShowInvoice(false);
     setIsShowSingleTask(false);
  }
  const SubmitMultipleMarked = ()=>{
    setShowLoader(true);
   console.log(markedOrders)
      if(markedOrders.length > 0){
             markedOrders.forEach(async (element) => {
              //invoice:invoice,taskId:id
              const result = await ApiRequest.markTaskPaid(element.invoice,element.taskId);
              notify(result.data);
             });
             getUnpaidTask();
      }else{
        toast('Selectem Payments first');
        setShowLoader(false);
      }
    //console.log(markedOrders)
  }

  const SubmitSingle=async (id,invoice)=>{
     /* let data = {
         invoice:invoice,
         taskId:id
      }*/
      setShowLoader(true);
   if(id === "" || invoice === ""){
      notify('Failed')
     return
   }
    
      const result = await ApiRequest.markTaskPaid(invoice,id);
      notify(result.data);
      getUnpaidTask();
     // alert(result.data)
      setShowLoader(false);
      //console.log(data);
  }
  const HandleSelected =(id,invoice,event)=>{
      if(event.target.checked){
        let newMarked = markedOrders;
        console.log(markedOrders)
       // console.log(id+""+invoice)
        newMarked.push({invoice:invoice,taskId:id})
        //[i][e.target.name] = e.target.value;
       setMarkedOrders(newMarked);

       
      }else {
          var newData =[];
        markedOrders.forEach((element) => {
               if(element.taskId !== id){
                   newData.push({invoice:element.invoice,taskId:element.taskId})
               }

        });
        //let newMarke = markedOrders.filter((item)=>item.taskId !== id);
        //setMarkedOrders([]);
        //console.log(newMarke)
       //newMarked= newMarked.filter((item)=>item.taskId !== id);
       // newMarked.push({invoice:invoice,taskId:id})
      setMarkedOrders(newData);
        
      };
  }

  const Button=(id,invoice)=>{
    return <>
        <button style={{marginRight:"5px"}} onClick={()=>SubmitSingle(id,invoice)} className="btn btn-info">Mark Paid</button>
    <button style={{
             
              color:"#000",
            
  }} onClick={()=>ShowSingleTasks(id)} className="btn btn-success fa fa-history"></button>
  </>
  }

 const getUnpaidTask = async ()=>{
        const result = await ApiRequest.getPendingPayments();
        const organisedData=[];
        result.data.forEach(element => {
            var data={
              //check:<input onChange={(e)=>HandleSelected(element.task_id,element.Invoice,e)} type="checkbox"/>,
              "#taskId":element.task_id,
              invoiceId:element.Invoice,
              email:element.writer_email,
              status:<span className="badge badge-warning">{element.payment_status}</span>,
              pdate:element.end_date,
              amount:"Ksh "+element.payment_expected_amount,
              Action:Button(element.task_id,element.Invoice)
             }

             organisedData.push(data);
             
        });

        setUnpaidTask(organisedData);

      //  organisedData=[];
       // console.log(result);
 } 

 useEffect(()=>{
     getUnpaidTask();
 },[]);
    const columns = [
      //{
      //  dataField: "check",
       // text: <span className="fa fa-check badge badge-success"></span>,
       
      //},
        {
          dataField: "#taskId",
          text: "#taskId",
         
        },
      
        {
          dataField: "invoiceId",
          text: "#Invoice Id",
       
        },
        {
          dataField: "email",
          text: "Writer email",
        
        },
        {
          
            dataField: "status",
            text: "status",
          
          
        },
       
        {
          
          dataField: "pdate",
          text: "Expected-Day-Pay",
        },
        {
          
          dataField: "amount",
          text: "Amount to be paid",
        },
        {
            dataField: "Action",
            text: "Action",
         
          }
      ];
  
    return <>
            {!isShowSingleTask &&<>
            <button onClick={()=>SubmitMultipleMarked()} style={{float:"right",marginBottom:"5px"}} className="btn btn-warning">Submit All Selected As Paid</button>
             <div className="container card">
              
             <TableCard 
             products={unpaidTask}
             columns={columns}
              title={"PENDING PAYMENTS"}
             />
             </div></>}

            {isShowSingleTask && <SingeleTask id={taskId} closeTask={CloseSingleTask} isAccept={false}/>}

            <ToastContainer />
            <div style={{
                  display:"block",
                  cursor:"pointer",
                   zIndex:99,
                  position:"absolute",
                  top:"40%",
                  left:'50%',
                  right:"40%",
                  
             }}>
               
                 
                {isShowLoader &&  <Loader
                   type="Circles"
                   color="#00BFFF"
                    height={100}
                    width={100}
      
                  />}
               
             </div>
          </>
          
}
export default PendingPayments;