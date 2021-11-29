const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const {origins} = require('./components/config/config');
const { NotFound } = require('./NotFound');
const AdminRouter = require('./components/commons/administrator/router');
const WriterRouter = require('./components/commons/writer/router');
const chat = require('./components/commons/functions/Socket');

//const { dirname } = require('path');

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

let ios = require('socket.io')(server);
let io;
var data=function(dat){
 // console.log(dat);
  io=dat;
};

chat(ios,data);

app.use(express.static(__dirname +"/public"));
console.log(data)
var corsOptions = {
    origin: function (origin, callback) {
      if (origins.indexOf(origin) !== -1) {
         
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
};




app.use(async function(req, res, next) {
 

  //console.log(io);
  req.io = io;
  next();
});


app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(AdminRouter);
app.use(WriterRouter);

app.use((req, res, next) => {res.status(404).send(NotFound())})

server.listen(PORT,()=>{
    console.log(`server running on Port ${PORT}`);
})

