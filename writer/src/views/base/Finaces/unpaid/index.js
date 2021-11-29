import React, { useEffect, useState } from "react";
import ApiRequest from "src/Api/Requests/Apirequest";

import Invoice from "../../Invoice/invoice";
import SingeleTask from "../../NewTask/taskDetails/singleTaskDetails";
import TableCard from "../../Table/tableCard";

const UnpaidOrders=()=>{

    const [isSingleTaskOpen,setShowSingleTask] = useState(false);
    const [singleTaskId,setSingleTaskId] = useState();
    const [UnpaidOrders,setUnpaid] = useState([]);
    const [email,setEmail] = useState('');
    const [date,setDate] = useState('');
    const [Paid,setPaid] = useState('');
      const [unPaid,setunPaid] = useState(0);
      const [PaidTotal,setPaidTotal] = useState(0);

    const handleShowSingleTask=(id)=>{
      
          setSingleTaskId(id);
          setShowSingleTask(true);
    }

    const handleCloseTask=()=>{
       setSingleTaskId('');
       setShowSingleTask(false);
    }

    

    const getUnpaidOrders =async ()=>{
      const result = await ApiRequest.getUnpaidOrders();
 
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
                   "Action":<button className="btn btn-primary" onClick={()=>handleShowSingleTask(element.task_id)}>Details</button>
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
      if(paid == '0'){
        total = paid;
        
      }else{
        total = paid +Unpaid;
      }
      
      setPaidTotal(total);
      setunPaid(Unpaid);
      setPaid(paid);
       
     
      setEmail(email);
      setDate(date);
      setUnpaid(organisedData);
}




useEffect(()=>{
 getUnpaidOrders()
},[]);
  return<> 
    
      <div className="container-fluid jumbotron card bg-white text-dark">
           <div>
          <React.Fragment> 
              {!isSingleTaskOpen && <Invoice total={PaidTotal} unpaid={unPaid} paid={Paid} writerEmail={email} InvoiceEndate={date} tableData={UnpaidOrders} showSingleTask={handleShowSingleTask}/>}
              {isSingleTaskOpen &&<SingeleTask isAccept={false} closeTask={handleCloseTask} id={singleTaskId}/>}
          </React.Fragment>
           </div>
         
      </div>
        </>
}

export default UnpaidOrders;