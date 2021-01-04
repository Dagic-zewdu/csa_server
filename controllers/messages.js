const messages = require("../db/messageSchema")

const getMessages=async ()=>(await messages.find({})).reverse()
const emitMessages=async (io)=>io.sockets.emit('chat',await getMessages())
/**
  @param {*} req=>req to save 
 * @param {*} io => io.sockets to emit
 */
const saveMessage=async (req,io)=>{
    try{
       const message=new messages(req) 
    const  save=await message.save()
    emitMessages(io)
    }
    catch(err){
console.log(err)
    }
}
const updateMessages=async (req,io)=>{
    try{
    const message=await messages.findByIdAndUpdate(req._id,req)
    emitMessages(io)
    }
    catch(err){
    console.log(err)
    }
}
module.exports={updateMessages,saveMessage,emitMessages,getMessages}