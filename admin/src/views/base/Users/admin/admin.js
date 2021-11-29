import { useState } from "react";
import TableCard from "src/views/table/TableCard";


const Admins=()=>{
    const [edit,setEdit] = useState(false);

    const handleClose = () => {setShow(false);setEdit(false)};
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [isShowLoader,setShowLoader] = useState(false);

    

    const columns = [
        {
          dataField: "#writerId",
          text: "WriterId",
         
        },
        {
          dataField: "image",
          text: "Profile",
        
          sort: true
        },
        {
          dataField: "writerName",
          text: "Username",
       
        },
        {
          dataField: "email",
          text: "email",
        
        },
        {
          
            dataField: "status",
            text: "status",
          
          
        },
        {
          
            dataField: "writercategory",
            text: "writer Category",
          
          
        },
        {
            dataField: "Action",
            text: "Action",
         
          }
      ];
      const products=[]
 return <>  {!edit && <> <div style={{height:"60px",display:"flex",flexDirection:"row",justifyContent:"space-between"}} className="card">
    <h4 style={{marginTop:"10px",marginLeft:"20px"}}><i>CREATE NEW ADMINISTRATOR</i></h4>
     <button onClick={()=>handleShow()} style={{width:"40px",height:"40px",marginRight:"10px",marginTop:"7px"}} className="btn btn-primary fa fa-plus"></button>
</div>
<div className="container card">
<TableCard products={products} columns={columns} title={"Writers"}/>
</div></>}
</>
}

export default Admins;