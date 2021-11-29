
import { useEffect, useState } from "react";
import ApiRequest from "src/Api/Data/requestApi";
import TableCard from "src/views/table/TableCard";
import Invoice from "../../Invoice/Invoice";
import SingeleTask from "../../Task/TaskDetails/SingleTaskDetails";

const History = ()=>{
    const [isShowInvoice,setIsShowInvoice] = useState(false);
    const [isShowSingleTask,setIsShowSingleTask]=useState(false);
    const [taskId,setTaskId]=useState('');
    const [invoiceId,setInvoiceId]= useState('');
    const [Invoices,setInvoices]= useState([]);

     const ShowInvoice=invoiceid=>{
         
         setInvoiceId(invoiceid);
         setIsShowInvoice(true);
         setIsShowSingleTask(false);
     }
     const ShowSingleTasks =taskid=>{
       setTaskId(taskid);
      setIsShowInvoice(false);
      setIsShowSingleTask(true);
     }

     const CloseInvoice=()=>{
      setInvoiceId('');
      setTaskId('');
      setIsShowInvoice(false);
      setIsShowSingleTask(false);
     }


     const LoadInvoices = async ()=>{
          const data = await ApiRequest.LoadInvoices();
           var organisedData=[];
          data.data.forEach(element => {
               var dat ={
                invoiceId:element.Invoice,
                created:element.created_date,
                pdate:element.end_date,
                Action:Button(element.invoice_id)
               }

               organisedData.push(dat);
          });

          setInvoices(organisedData);
          
          //console.log(data.data);
     }

     useEffect(()=>{
        LoadInvoices();
     },[]);

  
  const Button=id=>{
    return <button style={{width:"100%",
             
              color:"#000"
  }} onClick={()=>ShowInvoice(id)} className="btn btn-success fa fa-history"></button>
  }
    const columns = [
      
        {
          dataField: "invoiceId",
          text: "#Invoice Id",
       
        },
      
        {
          
            dataField: "created",
            text: "Created Date",
          
          
        },
        {
          
          dataField: "pdate",
          text: "Paid-Date",
       },
        {
            dataField: "Action",
            text: "Action",
         
          }
      ];
  

    
    return <>
          {!isShowInvoice && !isShowSingleTask && 
          <div className="container card">  <TableCard 
             products={Invoices}
             columns={columns}
              title={"PAYMENT HISTORY"}
             />
             </div>
          }

        {isShowInvoice && !isShowSingleTask &&
          
           <Invoice InvoiceId={invoiceId} showSingleTask ={ShowSingleTasks} closeInvoice={CloseInvoice}/>
         
         
         }  

        {!isShowInvoice && isShowSingleTask && <SingeleTask invoiceId={invoiceId} id={taskId} closeTask={ShowInvoice} isAccept={false}/>}
          </>
          
}

export default History;