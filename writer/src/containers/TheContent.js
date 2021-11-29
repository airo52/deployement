import React, { Suspense, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Urls from 'src/Api/urls';
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import routes from '../routes'
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)


let socket = io(Urls.baseUrl, {transports: ['websocket']});
const TheContent = ({email,name,notificationCount,Messages,setSocket}) => {
  const ENDPOINT = 'localhost:4000';
  const notify = (data) => toast(data);
  const [click,setClick] = useState(false);


  useEffect(()=>{
     //  socket = io.connect(ENDPOINT);
   
    setSocket(socket);

    let room = email;
    localStorage.setItem('mail',room);
 
     socket.emit('joins',{name,room}, () =>{
      });
       
      setSocket(socket)
 
     
 
      socket.on('newNotification',(notification)=>{
       notificationCount(notification[0].count);
        Messages(notification[0].data);
        setTimeout(() => {
         setClick(true);
         notify(notification[0].count+" New Notifications");
        }, 2000);
    
          // console.log(notification);
      })
      
  },[ENDPOINT]);


 
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade>
                      <route.component socket={socket} {...props} />
                    </CFade>
                  )} />
              )
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
      <ToastContainer />
    </main>
  )
}

export default React.memo(TheContent)
