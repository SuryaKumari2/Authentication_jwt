const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');
const userRoutes=require('./routes/UserRoutes')
dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(console.log('Database connected successfully')).catch((e)=>console.log(e))
const app=express();
const port=6000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/user',userRoutes)

app.use('/',(req,res)=>{
    res.send('<h1>Welcome</h1>')
})
app.listen(port,()=>{
    console.log(`server running in port ${port}`)
})

