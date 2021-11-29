import React, { useEffect, useState } from 'react'
import inactivityTime from 'src/idleTimeDetection'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = ({Uname,Pfile,email,sockett}) => {

  const [notificationCount,setNotificationCount] = useState();
  const [message,setMessages] =useState([]);
  const [sockets,setSockets] = useState('');
  const [state,setState] = useState(false);

  const setSocket=(socket)=>{
    setSockets(socket);
   
    setState(true);
}

useEffect(()=>{
  inactivityTime();
},[])
  return (
    <div className="c-app c-default-layout">
     <TheSidebar username={Uname}/>
      <div className="c-wrapper">
        <TheHeader state={state} socket={sockets} Messages={message} notificationCount={notificationCount}  profile={Pfile}/>
        <div className="c-body">
        <TheContent setSocket={setSocket} Messages={setMessages} notificationCount={setNotificationCount} email={email} name={Uname} profile={Pfile} profile={Pfile}/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
