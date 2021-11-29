import { useEffect, useState } from "react";
import DownloadLink from "react-download-link";
import ApiRequest from "src/Api/Data/requestApi";
import Urls from "src/Api/urls";

const SingeleTask=({id,closeTask,isAccept=true,invoiceId=null})=>{

    

    const [details,setDetails] = useState([]);
    const [view,setView] = useState(false);

    const getDetails=async()=>{
      const result = await ApiRequest.getSingleTaskFullDetails(id);

      setDetails(result.data);
      //console.log(result.data); 
      setView(true);
     // await ApiRequest.fileDownload("http://localhost:4000/files/Task367960GRADUATION LIST- DEC 2021 FOR NOTICE BOARD.pdf");
    }

    function downloadFile(filename) {
    ApiRequest.apihelperdownload().then(
          (res) => {
              const url = window.URL.createObjectURL(new Blob([res.data]));
              const link = document.createElement('a');
              link.href = url;
              if (typeof window.navigator.msSaveBlob === 'function') {
                  window.navigator.msSaveBlob(
                      res.data,
                      filename
                  );
              } else {
                  link.setAttribute('download', filename);
                  document.body.appendChild(link);
                  link.click();
              }
          },
          (error) => {
              alert("Something went wrong");
          }
      )
      
    }

    const Download = async ()=>{
             await ApiRequest.fileDownload();
             
    }

    const statusMode=(status)=>{
          if(status === "new"){
           return <span className="badge badge-info">{status}</span>
          }
          if(status === "cancelled"){
           return <span className="badge badge-warning">{status}</span>
          }
        if(status === "completed"){
          return <span className="badge badge-success">{status}</span>
        }
        if(status === "in-progress"){
          return <span className="badge badge-primary">{status}</span>
        }
    }

    useEffect(()=>{
        // downloadFile("new.pdf");
        getDetails();
    },[]);


  
     
    return <>
     {view && <section>
     <div style={{height:'60px',display:"flex",flexDirection:"row",justifyContent:"space-between"}} className="card">
          <div style={{marginTop:"20px",marginLeft:"10px"}}><h5>ORDER DETAILS &nbsp;({details.result[0].task_title})</h5></div>
         <div>
             click here to go back {"->"}&nbsp;
             <button onClick={()=>closeTask(invoiceId)} className="fa fa-history"  style={style.button}>
        
             </button></div>
      </div>
     <hr/>
 <div className="jumbotron jumbotron-fluid card">
         <div className="container">
         <div style={{height:'60px',display:"flex",flexDirection:"row",justifyContent:"space-between"}} className="card">
          <div style={{marginTop:"20px",marginLeft:"10px"}}>
          <div>
             <th>
            
                    Order Status
                </th>
                <td>&nbsp;&nbsp;{statusMode(details.result[0].task_status)}</td>
             </div>
          </div>
         
          </div>
            
            
 
         <div className="container">
      
                <div className="row">
                             <div className="col-md-4">
                             <strong>Order Name</strong> <p>{details.result[0].task_title}</p>
                             <strong>Order ID</strong> <p>{details.result[0].task_id}</p>
                             <strong>Order Title</strong> <p>{details.result[0].task_title}</p>
                             <strong>Work Type</strong> <p>{details.result[0].task_work_type}</p>
                             </div>
                             <div className="col-md-4">
                             <strong>Service</strong> <p>{details.result[0].task_service}</p>
                             <strong>Discipline</strong> <p>{details.result[0].task_Descipline}</p>
                             <strong>Created date</strong> <p>{details.result[0].task_created_date}</p>
                             <strong style={{color:"brown"}}><h3>DEADLINE</h3></strong> <p className="badge badge-info">{details.result[0].task_deadline}</p>
                             </div>
                             <div className="col-md-3">
                                 <div className="btn-group-vertical btn-block">
                                   
                                 </div>
                             </div>
                 </div>
        </div>
 
 
      </div>
 </div>
 
 
   <div  className="box box-solid card">
                     <div style={{marginLeft:"10px"}} className="box-header with-border">
 
                       <h3 className="box-title">Order details</h3>
                     </div>
                     
                       <div  style={{marginLeft:"10px"}}className="dl-horizontal row">
                           <div className="col-md-11" dangerouslySetInnerHTML={{ __html: details.result[0].task_description }} >
                           
                           </div>
                           
                       </div>
     </div>
     <div  className="box box-solid card">
                     <div style={{marginLeft:"10px"}} className="box-header with-border">
 
                       <h3 className="box-title">Other Information</h3>
                     </div>
                     
                       <div  style={{marginLeft:"10px"}}className="dl-horizontal row">
                           <div className="col-md-4">
                             <dt>Price per page:</dt>
                             <dd>{details.result[0].price_per_page}</dd>
                               <dt>Price:</dt>
                               <dd>{details.result[0].price}</dd>
                           </div>
                           <div className="col-md-4">
 
                            
                             <dt>Pages Number:</dt>
                             <dd>{details.result[0].pages}</dd>
                           </div>
 
                          
                       </div>
     </div>
 
 
     <div className="box box-solid card">
                     <div style={{marginLeft:"10px"}} className="box-header with-border">
 
                         <h3 className="box-title">Writer Details</h3>
                     </div>
                     
                     <div style={{marginLeft:"10px"}} className="box-body">
                   
                    <div className="row">
                             <div className="col-md-4">
                                 <h4>Name:  <span className="text-info">{Object.keys(details.writerDetails[0]).length!==0?details.writerDetails[0].name:""}</span> </h4>
                             </div>
                             <div className="col-md-4">
                                 <h4>Phone:  <span className="text-info">{Object.keys(details.writerDetails[0]).length !==0?details.writerDetails[0].phone.replace("254",'0'):""}</span> </h4>
                             </div>
                             <div className="col-md-4">
                                 <h4>Email:  <span className="text-info">{Object.keys(details.writerDetails[0]).length!==0?details.writerDetails[0].email:""}</span> </h4>
                             </div>
                         </div>
                     </div>
                    
                 </div>
 
 
                 <div className="box box-solid card">
                     <div style={{marginLeft:"10px"}} className="box-header">
                       <h3 className="box-title">Order Files</h3>
                     </div>
                    
                     <div className="box-body">
                         <table className="table">
                                 <tbody><tr>
                                   <th style={{width:"10px"}}>#</th>
                                   <th>File Name</th>
                                   <th>Action</th>
                                 </tr>
                                 {details.orderFiles.map((item,index)=>{
                                    return    <tr>
                                        <td>{index +1}</td>
                                        <td>{item.filename}</td>
                                        <td>
                                      <a   href={Urls.fileDownloadUrl+item.path}>Download</a></td>
                              </tr>
                                 })}
                              
                                  
                                     
                               </tbody>
                           </table>
                     </div>
                   
                   </div>  
 
                   <div className="box box-solid card">
                     <div style={{marginLeft:"10px"}} className="box-header">
                       <h3 className="box-title">Writer submited Files</h3>
                     </div>
                    
                     <div className="box-body">
                         <table className="table">
                                 <tbody><tr>
                                   <th style={{width:"10px"}}>#</th>
                                   <th>File Name</th>
                                   <th>Action</th>
                                 </tr>
 
                                 <tr>
                                 {details.witerSubmitedFiles.map((item,index)=>{
                                    return    <tr>
                                        <td>{index +1}</td>
                                        <td>{item.filename}</td>
                                        <td>
                                      <a   href={Urls.fileDownloadUrl+item.path}>Download</a></td>
                              </tr>
                                 })}
                                 </tr>
                                  
                                     
                               </tbody>
                           </table>
                     </div>
                   
                   </div>  
 
                 
     <div style={{backgroundColor:"#000"}}  className="box box-solid card">
                    
                     
                     
                       <div  style={{marginLeft:"10px"}}className="dl-horizontal row">
                          
 
                       {isAccept &&  <div className="col-md-10">
                               <dt style={{
                                     marginTop:"10px",
                                     marginBottom:"10px",
                                     marginLeft:"40%",
                                     width:"50%",
                                     margin:"10x 10px auto"
                               }}>
                                    <button style={{width:'80%'}} className="btn btn-primary">
                                        Accept Task
                                    </button>
                               </dt>
                                
                           </div>}
                       </div>
                    
                    
     </div>

 
 </section>}
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
 
 export default SingeleTask;