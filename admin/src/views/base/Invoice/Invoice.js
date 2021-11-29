import { useEffect, useState } from "react";
import ApiRequest from "src/Api/Data/requestApi";
import TableCard from "src/views/table/TableCard";

const Invoice = ({showSingleTask,closeInvoice,InvoiceId})=>{
      const [InvoiceData,setInvoiceData] = useState([]);
      const [show,setShow]= useState(false);


      const getInvoiceDetails = async ()=>{
           const data = await ApiRequest.LoadInvoiceDetails(InvoiceId);

           console.log(data.data)
            var organisedData = [];
           data.data.forEach(element => {
                var dat ={
                    taskId:element.task_id,
                     name:element.task_name,
                     title:element.task_title,
                     status:element.task_status,
                     dCompleted:element.task_deadline,
                     pPage:element.price_per_page,
                     pages:element.pages,
                     amount:element.payment_expected_amount,
                     pStatus:element.payment_status,
                     action:<button onClick={()=>showSingleTask(element.task_id)} className="btn btn-primary">Details</button>
                }

                organisedData.push(dat);
           });

           setInvoiceData(organisedData);
      }

      useEffect(()=>{
        getInvoiceDetails();
      },[])
    
      //<td><button onClick={()=>showSingleTask()} className="btn btn-primary">Details</button></td>
      const columns =[
          {
            dataField: "taskId",
            text: "Order",
          },
          {
            dataField: "name",
            text: "Order Name",
          },
          {
            dataField: "title",
            text: "Order Title",
           
          },
          {
            dataField: "status",
            text: "Order Status",
           
          },
          {
            dataField: "dCompleted",
            text: "Date Completed",
           
          },
          {
            dataField: "pPage",
            text: "Pay per page",
           
          },
          {
            dataField: "pages",
            text: "Pages",
           
          },
          {
            dataField: "amount",
            text: "Amount",
           
          },
          {
             dataField:'pStatus',
             text:'Payment Status'
          },
          {
              dataField:'action',
              text:''
          }
          
        
      ];

      const Products=[
           {
               taskId:'',
                name:'',
                title:'',
                status:"",
                dCompleted:'',
                pPage:'',
                pages:'',
                amount:"",
                pStatus:"",
                action:''
           }
      ]

    return <>
    <div style={{height:'60px',display:"flex",flexDirection:"row",justifyContent:"space-between"}} className="card">
          <div style={{marginTop:"20px",marginLeft:"10px"}}><h5>INVOICE DETAILS &nbsp;(title)</h5></div>
         <div>
             click here to go back {"->"}&nbsp;
             <button onClick={()=>closeInvoice(InvoiceId)} className="fa fa-history" style={style.button}>
        
             </button></div>
      </div>
     <hr/>
     <div className="container card">
         <section className="invoice">
            
            <div className="row">
                <div className="col-xs-12">
                    <h2 className="page-header">
                        Invoice
                        <span className="pull-right"></span>
                    </h2>
                </div>
               
            </div>

            
            <div className="row invoice-info">
                <div className="col-sm-4 invoice-col">
                    From
                    <address>
                        <strong>peakwriter@peakwriter.com</strong><br/>
                    </address>
                </div>
               
                <div className="col-sm-4 invoice-col">
                    To
                    <address>
                        <strong>Peakwriters</strong><br/>
                         peakwriters
                    </address>
                </div>
               
                <div className="col-sm-4 invoice-col">

                    <b>Date:</b> October 16, 2021<br/>
                </div>
               
            </div>

            <div className="row">
                <div className="col-xs-12">
                    <p className="lead">Invoice Details:</p>
                </div>
            </div>
          
                <TableCard
                   columns={columns}
                   products={InvoiceData}
                   title={'General Invoices'}
                />

              
            <div className="row">
               
                <div className="col-xs-7">

                </div>
               
                <div className="col-xs-5">

                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                            <tr>
                                <th>Total:</th>
                                <td>0 Ksh</td>
                            </tr>
                            </tbody></table>
                    </div>
                </div>
               
            </div>
            

          
                    </section>
                    </div>
     </>


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

export default Invoice;