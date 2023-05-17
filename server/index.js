const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Registerr=require('./regschema.js');
const userSchema = require('./admin.js');
const Os=require('./o.js')
const sendMail = require("./controllers/sendMail");
const session = require('express-session');
const cors = require('cors');
app.use(cors({
    origin: '*'
}))

app.use(express.json());
app.use(
    session({
      secret: 'your-secret-key', // Change this to a random string for security
      resave: false,
      saveUninitialized: false,
      cookie: {
        name: 'sessionId' // Move the name property here
      }
    })
  );
mongoose.connect("mongodb+srv://sreenidhifeedbackandenquiry:8019003344@medical.mxryuri.mongodb.net/test").then(()=>console.log("db connected"))
var db = mongoose.connection;

app.get('/',(req,res)=>{
    res.send('Medical Hub')
})

app.post('/register',async(req,res)=>{
    const { fullname,email,username, password } = req.body;
    try {
      const existingAdmin = await userSchema.findOne({ username });
      const existingEmail = await userSchema.findOne({email})
      if (existingAdmin|| existingEmail) {
        return res.status(400).json({ error: 'Admin already exists' });
      }
      const newAdmin = new userSchema({ fullname,email,username, password });
      await newAdmin.save();
  
      res.status(200).json({ message: 'Admin registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
})
app.post('/patients/:bloodGroup', async (req, res) => {
    try {
      const { bloodGroup } = req.params;
      const patients = await Registerr.find({ bloodGroup });
      res.status(200).json({ patients });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

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
    const { username, password } = req.body;

    try {
      const admin = await userSchema.findOne({ username });
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
      if (admin.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      res.status(200).json({ message: 'Admin logged in successfully' });
      req.session.adminId = admin._id;
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
}
)
app.post('/dashboard', (req, res) => {
    if (req.session.adminId) {
        res.send("logged in")
    } else {
        res.send("not logged in")
    }
  });

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