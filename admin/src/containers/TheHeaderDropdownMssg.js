import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChatBox from 'src/views/ChatBox/ChatBox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TheHeaderDropdownMssg = ({socket,state}) => {
  const notify = (data) => toast(data);
  
  const [open,setOpen]=useState(false);
  const [email,setEmail] = useState('');
  const [taskid,setTaskid] =useState('');

  const [newMessage,setNewMessage] = useState([]);
  const [itemsCount,setItemCount] = useState(0);
  const Open=(mail,taskid)=>{
    setTaskid(taskid);
    setEmail(mail);
    setOpen(!open);

    var lists = newMessage.filter(x => {
      return x.task_id != taskid;
    })

   // console.log(lists)
    setNewMessage(lists);

    setTimeout(() => {
     // Count()
     var legth = lists.length;

     setItemCount(legth);
   }, 1200);
   }
   
const Alert = (message)=>setTimeout(() => {
  notify('you have a new message from '+message.username+"..."+message.message.substring(0, 100));

  
}, 3000);

const Count = ()=>{
    var legth = newMessage.length;

  setItemCount(legth +1);
}

   if(state){
    socket.on('newMessage',(message)=>{
      //console.log(message);
          //clearTimeout(Alert);
          //Alert(message)

          const found = newMessage.some(item=>item.task_id === message.task_id);
          if(!found){
            setNewMessage((newMessage)=>[...newMessage,message]);
          }
          setTimeout(() => {
             Count()
          }, 1200);

         
      
    },[]);
   }
  
   
  
  return (<>
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-envelope-open" /><CBadge shape="pill" color="info">{itemsCount}</CBadge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
        >
          <strong>You have {itemsCount} messages</strong>
        </CDropdownItem>
       
       {newMessage.map((item)=>{
         return <>
                   <CDropdownItem onClick={()=>Open(item.sender_id,item.task_id)} href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg
                 style={{width:"40px",height:"40px",borderRadius:"20px"}}
                  src={item.Imageurl}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="c-avatar-status bg-warning"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">{item.username}</small>
              <small className="text-muted float-right mt-1">5 minutes ago</small>
            </div>
            <div className="text-truncate font-weight-bold"></div>
            <br/>
            <div className="small text-muted text-truncate">
              <p>{item.message}</p>
            </div>
            <br/>
          </div>
        </CDropdownItem>
                </>
       })}

        
      </CDropdownMenu>
    </CDropdown>
    {open && <ChatBox
    open={open}
    SetOpen={Open}
    email={email}
    socket={socket}
    taskid={taskid}
   />}
   <ToastContainer />
   </>
  )
}

export default TheHeaderDropdownMssg