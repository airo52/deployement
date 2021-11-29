const uuidv4 = require('uuid').v4;
const messages = new Set();
const users = new Map();
const {addUser,getUser,getUsersInRoom,removeUser} = require('./socketUsers');
const defaultUser = {
  id: 'anon',
  name: 'Anonymous',
};

const { Database} = require('../../database/database');

const db = new Database();

const messageExpirationTimeMS = 5*60 * 1000;

class Connection {
  constructor(io,socket) {
    this.socket = socket;
    this.io = io;

    socket.on('getMessages', () => this.getMessages());
    //socket.on('message', (value) => this.handleMessage(value));
    socket.on('disconnect', () => this.disconnect());
    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on('sendMessage',({message,room})=>{
      //console.log(room);
      this.sendMessage(message,room);
    })


    socket.on('joins',({name,room},callback) =>{
           
        const {error,user}=addUser({id:socket.id,name,room});
       if(error) return callback(error);
     console.log(room+"has joined");
        //console.log(name)
        //socket.emit('message',{user:'admin',text:`${user.name},welcome to the room ${user.room}`});
       // socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name},has joined`});
       // socket.join(user.room);
     
       

        callback();
    
       });
  }
  
  sendMessage(message,room) {
   /* var body ={
           username:"",
           Imageurl:'',
           text:"",
           to:'',
           from:'',
           date:''
    }*/
      const user= getUser(room);
       //console.log(message);

      if(user == undefined){
        inserNewMessage(message.sender_id,message.receiver_id,message.message,message.task_id,'0');
      }else{
        this.io.to(user.id).emit("newMessage",message);
        this.io.to(user.id).emit('message',message);
        inserNewMessage(message.sender_id,message.receiver_id,message.message,message.task_id,'1');
      }
      
    

     // this.io.sockets.emit('message', {home:message});
  }

  sendSingle(message,room){
      this.io.to(room).emit("message",message);
  }

  sendAdminNotification(admin,message){
   // console.log(admin)
   const user= getUser(admin);


  

   
    this.io.to(user.id).emit("newNotification",message);
   //this.io.emit("newNotification",message);
   //this.io.sockets.to(admin).emit("newNotification",message);
  }
  
  getMessages() {
    messages.forEach((message) => this.sendMessage(message));
  }

  handleMessage(value) {
    const message = {
      id: uuidv4(),
      user: users.get(this.socket) || defaultUser,
      value,
      time: Date.now()
    };

    messages.add(message);
   // this.sendMessage(message);

    setTimeout(
      () => {
        messages.delete(message);
        this.io.sockets.emit('deleteMessage', message.id);
      },
      messageExpirationTimeMS,
    );
  }

  disconnect() {
    removeUser(this.socket.id);
   
    users.delete(this.socket);
  }
}


async function inserNewMessage(sender,receiver,message,task_id,status){
  var data=[
      task_id,
      sender,
      message,
      receiver,
      status
  ]
  await db.insert(data,'chats');    
}

function chat(io,data) {
   // var data;

 
        // "Producing Code" (May take some time)
        
        io.on('connection', (socket) => {
          // console.log('we have a new connection');
          data(new Connection(io, socket));  

           
        
           
           });
       
    
 

  
 // return data;

};

module.exports=chat;