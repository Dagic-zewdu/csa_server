const { saveMessage, getMessages, updateMessages } = require("./controllers/messages");
const { setConnection,emitConnections, allConnections } = require("./controllers/userConnection");
const userConnection = require("./db/connectionSchema");

 
const webSocket=io=>io.on('connection',socket=> { 
  var emp_id 
  /**Registers new connected user to the db */ 
      const user=async (emp)=>{
        const users=await userConnection.find({emp_id:emp,status:'connected'})
       const connectedusers=await allConnections() 
    users.length? io.sockets.emit('users',connectedusers):   
   setConnection({emp_id,status:'connected', connected_time:Date.now()},io)       
      } 
      
    socket.on('onConnect',data=>{
      emp_id=data.emp_id
      emp_id?user(data.emp_id):()=>{}
    })
    socket.on('users',async ()=>{
        const users=await allConnections()
        io.sockets.emit('users',users)
    }) 
       socket.emit("outgoing data",new Date())
     /**recieving chat from client */
socket.on('submit',data=>{saveMessage(data,io)})
/**typing broadcast */
socket.on('typing',data=>io.sockets.emit('typing',{emp_id:data.emp_id}))
   /**sending chat message */
socket.on('chat',async ()=>{
    const messages=await getMessages()
    io.sockets.emit('chat',messages)
})
  /**updating chat message */
  socket.on('update',data=>updateMessages(data,io))
   socket.on("disconnect", ()=>{
      emp_id?setConnection({
        emp_id,status:'disconnected',
        disconnected_time:Date.now()
        },io):()=>{}
    });
      })
module.exports={webSocket}      