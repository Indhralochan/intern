const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Registerr=require('./regschema.js');
const Os=require('./o.js')
const sendMail = require("./controllers/sendMail");
const cors = require('cors');
app.use(cors({
    origin: '*'
}))

app.use(express.json());

mongoose.connect("mongodb+srv://sreenidhifeedbackandenquiry:8019003344@medical.mxryuri.mongodb.net/test").then(()=>console.log("db connected"))
var db = mongoose.connection;

app.get('/',(req,res)=>{
    res.send('chat app')
})




app.post('/register',async(req,res)=>{
    const {fullname,email,gender,age,city,password} = req.body;
    
    let newUser = new Registerr({
        fullname,email,gender,age,city,password
    })
    await newUser.save();
    res.send('Registered Successfully')
})

app.post('/bloodgroup',async(req,res)=>{
    const {name,count}=req.body;
    const fo=await Os.findOne({name});
    const result=await Os.updateOne({name},{
        $set:{
            count:parseInt(fo.count)+parseInt(count)
        }
    });
    res.send("Updated")
})

app.post('/login',async (req, res) => {
        const {email,password} = req.body;
        let exist = await Registerr.findOne({email});
        if(!exist) {
              res.json(null);
         }
    else if(exist.password !== password) {
              res.json(null);
         }
        else{
        res.send("Found user"+exist.fullname);
    }}
    )

app.post("/mail", sendMail);

    const start = async () => {
      try {
        app.listen(PORT, () => {
          console.log(`I am live in port no.  ${PORT}`);
        });
      } catch (error) {}
    };
    
    start();

app.listen(5000,()=>{
    console.log('server running')
})