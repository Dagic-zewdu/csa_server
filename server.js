const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors=require('cors')
const path=require('path')
const compression=require('compression')
const {port}=require('./config/config')
const route=require('./route')
const socketIo = require("socket.io");
const { decrptObject } = require('./auth/encrypt')
const { disconnect } = require('process')
const { webSocket } = require('./socket')
app.use('/static',express.static(path.join(__dirname,'public')));

// compress all response
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true}));
app.use(cors())
/** routes */
app.use(route)
/**--socket connection---- */
const server = require('http').createServer(app);
const io = socketIo(server, {
   cors: {
     origin: "http://192.168.137.1:3000",
     methods: ["GET", "POST" , "PUT"],
     allowedHeaders: ["my-custom-header"],
     credentials: true
   }
 });
webSocket(io)
server.listen(port,err=>{
   if (err) console.log(err)
   console.log('Server up and running on localhost:'+port)
})

