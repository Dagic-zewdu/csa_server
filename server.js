const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors=require('cors')
const path=require('path')
const compression=require('compression')
const {port}=require('./config/config')
const route=require('./route')
app.use('/static',express.static(path.join(__dirname,'public')));

// compress all response
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true}));
app.use(cors())
/** routes */
app.get('/api/*',route)
app.post('/api/*',route)
app.put('/api/*',route)
/**-- */
app.listen(port,err=>{
   if (err) console.log(err)
   console.log('Server up and running on localhost:'+port)
})