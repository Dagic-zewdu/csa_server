const jwt=require('jsonwebtoken')
const { decrptObject, encryptObject } = require('./encrypt')
const {
    team_leader,employee,sector_leader,senior_office,director,system_admin
    ,f_employee,f_team_leader,f_director,f_sector_leader
}=require('../config/config').token
const userauth=(req,res,next)=>{
    const decrypt=decrptObject(req.body.data)
      const {token,usertype} = decrypt
      if(token===undefined&&usertype===undefined){
          let Data=encryptObject({message:'Access Denied',auth:false,error:true})
      res.status(200).send(Data)
      }
      else{
      try{
 if (usertype === 'team_leader') {
    const verify=  jwt.verify(token,team_leader)
    req.user=verify
     next()
}
else if (usertype === 'employee') {
    const verify=  jwt.verify(token,employee)
    req.user=verify
     next()
}
else if (usertype === 'sector_leader') {
    const verify=  jwt.verify(token,sector_leader)
    req.user=verify
     next()
}
else if (usertype === 'senior_officer') {
    const verify=  jwt.verify(token,senior_office)
    req.user=verify
     next()
}
else if (usertype === 'director') {
    const verify=  jwt.verify(token,director)
    req.user=verify
     next()
}
else if (usertype === 'system_admin') {
    const verify=  jwt.verify(token,system_admin)
    req.user=verify
     next()
}
else if (usertype === 'f_employee') {
    const verify=  jwt.verify(token,f_employee)
    req.user=verify
     next()
}
else if (usertype === 'f_team_leader') {
    const verify=  jwt.verify(token,f_team_leader)
    req.user=verify
     next()
}
else if (usertype === 'f_director') {
    const verify=  jwt.verify(token,f_director)
    req.user=verify
     next()
}
else if (usertype === 'f_sector_leader') {
    const verify=  jwt.verify(token,f_sector_leader)
    req.user=verify
     next()
}
else {
    let data=encryptObject({message:'Invalid user usertype',auth:false,error:true})
    res.status(200).send(data)
}

} 
catch(err){
    console.log(err)
    let data=encryptObject({message:'Invalid user token',auth:false,error:true})
    res.status(200).send(data)
          }
      }
     
}

const adminAuth=(req,res,next)=>{
    try{
    const decrypt=decrptObject(req.body.data)
    const {token} = decrypt
    if(token===undefined){
    let Data=encryptObject({message:'Access Denied',auth:false,error:true})
    res.status(200).send(Data)
            
       }
    else{
        const verify=  jwt.verify(token,system_admin)
        req.user=verify
         next()
    }
    
      }
      catch(err){
        let data=encryptObject({message:'Invalid user token',auth:false,
        error:true})
        res.status(200).send(data)
      }

}

module.exports={userauth,adminAuth}