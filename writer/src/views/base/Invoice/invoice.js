import TableCard from "../../table/TableCard";
import Currency from "../Currency/currency";
const Invoice = ({showSingleTask,InvoiceEndate,writerName,writerEmail,tableData=[],total,unpaid,paid})=>{


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
        dataField:'pstatus',
        text:'Payment Status',
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
        dataField:'amount',
        text: 'Amount',
    },
    
    {
        dataField:'Action',
       

    },

   
 
]
    return <>
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
                        <strong>Writers</strong><br/>
                    </address>
                </div>
               
                <div className="col-sm-4 invoice-col">
                    To
                    <address>
                        <strong>{writerName}</strong><br/>
                        Email: {writerEmail}
                    </address>
                </div>
               
                <div className="col-sm-4 invoice-col">

                    <b>Date:</b>{InvoiceEndate}<br/>
                </div>
               
            </div>

            <div className="row">
                <div className="col-xs-12">
                    <p className="lead">Invoice Details:</p>
                </div>
            </div>

            
            <div className="row">


                <div className="col-xs-12 table-responsive">
               <TableCard columns={columns} products={tableData}/> 
               </div>    
            </div>
            

            <div className="row">
               
                <div className="col-xs-7">

                </div>
               
                <div className="col-xs-5">

                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                            <tr>
                                <th>Total:</th>
                                <td>Ksh {Currency(paid)}</td>
                                <th>Total-Unpaid:</th>
                                <td>Ksh {Currency(unpaid)}</td>
                                <th>Total-paid:</th>
                                <td className="btn-success">Ksh {Currency(total)}</td>
                            </tr>

                            </tbody></table>
                    </div>
                </div>
               
            </div>
            

          
                    </section>
     </>
}

export default Invoice;