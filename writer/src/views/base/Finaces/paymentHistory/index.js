import React, { useEffect, useState } from "react";
import Invoice from "../../Invoice/invoice";
import SingeleTask from "../../NewTask/taskDetails/singleTaskDetails";
import TableCard from "../../../table/TableCard";
import ApiRequest from "src/Api/Requests/Apirequest";




const Invoices = ({showSingleTasks,closeTask,invoiceId})=>{
      const [InvoiceData,setInVoiceDat] = useState([]);
      const [email,setEmail] = useState('');
      const [date,setDate] = useState('');
      const [Paid,setPaid] = useState('');
      const [unPaid,setunPaid] = useState(0);
      const [PaidTotal,setPaidTotal] = useState(0);

      const getInVoiceData=async ()=>{
           const result = await ApiRequest.LoadInvoicesData(invoiceId);

           
       const organisedData =[];
       var date = '';
       var email ='';
       var paid =0;
       var Unpaid =0;
       var total = 0;
      result.data.forEach(element => {
               var dat ={
                   "#order": element.task_id,
                   "OrderName": element.task_name,
                   "Title": element.task_title,
                   "status": <span className="badge badge-danger">{element.task_status}</span>,
                   "pstatus":<span className="badge badge-danger">{element.payment_status}</span>,
                   "Created": element.task_created_date,
                   "Deadline": element.task_deadline,
                   "Service": element.task_service,
                   "Pages": element.pages,
                   "amount":element.payment_expected_amount,
                   "Action":<button className="btn btn-primary" onClick={()=>showSingleTasks(element.task_id)}>Details</button>
               } 

             email=element.writer_email;
             date = element.end_date;
             if(element.payment_status === 'unpaid'){
                 Unpaid = Unpaid + Number(element.payment_expected_amount);
             }
             if(element.payment_status === 'paid'){
                paid = paid + Number(element.payment_expected_amount);
            }

               
               organisedData.push(dat);
      });
      total = paid +Unpaid;
      setPaidTotal(total);
      setunPaid(Unpaid);
      setPaid(paid);
      setEmail(email);
      setDate(date);
      setInVoiceDat(organisedData);
      }

      useEffect(()=>{
         getInVoiceData();
      },[]);
       
    return <>
         <div style={{height:'60px',display:"flex",flexDirection:"row",justifyContent:"space-between"}} className="card">
         <div style={{marginTop:"20px",marginLeft:"10px"}}><h5> &nbsp;</h5></div>
        <div>
            click here to go back {"->"}&nbsp;
            <button onClick={()=>closeTask()} className="fa fa-history"  style={style.button}>
       
            </button></div>
     </div>
  <div className="container-fluid jumbotron card bg-white text-dark">
       <div>
       <Invoice total={PaidTotal} unpaid={unPaid} paid={Paid} writerEmail={email} tableData={InvoiceData} InvoiceEndate={date} showSingleTask={showSingleTasks}/>
       </div>
     
  </div>
    </>
}
const PaymentHistory=()=>{

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

    const closeTask =()=>{
        setShowSingleTask(false);
        setShowInvoice(false)
    }

    const [isShowInvoice,setShowInvoice]=useState(false);
    const [InvoiceId,setInvoiceId] = useState('');
    
    const [Invoiced,setInvoices]= useState([]);
    const ViewItemDetails =(id)=>{
       //alert(id);
       setInvoiceId(id);
       setShowInvoice(true);
    }



    const LoadInvoices = async ()=>{
        
        const data = await ApiRequest.LoadInvoices();
        console.log(data.data)
         var organisedData=[];
        data.data.forEach(element => {
             var dat ={
              invoiceId:element.Invoice,
              created:element.created_date,
              pdate:element.end_date,
              Action: <button className="btn btn-info" onClick={()=>ViewItemDetails(element.invoice_id)}>Details</button>
            
             }

             organisedData.push(dat);
        });

        setInvoices(organisedData);
        
        //console.log(data.data);
   }

   useEffect(()=>{
      LoadInvoices();
   },[]);
    

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


     const data=[
         {
            "#invoice": "committee-c15dw",
            "writername": "editor-ktsjo",
            "datepaid": "2021-07-7",
            "action": <button className="btn btn-info" onClick={()=>ViewItemDetails(5)}>Details</button>
         }
     ]
    return <React.Fragment>
        {!isShowInvoice &&<TableCard products={Invoiced} columns={columns} />}
        {isShowInvoice && !isSingleTaskOpen && <Invoices invoiceId={InvoiceId} closeTask={closeTask} showSingleTasks={handleShowSingleTask}/>}
        {isSingleTaskOpen &&<SingeleTask isAccept={false} closeTask={handleCloseTask} id={singleTaskId}/>}
    </React.Fragment>
}

const style={
    button:{
       marginTop:"10px",
       marginRight:'10px',
       border:"0px",
       outline:"0px",
       height:"40px",
       width:"40px",
       borderRadius:"20px",
       border:"1px solid #ecff"
    }
}

export default PaymentHistory;