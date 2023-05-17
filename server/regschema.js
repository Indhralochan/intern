const mongoose = require('mongoose');
mongoose.set("debug", true);
mongoose.set("strictQuery", false);
const options = {
  strict: "throw",
  strictQuery: false
};
let Registerr = new mongoose.Schema({
    fullname :{
        type : String,
        required : true,
    },
    email :{
        type : String,
        required:true,
        unique: true
    },
    gender : {
        type : String,
        required : true,
    },
    age :{
        type : String,
        required:true,
    },city :{
        type : String,
        required:true,
    },password :{
        type : String,
        required:true,
        unique: true
    },
    bloodGroup :{
        type : String,
        required : true,
    },
    Contact:{
        type: String,
        required : true,
        unique: true,
    }
},options)

module.exports = mongoose.model('Registerr',Registerr)