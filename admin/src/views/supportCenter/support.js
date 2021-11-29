import { useEffect, useState } from "react";
import ApiRequest from "src/Api/Data/requestApi";

import ChatBox from "../ChatBox/ChatBox";
import TableCard from "../table/TableCard";

const Support = ({socket})=>{

   const [open,setOpen]=useState(false);

   const [TICKETS,setTickects] = useState([]);
   const [email,setEmail] = useState('');
  const [taskid,setTaskid] =useState('');

    const getOpentickets = async ()=>{
            try {
              
              const result = await ApiRequest.getOpenTickets();
              var organisedData =[];
              result.data.forEach(element => {
              var dat=  {

                  "#Id":element.task_id,
                   image:ProfileImage(element.writer_profile),
                  
                   email:element.writer_email,
                   
                   Odate:element.taskl_accepted_date,
                   Action:Buttons(element.writer_email,element.task_id)
                }
                organisedData.push(dat);
              });

              setTickects(organisedData);
            } catch (error) {
              
            
            }
    }

    useEffect(()=>{
      getOpentickets();
    },[]);

    const Open=(mail,taskid)=>{
      setTaskid(taskid);
      setEmail(mail);
      setOpen(!open);
   }
   const ProfileImage=image=>{
    
      return <img 
              style={{
                width:"30px",
                height:"30px",
                borderRadius:'15px'
                
              }}
          src={image} alt="profile"/>
    }
   
    const Buttons =(email,task_id)=>{
      return <> 
           <button style={{color:"blue"}} onClick={()=>Open(email,task_id)}  className="fa fa-reply btn"></button> 
         
           
       </>
         }

       
   
   const columns = [
        {
          dataField: "#Id",
          text: "TicketId(taskid)",
         
        },
        {
          dataField: "image",
          text: "Profile",
        
          sort: true
        },
       
        {
          dataField: "email",
          text: "email",
        
        },
       
        {
          
            dataField: "Odate",
            text: "OpenDate",
          
          
        },
        {
            dataField: "Action",
            text: "Action",
         
          }
      ];
    
 return <>  
<div className="container card">
<TableCard products={TICKETS} columns={columns} title={"SUPPORT TICKETS"}/>
</div>
     
{open && <ChatBox
    open={open}
    SetOpen={Open}
    email={email}
    socket={socket}
    taskid={taskid}
   />}
   </>;
}

export default Support;