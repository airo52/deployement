import Dropzone from './dropzone/Dropzone';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { Modal ,Button} from 'react-bootstrap';
import ApiRequest from 'src/Api/Data/requestApi';
import FormValidation from '../../Users/writers/formValidate';
import ModalCard from 'src/views/modal/Modal';
import TableCard from 'src/views/table/TableCard';

const PostTask=()=>{

  const [validFiles, setValidFiles] = useState([]);
  const [Show,setShow]= useState(false);
  const [prog,setProg]= useState(0);
  const [categories,setCategories]=useState([]);

  const [title,setTitle]= useState('');
  const [category,setCategory] = useState('');
  const [time,setTime] = useState('');
  const [expectedDate,setExpectedDate]=useState('');
  const [pages,setPage]= useState('');
  const [pricePerpage,setPricePerPag]= useState('');
  const [totalAmountTobePaid,setAmountToBePaid]=useState('');
  const [description,setDescription]=useState('');
  const [workType,setWorktype] = useState('');
  const [service,setService] = useState('');

  const [selectedInvoice,setSelectedInvoice] = useState('');
  const [selectedInvoiceEndDate,setSelectedInvoiceEndate] = useState('');
  const [openInvoices,setOpenInvoices] = useState([]);
  const [invoiceId,setInvoiceId] = useState('');

  const [show, setShows] = useState(false);
  const [isShowLoader,setShowLoader] = useState(false);




  const LoadOpenInvoices =async  ()=>{
       const result = await ApiRequest.LoadOpenInvoices();

       var filteredData =[];

       result.data.forEach(element => {
        var dat=  {
            taskid:element.invoice_id,
            status:<span className="badge badge-info">open</span>,
            start:element.created_date,
            deadline:element.end_date,
            Action:Btns(element.invoice_id,element.Invoice,element.end_date)
          }
  
          filteredData.push(dat);
        });

        setOpenInvoices(filteredData)
                //console.log(result);
  }

  const assignInvoice =(invoice_id,invoice,invoiceEndate)=>{
     
        setSelectedInvoice(invoice);
        setSelectedInvoiceEndate(invoiceEndate);
        setInvoiceId(invoice_id);
  }

  const assignNewInvoice = (startDate)=>{
    setSelectedInvoice('new');
    setSelectedInvoiceEndate(startDate);
    setInvoiceId(''); 
  }

  const CloseInvoice = async (invoice_id)=>{
             const result = await ApiRequest.CloseInvoice(invoice_id);

             if(result.data === 'done'){
                 swal('success','Invoice closed successfully','success');
                 LoadOpenInvoices();
             }else{
                 swal('error','invoice could not be closed','error');
             }

  }
  
  const  Btns =(task_id,invoice,endate)=>{
    return<> <button onClick={()=>assignInvoice(task_id,invoice,endate)} className="btn btn-info fa fa-check"></button>
     &nbsp; <button onClick={()=>CloseInvoice(task_id)} className="btn btn-success fa fa-trash"></button>
    </>;
}
   const AssignContent=()=>{
     
     const columns = [
       {
         dataField: "taskid",
         text: "#id",
        
       },
       {
         dataField: "status",
         text: "Invoice status",
       
         sort: true
       },
       {
         dataField: "start",
         text: "start date",
       
         sort: true
       },
       {
         dataField: "deadline",
         text: "Deadline",
       
         sort: true
       },
      
       {
           dataField: "Action",
           text: "Action",
        
         }
     ];

    
      return <TableCard
                columns={columns}
                products={openInvoices}
                title={"Existing Invoice"}
             />
   }
  const Contents =()=>{
      return <>
               <form className="form">
                     <label>start date</label>
                     <input onChange={(e)=>assignNewInvoice(e.target.value)} type="date" placeholder="end date" className="form-control"/>
               </form>
                <AssignContent/>
          </>
  }
  const handleClose = () => {setShows(false)};
  const handleShow = () => {LoadOpenInvoices()
     setShows(true)};

  const createInvoice =()=>{

  }


  const LoadCategories =async ()=>{
    
    const result = await ApiRequest.getCategories();
  
     setCategories(result.data);
  //  setSelected(result.data)
  }

  useEffect(()=>{
    LoadCategories();
  },[]);

  const HandleClose = () =>{
    setShow(false);
  }

  const setPages=(page)=>{
     var total = pricePerpage * page;
     setAmountToBePaid(total);
     setPage(page);

  }
  const setPricePerPage=(price)=>{
     var total = price * pages;
     setAmountToBePaid(total);
     setPricePerPag(price);
  }

  const Update =()=>{
    var number = prog;
    var progs = parseInt(prog);
    if(progs >= 100){
      clearInterval(progress);
      setTimeout(() => {
        setShow(false);
        swal("Upload Success","file uploaded succesfully","success");
      }, 1500);
    };
  
    
  
  
  
  
  number = number +10;
    
   setProg(number);
  }

  var progress = function(){ 
    setInterval(() => {
    Update();
}, 1500);
  }
 const HandlePostTask=async ()=>{

   /* selectedInvoice
    selectedInvoiceEndDate
     invoiceId
     */
   
   
   var check= FormValidation.postTaskForm(title,category,time,expectedDate,pages,pricePerpage,totalAmountTobePaid,description,service,workType,selectedInvoice);
    
   if(check == true){
    if(validFiles.length !==0){
        const result = await ApiRequest.postTask(title,category,time,expectedDate,pages,pricePerpage,totalAmountTobePaid,description,service,workType,selectedInvoice,selectedInvoiceEndDate,invoiceId);

        const {success,lastId}= result.data;
         if(success == true){
               
  var number = 1;
  var total = validFiles.length;

 
//setShow(true);
if(validFiles.length !==0){
  setShow(true);
  for (let index = 0; index <validFiles.length; index++) {
    var newValue = Math.floor((number/total) * 100);
    const element =validFiles[index];
   // const result = await ApiRequest.uploadFiles(lastId,element);

   const results = await ApiRequest.uploadFiles2(element);

   

    if(results !==false){
      const resultst = await ApiRequest.uploadFiles(lastId,results)
     
      if(resultst == true){
         // swal('success','Task submited succesfully','success');
          //getTaskInprogress();
      }else{
          swal('Error','Proccess Failed','error');
      }
  }
    if(result == true){
      setProg(newValue);
      number = number + 1;
     continue;
   }
    
  }
  setTimeout(()=>{
     setValidFiles([]);
     setTitle('');
     setCategory('');
     setTime('');
    setExpectedDate('');
    setPage('');
    setPricePerPag('');
    setAmountToBePaid('');
    setDescription('');
    setWorktype('');
    setService('');
    setShow(false);
    setProg(0);
    swal("success","upload succesfull","success");
  },1000);

//progress();
 }else{
  swal("Provide Files","file uploaded Failed","error");
 }

         }
          }else{
            swal("Provide Files","file uploaded Failed","error");
           }  //

   }else{
    swal("Submision Error",check,"error");
   }

  
    
   
  }




    return <>
    <div  className="container card">
      <br/>
    <button style={{height:'50px',outline:"none"}} onClick={()=>handleShow()} className="btn-primary shadow-none">SELECT INVOICE</button>
             <form style={{
                    marginTop:"30px",
                    marginBottom:"30px"
             }}>

  <div className="form-row">
    
    <div className="form-group col-md-6">
      <label for="inputEmail4">Title</label>
      <input value={title} type="text" onChange={(e)=>setTitle(e.target.value)} className="form-control" id="inputEmail4" placeholder="Title"/>
    </div>
    <div className="form-group col-md-6">
      <label for="inputPassword4">Category</label>
       <select onChange={(e)=>setCategory(e.target.value)} className="form-control">
           <option value="0" selected>chose Category</option>
           {categories.map((item)=>{
           return <option>{item.category_name}</option>
         })}
       </select>
    </div>
  </div>
 
  <div className="form-row">
    <div className="form-group col-md-6">
      <label for="inputCity">Time</label>
      <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} className="form-control" id="inputCity"/>
    </div>
    <div className="form-group col-md-4">
      <label for="inputState">Expected date</label>
        <input value={expectedDate} onChange={(e)=>setExpectedDate(e.target.value)} className="form-control" type="date"/>
    </div>
    <div className="form-group col-md-2">
      <label for="inputZip">Pages</label>
      <input type="number" value={pages} onChange={(e)=>setPages(e.target.value)} className="form-control" min="0.00" max="10000.00" step="0.01" placeholder="pages" />
      
    </div>

    <div className="form-group col-md-2">
      <label for="inputZip">Price (Ksh per page)</label>
      <input type="number" value={pricePerpage} onChange={(e)=>setPricePerPage(e.target.value)} className="form-control" min="0.00" max="10000.00" step="0.01" placeholder="price Ksh" />
      
    </div>

    <div className="form-group col-md-2">
      <label for="inputZip">Total Ksh to Be Paid</label>
      <input type="number" value={totalAmountTobePaid} disabled className="form-control" min="0.00" max="10000.00" step="0.01" placeholder="price in dollars" />
      
    </div>
    <div className="form-group col-md-2">
      <label for="inputZip">Work type</label>
      <input type="text" value={workType} onChange={(e)=>setWorktype(e.target.value)}  className="form-control" min="0.00" max="10000.00" step="0.01" placeholder="Work type" />
      
    </div>
    <div className="form-group col-md-2">
      <label for="inputZip">Service</label>
      <input type="text" value={service} onChange={(e)=>setService(e.target.value)}  className="form-control" min="0.00" max="10000.00" step="0.01" placeholder="service" />
      
    </div>
    <div className="form-group col-md-2">
      <label for="inputZip">Selected Invoice</label>
      <input type="text" disabled value={selectedInvoice}   className="form-control" placeholder="seleted invoice" />
      
    </div>

    <div className="form-group col-md-2">
      <label for="inputZip">Selected Invoice end date</label>
      <input type="text" disabled value={selectedInvoiceEndDate}   className="form-control" placeholder="seleted invoice end date" />
      
    </div>
  </div>

  <div className="form-row">
  <div style={{display:"block"}} class="form-group col-md-12">
      <Dropzone validFiles={validFiles} setValidFiles={setValidFiles}/>
</div>
  </div>

  <div className="form-row">
     <div className="form-group col-md-12">
     <label for="inputZip">Descripe task Here(..Task Details)</label>
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
           setDescription(data);
           
           //setMessage(data);
       } }
      
   />
     </div>
  </div>
  
  <button onClick={()=>HandlePostTask()}  type="button" className="btn btn-primary">Post New Task</button>
</form>
</div>
<ModalCard
   content={Contents()}
    Show={show}
    Close={handleClose}
   Save={createInvoice} ButtonName={"Create New Invoice"}
/>




<Modal show={Show} onHide={HandleClose}>
<Modal.Header>
  <Modal.Title>Uploading Task</Modal.Title>
</Modal.Header>
<Modal.Body>
<small>Upload Progress {prog}%</small>
                      <div className="progress mb-3" style={{height:"15px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width:prog+"%"}} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
</Modal.Body>

</Modal>


          </>;
}

export default PostTask;