//import { useState } from 'react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import ApiRequest from 'src/Api/Data/requestApi';
import './style.css';
import { animateScroll } from 'react-scroll';
const ROOT_CSS=({
    height: 400,
    
  });



const ChatBox = ({open,SetOpen,socket,email,loged,taskid})=>{
    
    const [messages,setMessages] = useState([]);
    const [Loged,setLoged] = useState('');
    const [receiver,setReceiver] = useState('');
    const [message,setMessage] = useState('');
    const [profile,setProfile] = useState('');
    const [clientProfile,setClientProfile] = useState('');
    const [senderUsername,setUsername] = useState('');
    const [Taskid,setTaskId] = useState('');
    const [writerUsername,setWriterName] =  useState('');
    const messagesEndRef = useRef(null);
    const [set,setSet] = useState(false);
    


   const  scrollToBottom=() =>{
       animateScroll.scrollToBottom({
          containerId: "MessageBox"
        });
    
    }

    const loadChatClient =async  ()=>{
        //alert(taskid)
             //alert(Taskid)
             var from = localStorage.getItem('mail');
             const result = await ApiRequest.loadChatUsers(from,email,taskid);

             var data = result.data;
             setClientProfile(data.receiver[0].writer_profile);
             setProfile(data.sender[0].user_profile);
             setUsername(data.sender[0].user_username)
             //writer_display_name
             setWriterName(data.receiver[0].writer_display_name);
           //console.log(data.messages);
             setMessages(data.messages);

             

    }



const HandleSocket=()=>{
    
    if(!set){
    socket.on('message',(message)=>{
       

       if(messages.length !==0){
         //  console.log(messages.length)
       }
        setMessages((messages)=>[...messages,message]);
        setTimeout(() => {
          scrollToBottom();
        }, 100);
  });
  setSet(true);
}
}

   

    useEffect(()=>{
        if(open == true && !set){
        
            var from = localStorage.getItem('mail');
            setLoged(from);
            setReceiver(email);
            setTaskId(taskid);
            
    
            loadChatClient();
            
        HandleSocket();
           
        }  
        
       
        
    },[]);
    


    const sendMessage =()=>{
        
        if(message === ''){
             setMessage('');
            return;
        }
        var body ={
            username:senderUsername,
            Imageurl:profile,
            message:message,
            receiver_id:receiver,
            sender_id:Loged,
            task_id:taskid,
        
     }
     //
     socket.emit('sendMessage',{message:body,room:receiver}, () =>{
    });

     //socket.emit('sendMessage',{body,receiver});
      setMessages([...messages,body])
      setMessage('');
      setTimeout(() => {
        scrollToBottom();
      }, 100);
      

    }
   // alert(email)

   return <>
   
    <div className="chat-popup" style={{display:open?"block":"none",backgroundColor:"brown"}} id="myForm">
       
        <div style={{marginBottom:"5px"}} className="container">
        <div class="avatar">
       
            <img class="img-circle" style={{width:"40px",height:"40px",borderRadius:"20px"}}  src={clientProfile} />
           &nbsp; <span className="badge badge-warning">{writerUsername}</span>
            </div>
    <button type="button" style={{float:'right',color:"blue",
                   border:"1px solid green",
                   backgroundColor:"whitesmoke"

          }} className="btn badge-warning fa fa-times" onClick={()=>SetOpen()}></button>
       </div>
    <div style={{maxHeight:'500px',overflowY:'auto'}}  className="col-sm-12 col-sm-offset-4 frame">
    
            <ul id="MessageBox" ref={messagesEndRef} style={{maxHeight:'400px',overflowY:'auto'}}>
           
                 {
 messages.map((element)=>{
                          
    if(element.sender_id === Loged){
          return <li style={{width:"100%"}}>
          <div class="msj-rta macro">
              <div class="text text-r">
                  <p>
                 {element.message}
                  </p>
                  <p><small>'+date+ loged'</small></p>
              </div>
          <div class="avatar" style={{padding:"0px 0px 0px 10px !important",width:'40px'}}><img class="img-circle" style={{width:'40px',height:'40px',borderRadius:'20px'}}  src={profile} /></div>                                
    </div>
    </li>  
    }
    if(element.receiver_id === receiver){
         return  <li style={{width:"100%"}}>
         <div class="msj macro">
         <div class="avatar"><img class="img-circle" style={{width:'40px',height:'40px',borderRadius:'20px'}}  src={clientProfile} /></div>
             <div class="text text-l">
                 <p>
                 {element.message}
                 </p>
                 <p><small>'+date+'</small></p>
             </div>
         </div>
     </li>
    }
    if(element.receiver_id === Loged){
        return  <li style={{width:"100%"}}>
        <div class="msj macro">
        <div class="avatar"><img class="img-circle" style={{width:'40px',height:'40px',borderRadius:'20px'}}  src={clientProfile} /></div>
            <div class="text text-l">
                <p>
                {element.message}
                </p>
                <p><small>'+date+'</small></p>
            </div>
        </div>
    </li>
   }
   if(element.sender_id === receiver){
    return <li style={{width:"100%"}}>
    <div class="msj-rta macro">
        <div class="text text-r">
            <p>
           {element.message}
            </p>
            <p><small>'+date+ loged'</small></p>
        </div>
    <div class="avatar" style={{padding:"0px 0px 0px 10px !important"}}><img class="img-circle" style={{width:'40px',height:'40px',borderRadius:'20px'}}  src={profile} /></div>                                
</div>
</li>  
}

})



                  
                 }

         


                     
            </ul>
            
            <div style={{marginBottom:"5px"}}>
                <div className="msj-rta macro">                        
                    
                        
                        <textarea
                        value={message}
                        onKeyPress = {event => event.key === 'Enter' ? sendMessage() : null}
                        onChange={(e)=>setMessage(e.target.value)} style={{width:"100%",outline:"none"}} className="mytext" placeholder="Type a message"/>
                    

                </div>
                <div 
                   onClick={()=>sendMessage()}
                style={{padding:"10px",backgroundColor:"#cff",
                   borderRadius:"10px",
                   marginLeft:"1px",
                   cursor:"pointer"
                 }}>
                    <span className="fa fa-share"></span>
                </div>                
            </div>
            
        </div>  
       
        
        </div>
    
          </>
}

export default ChatBox;