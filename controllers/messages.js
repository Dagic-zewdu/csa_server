const messages = require("../db/messageSchema")
const Letter=require('../db/letterSchema')
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
    io.sockets.emit('update',req._id)
    emitMessages(io)
    }
    catch(err){
    console.log(err)
    }
}
const deleteMessage=async (req,io)=>{
    try{
        const del=await messages.findByIdAndDelete(req._id)
    }
    catch(err){
   console.log(err)
    }
}
const deleteLetterMessage=async (req,io)=>{
    try{
        console.log(req)
  const letter=await messages.deleteMany({letter_id:req._id})
  io.sockets.emit('delete_letter_message',{_id:req._id})
    }
    catch(err){
console.log(err)
    }
}
module.exports={updateMessages,saveMessage,emitMessages,getMessages,
                deleteMessage,deleteLetterMessage}